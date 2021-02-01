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


interface Dataset {
  skills_summary: any[];
  skills: any[];
  minigames: any[];
  bosses: any[];
}

export default function App() {
  const [username, setUsername] = useState("");
  const [userHighscores, setUserHighscores] = useState(
    {
      skills_summary: Array(),
      skills: Array(),
      minigames: Array(),
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
          label="Username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
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