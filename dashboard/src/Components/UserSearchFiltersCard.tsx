import React, { useState, useEffect } from "react";
import { Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
import moment from "moment";
import { getHistoricalHighscoresForUser } from "../Datasets/highscores";
import { translateDataset } from "../Datasets/common";
import { SummaryTypes, ProgressTimeframes } from "../App";


const useStyles = makeStyles((theme: any) => ({
    enterUsernameCard: {
        margin: theme.spacing(2),
        width: "80%",
        height: theme.spacing(25),
    },
    textField: {
        margin: theme.spacing(2),
    },
    selectField: {
        margin: theme.spacing(2),
    }
}));

interface DataUpdate {
    (data: any): void;
}
interface SummaryTypeUpdate {
    (summaryType: SummaryTypes): void;
}
interface ProgressTimeframeUpdate {
    (progressTimeframe: ProgressTimeframes): void;
}

export default function UserSearchFiltersCard(
    {onUserDataUpdate, onSummaryTypeUpdate, onProgressTimeframeUpdate}:
    {
        onUserDataUpdate: DataUpdate,
        onSummaryTypeUpdate: SummaryTypeUpdate,
        onProgressTimeframeUpdate: ProgressTimeframeUpdate
    }
) {
    const classes = useStyles();
    const [textFieldValue, setTextFieldValue] = useState("");
    const [username, setUsername] = useState("");
    const [summaryType, setSummaryType] = useState<SummaryTypes>("xp");
    const [progressTimeframe, setProgressTimeframe] = useState<ProgressTimeframes>("daily");

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
        getHistoricalHighscoresForUser(username, timeframe)
          .then(data => onUserDataUpdate(translateDataset(data)));
      },      [username, progressTimeframe]); // Only re-run the effect if username or timeframe changes

    return (
        // @ts-ignore
        <Grid
          container
          direction="row"
          alignItems="center"
        >
        <Grid item xs={10}>
        <Card className={classes.enterUsernameCard}>
        <CardHeader title="Filter Usernames to Search For:"/>
        <CardContent>
            <Grid
              container
              direction="row"
              alignItems="center"
            >
                <TextField
                    className={classes.textField}
                    id="username"
                    InputLabelProps={{ shrink: true }}
                    label="Username"
                    value={textFieldValue}
                    onChange={e => setTextFieldValue(e.target.value)}
                    onBlur={() => setUsername(textFieldValue)}
                    onKeyDown={(e) => {if (e.key === "Enter") { setUsername(textFieldValue); }}}
                    margin="normal"
                />
                <Select
                    className={classes.selectField}
                    labelId="label"
                    id="select"
                    value={summaryType}
                    onChange={(e) => {setSummaryType(e.target.value); onSummaryTypeUpdate(e.target.value); }}
                >
                    <MenuItem value="xp">XP</MenuItem>
                    <MenuItem value="totalLevel">Total Level</MenuItem>
                    <MenuItem value="ranking">Ranking</MenuItem>
                </Select>
                <Select
                    className={classes.selectField}
                    labelId="label"
                    id="select"
                    value={progressTimeframe}
                    onChange={
                        (e) => {setProgressTimeframe(e.target.value); onProgressTimeframeUpdate(e.target.value); }
                    }
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                    <MenuItem value="allTime">All Time</MenuItem>
                </Select>
            </Grid>
        </CardContent>
        </Card>
        </Grid>
        </Grid>
    );
}