import React, { useState, FC } from "react";
import { Button, Card, CardContent, CardHeader, Grid, TextField, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { postHighscoresForUser } from "../Datasets/highscores";
import { GithubIcon } from "../Icons/github";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    background: theme.palette.background.default,
  },
  welcomeCard: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    textAlign: "center",
    alignContent: "center",
    margin: "20px",
    height: "5em",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
  welcomeCardHeader: {
    height: "100%",
  },
  logoCard: {
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "left",
    margin: "0px 20px",
    padding: "10px",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
  logo: {
      height: 300,
      width: 450,
      border: `5px solid ${theme.palette.secondary.main}`,
      borderRadius: "5px",
      marginRight: "20px",
  },
  logoText: {
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "15px",
  },
  enterUsernameCard: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    margin: "20px",
    height: "10%",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
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
      marginLeft: "10px",
  }
}));

export type AlertStatusTypes = "Success" | "Warning" | "Failed" | "None";

export const HomePage: FC = () => {
  const classes = useStyles();

  const [alertStatus, setAlertStatus] = useState<AlertStatusTypes>("None");
  const [alertText, setAlertText] = useState("");
  const [newTextFieldValue, setNewTextFieldValue] = useState("");

  const getAlertFromStatus = (status: string) => {
    switch (status) {
      case "Failed":
        return <Alert severity="error" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
      case "Success":
        return <Alert severity="success" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
      case "Warning":
        return <Alert severity="warning" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
      default:
        break;
    }
  };

  const createNewUser = (username: string) => postHighscoresForUser(username).then(result => {
    if (result === "Failed") {
      setAlertText("Failed to Find Account to Track");
      setAlertStatus("Failed");
    } else {
      setAlertText("Account now being Tracked");
      setAlertStatus("Success");
    }
  });

  return (
    <div className={classes.home}>
      {getAlertFromStatus(alertStatus)}
      <Card className={classes.welcomeCard}>
          <CardHeader
            className={classes.welcomeCardHeader}
            title="Welcome to the Old School Runescape Progress Tracker"
          />
      </Card>

      <Card className={classes.logoCard}>
          <div>
            <img src="/oldSchoolLogo.jpg" alt="OSRS Logo" className={classes.logo} />
          </div>

          <div>
            <h5>What is This Site for?</h5>
            <p className={classes.logoText}>
              Track all of your Old School Runescape Progress here.
              By submitting your username below your account will beautomatically tracked daily for
              XP and boss KC gains.
              All of the work for this site is open source, so feel free to improve it on this Github repository
            </p>
            <a href="https://github.com/juangw/osrs-progress-tracker">
                <GithubIcon />
            </a>
          </div>
      </Card>

      <Card className={classes.enterUsernameCard}>
        <CardHeader title="Enter Username to Begin Tracking Your Account"/>
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
    </div>
  );
};