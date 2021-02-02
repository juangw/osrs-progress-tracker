import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LineGraph from "./Components/LineGraph";
import { getHistoricalHighscoresForUser } from "./Datasets/highscores";
import { translateDataset } from "./Datasets/common";


export default function App() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [username, setUsername] = useState("");
  const [userHighscores, setUserHighscores] = useState(
    {
      // eslint-disable-next-line
      skills_summary: Array(),
      // eslint-disable-next-line
      skills: Array(),
      // eslint-disable-next-line
      minigames: Array(),
      // eslint-disable-next-line
      bosses: Array(),
    }
  );

  useEffect(() => {
    console.log(`fetching highscores for ${username}`);
    getHistoricalHighscoresForUser(username).then(data => setUserHighscores(translateDataset(data)));
  },        [username]); // Only re-run the effect if username changes

  return (
    <Router>
      <div className="App">
        <h1>Old School Runescape Progress Tracker</h1>

        <TextField
          id="username"
          InputLabelProps={{ shrink: true }}
          label="Username"
          value={textFieldValue}
          onChange={e => {
            setTextFieldValue(e.target.value);
          }}
          onBlur={() => setUsername(textFieldValue)}
          margin="normal"
        />

        <LineGraph
        xAccessor={{accessor: "date", displayText: "Date"}}
        yAccessor={{accessor: "total_experience", displayText: "XP Gained"}}
        data={userHighscores.skills_summary}/>
      </div>
    </Router>
  );
}