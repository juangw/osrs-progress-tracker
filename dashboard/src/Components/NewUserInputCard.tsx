import React, { useState, useEffect, FC } from "react";
import { Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { postHighscoresForUser } from "../Datasets/highscores";
import { StatusUpdate, TextUpdate } from "../HomePage";
import { customTheme } from "../Components/styling/theme";


const useStyles = makeStyles(theme => ({
    enterUsernameCard: {
        background: customTheme.primary,
        color: customTheme.tertiary,
        width: "100%",
        height: "10%",
    },
    welcomeCard: {
        background: customTheme.primary,
        color: customTheme.tertiary,
        width: "100%",
        height: "10%",
    },
    textField: {
        color: `${customTheme.tertiary}`,
    },
    textFieldOutline: {
        borderColor: `${customTheme.tertiary}`,
    },
    button: {
        background: customTheme.secondary,
        borderColor: customTheme.tertiary,
        color: customTheme.tertiary,
    }
}));

export const NewUserInputCard: FC<{onStatusUpdate: StatusUpdate, onAlertTextUpdate: TextUpdate}> = (
    {onStatusUpdate, onAlertTextUpdate}
) => {
    const classes = useStyles();

    const [newTextFieldValue, setNewTextFieldValue] = useState("");
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        if (!newUsername) { return; }
        console.log(`inserting highscores for new user: ${newUsername}`);
        postHighscoresForUser(newUsername).then(result => {
            if (result === "Failed") {
                onAlertTextUpdate("Failed to Find Account to Track");
                onStatusUpdate("Failed");
            } else {
                onAlertTextUpdate("Account now being Tracked");
                onStatusUpdate("Success");
            }
        });
    },        [newUsername]); // Only re-run the effect if new username entered

    return (
        // @ts-ignore
        <Grid
          container
          direction="column"
          alignItems="center"
        >
        <Grid item xs={6}>
            <Card className={classes.welcomeCard}>
                <CardHeader title="Welcome the OSRS Progress Tracker"/>
            </Card>
            <div style={{paddingTop: `${customTheme.verticalSpacing}px`}}/>
            <Card className={classes.enterUsernameCard}>
            <CardHeader title="Enter Your Username To Begin Tracking Account:"/>
            <CardContent>
            <Grid
              container
              direction="row"
              alignItems="center"
            >
              <TextField
                className={classes.textField}
                id="newUsername"
                InputLabelProps={{ shrink: true, classes: { root: classes.textField } }}
                InputProps={{classes: { notchedOutline: classes.textFieldOutline }}}
                label="Username"
                variant="outlined"
                value={newTextFieldValue}
                onChange={e => setNewTextFieldValue(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") { setNewUsername(newTextFieldValue); }}}
                margin="normal"
              />
              <div style={{paddingRight: `${customTheme.horizontalSpacing}px`}}/>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => setNewUsername(newTextFieldValue)}
              >
                  Submit
              </Button>
            </Grid>
            </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
};