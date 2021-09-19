import React, { useState, useEffect, FC } from "react";
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
} from "../HomePage";
import { customTheme } from "../Components/styling/theme";


const useStyles = makeStyles(theme => ({
    enterUsernameCard: {
        background: customTheme.primary,
        color: customTheme.tertiary,
        width: "100%",
        height: "30%",
    },
    textField: {
        color: customTheme.tertiary,
    },
    textFieldOutline: {
        borderColor: customTheme.tertiary,
    },
    selectField: {
        color: customTheme.tertiary,
    },
    icon: {
        fill: customTheme.tertiary,
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
    const [username, setUsername] = useState("");
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

    useEffect(() => {
        if (!username) { return; }
        console.log(`fetching highscores for user: ${username}`);
        let timeframe = moment() as moment.Moment | undefined;
        switch (progressTimeframe) {
          case "daily":
            if (typeof timeframe === "undefined") { return timeframe; }
            timeframe.subtract(1, "days");
            break;
          case "weekly":
            if (typeof timeframe === "undefined") { return timeframe; }
            timeframe.subtract(1, "weeks");
            break;
          case "monthly":
            if (typeof timeframe === "undefined") { return timeframe; }
            timeframe.subtract(1, "months");
            break;
          default:
            timeframe = undefined as undefined;
            break;
        }
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
        });
      },      [username, progressTimeframe]); // Only re-run the effect if username or timeframe changes

    return (
        // @ts-ignore
        <Grid
          container
          direction="row"
          alignItems="center"
        >
        <Grid item xs={12}>
        <Card className={classes.enterUsernameCard}>
        <CardHeader title="Username Data Visualization Filters:"/>
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
                <div style={{paddingRight: `${customTheme.horizontalSpacing}px`}}/>
                <Select
                    className={classes.selectField}
                    labelId="label"
                    id="select"
                    value={summaryType}
                    onChange={(e) => {setSummaryType(e.target.value); onSummaryTypeUpdate(e.target.value); }}
                    inputProps={{classes: { icon: classes.icon}}}
                >
                    <MenuItem value="totalXP">Total XP</MenuItem>
                    <MenuItem value="gainedXP">Gained XP</MenuItem>
                    <MenuItem value="totalLevel">Total Level</MenuItem>
                    <MenuItem value="ranking">Ranking</MenuItem>
                </Select>
                <div style={{paddingRight: `${customTheme.horizontalSpacing}px`}}/>
                <Select
                    className={classes.selectField}
                    labelId="label"
                    id="select"
                    value={progressTimeframe}
                    onChange={
                        (e) => {setProgressTimeframe(e.target.value); onProgressTimeframeUpdate(e.target.value); }
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