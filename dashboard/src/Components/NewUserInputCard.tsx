import React, { useState, useEffect } from "react";
import { Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { postHighscoresForUser } from "../Datasets/highscores";
import { StatusUpdate, TextUpdate } from "../AppEntry";


const useStyles = makeStyles((theme: any) => ({
    enterUsernameCard: {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(25),
    },
    textField: {
        margin: theme.spacing(1),
    }
}));

export default function NewUserInputCard(
    {onStatusUpdate, onAlertTextUpdate}: {onStatusUpdate: StatusUpdate, onAlertTextUpdate: TextUpdate}
) {
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
        <Grid item xs={5}>
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
                InputLabelProps={{ shrink: true }}
                label="Username"
                value={newTextFieldValue}
                onChange={e => setNewTextFieldValue(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") { setNewUsername(newTextFieldValue); }}}
                margin="normal"
              />
              <Button variant="outlined" onClick={() => setNewUsername(newTextFieldValue)}>Submit</Button>
            </Grid>
            </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
}