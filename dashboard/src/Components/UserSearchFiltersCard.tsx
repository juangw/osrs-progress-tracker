import React, { useState, FC } from "react";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
import moment from "moment";
import { getHistoricalHighscoresForUser } from "../Datasets/highscores";
import { translateDataset } from "../Datasets/common";
import {
    SummaryTypes,
    ProgressTimeframes,
    HighscoresData,
    DataUpdate,
    SummaryTypeUpdate,
    ProgressTimeframeUpdate,
    StatusUpdate,
    TextUpdate
} from "./UsersPage";
import { useQuery } from "react-query";
import { Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    enterUsernameCard: {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        margin: "20px",
        height: "30%",
        border: `1px solid ${theme.palette.grey[500]}`,
        boxShadow: "3px 3px 10px gray",
    },
    textField: {
        color: theme.palette.secondary.main,
    },
    textFieldOutline: {
        borderColor: theme.palette.secondary.main,
    },
    selectField: {
        color: theme.palette.secondary.main,
    },
    icon: {
        fill: theme.palette.secondary.main,
    }
}));

export const UserSearchFiltersCard: FC<{
    onUserDataUpdate: DataUpdate,
    onSummaryTypeUpdate: SummaryTypeUpdate,
    onProgressTimeframeUpdate: ProgressTimeframeUpdate,
    onStatusUpdate: StatusUpdate,
    onAlertTextUpdate: TextUpdate
}> = (
    {
        onUserDataUpdate,
        onSummaryTypeUpdate,
        onProgressTimeframeUpdate,
        onStatusUpdate,
        onAlertTextUpdate
    }
) => {
    const classes = useStyles();
    const [textFieldValue, setTextFieldValue] = useState("");
    const [username, setUsername] = useState<string | null>(null);
    const [timeframe, setTimeframe] = useState(moment().subtract(1, "days"));
    const [summaryType, setSummaryType] = useState<SummaryTypes>("totalXP");
    const [progressTimeframe, setProgressTimeframe] = useState<ProgressTimeframes>("daily");

    const getExperienceGained = (highscoresData: HighscoresData): HighscoresData => {
        const augmentedHighscoresData = {...highscoresData};
        augmentedHighscoresData.skills_summary.map((summary, index) => {
            if (index === 0) { return summary.experience_gained = (0).toString(); }
            const current = highscoresData.skills_summary[index].total_experience;
            const previous = highscoresData.skills_summary[index - 1].total_experience;
            summary.experience_gained = (current - previous).toString();
        });
        return augmentedHighscoresData;
    };

    useQuery(
        `${username}-${timeframe}-timeseries-data`,
        () =>
        getHistoricalHighscoresForUser({username: username, startDate: timeframe, pagination: [1, 100000], sortBy: ["created_date:asc"]})
        .then(result => {
            console.log(result);
            if (!result.data.length) {
                onAlertTextUpdate("Unable to Find Account, Enter Username to Begin Tracking");
                onStatusUpdate("Warning");
                return;
            }
            const dataset = translateDataset(result.data);
            onUserDataUpdate(getExperienceGained(dataset));
        }),
        { enabled: username !== null }
      );

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Card className={classes.enterUsernameCard}>
            <CardHeader title="Search Existing Usernames"/>
            <CardContent>
              <Grid
                container
                direction="row"
                alignItems="center"
              >
                <TextField
                  className={classes.textField}
                  id="username"
                  InputLabelProps={{ shrink: true, classes: { root: classes.textField } }}
                  InputProps={{classes: { notchedOutline: classes.textFieldOutline }}}
                  label="Username"
                  variant="outlined"
                  value={textFieldValue}
                  onChange={e => setTextFieldValue(e.target.value)}
                  onBlur={() => setUsername(textFieldValue)}
                  onKeyDown={(e) => {if (e.key === "Enter") { setUsername(textFieldValue); }}}
                  margin="normal"
                />
                <div style={{paddingRight: "10px"}}/>
                <Select
                  className={classes.selectField}
                  labelId="label"
                  id="select"
                  value={summaryType}
                  onChange={(e) => {
                    setSummaryType((e.target.value as SummaryTypes));
                    onSummaryTypeUpdate((e.target.value as SummaryTypes));
                  }}
                  inputProps={{classes: { icon: classes.icon}}}
                >
                  <MenuItem value="totalXP">Total XP</MenuItem>
                  <MenuItem value="gainedXP">Gained XP</MenuItem>
                  <MenuItem value="totalLevel">Total Level</MenuItem>
                  <MenuItem value="ranking">Ranking</MenuItem>
                </Select>
                <div style={{paddingRight: "10px"}}/>
                <Select
                  className={classes.selectField}
                  labelId="label"
                  id="select"
                  value={progressTimeframe}
                  onChange={
                    (e) => {
                      let timeframeMoment = moment() as moment.Moment;
                      switch (e.target.value) {
                        case "daily":
                          timeframeMoment.subtract(1, "days");
                          break;
                        case "weekly":
                          timeframeMoment.subtract(1, "weeks");
                          break;
                        case "monthly":
                          timeframeMoment.subtract(1, "months");
                          break;
                        case "yearly":
                          timeframeMoment.subtract(1, "years");
                          break;
                        default:
                          break;
                      }
                      setTimeframe(timeframeMoment);
                      setProgressTimeframe((e.target.value as ProgressTimeframes));
                      onProgressTimeframeUpdate((e.target.value as ProgressTimeframes));
                    }
                  }
                  inputProps={{classes: {icon: classes.icon}}}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="allTime">All Time</MenuItem>
                </Select>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
};