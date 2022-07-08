import React, { useState, useEffect, FC } from "react";
import { Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { postHighscoresForUser } from "../Datasets/highscores";
import { StatusUpdate, TextUpdate } from "../HomePage";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    enterUsernameCard: {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        width: "100%",
        height: "10%",
        boxShadow: "5px 5px 20px gray",
    },
    welcomeCard: {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        width: "100%",
        height: "10%",
        boxShadow: "5px 5px 20px gray",
    },
    textField: {
        color: theme.palette.secondary.main,
    },
    textFieldOutline: {
        borderColor: theme.palette.secondary.main,
    },
    button: {
        background: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
    }
}));

export const NewUserInputCard: FC<{onStatusUpdate: StatusUpdate, onAlertTextUpdate: TextUpdate}> = (
    {onStatusUpdate, onAlertTextUpdate}
) => {
    const classes = useStyles();
    const [newTextFieldValue, setNewTextFieldValue] = useState("");

    const createNewUser = (username: string) => postHighscoresForUser(username).then(result => {
        if (result === "Failed") {
            onAlertTextUpdate("Failed to Find Account to Track");
            onStatusUpdate("Failed");
        } else {
            onAlertTextUpdate("Account now being Tracked");
            onStatusUpdate("Success");
        }
    });

    return (
        // @ts-ignore
        <Grid
          container
          direction="column"
          alignItems="center"
        >
        <Grid item xs={6}>
            <Card className={classes.welcomeCard}>
                <CardHeader title="Welcome to the OSRS Progress Tracker"/>
            </Card>
            <div style={{paddingTop: "10px"}}/>
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
                onChange={e => {
                    setNewTextFieldValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        createNewUser(newTextFieldValue);
                    }
                }}
                margin="normal"
              />
              <div style={{paddingTop: "10px"}}/>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => createNewUser(newTextFieldValue)}
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