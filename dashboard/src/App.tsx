import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem } from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LineGraph from "./Components/LineGraph";
import { getHistoricalHighscoresForUser } from "./Datasets/highscores";
import { translateDataset } from "./Datasets/common";


export default function App() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [username, setUsername] = useState("");
  const [summaryType, setSummaryType] = useState("xp");
  const [yAccessor, setYAccessor] = useState({accessor: "total_experience", displayText: "Total XP"});
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
    if (!username) { return; }
    console.log(`fetching highscores for ${username}`);
    getHistoricalHighscoresForUser(username).then(data => setUserHighscores(translateDataset(data)));
  },        [username]); // Only re-run the effect if username changes

  useEffect(() => {
    switch (summaryType) {
      case "totalLevel":
        setYAccessor({accessor: "total_levels", displayText: "Total Levels"});
        break;
      case "ranking":
        setYAccessor({accessor: "ranking", displayText: "Ranking"});
        break;
      default:
        break;
    }
  },        [summaryType]); // Only re-run the effect if summary type changes

  return (
    <Router>
      <div className="App">
        <h1>Old School Runescape Progress Tracker</h1>

        <div>
          <TextField
            id="username"
            InputLabelProps={{ shrink: true }}
            label="Username"
            value={textFieldValue}
            onChange={e => setTextFieldValue(e.target.value)}
            onBlur={() => setUsername(textFieldValue)}
            margin="normal"
          />
        </div>

        <div>
          <Select
            labelId="label"
            id="select"
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value)}
          >
            <MenuItem value="xp">XP</MenuItem>
            <MenuItem value="totalLevel">Total Level</MenuItem>
            <MenuItem value="ranking">Ranking</MenuItem>
          </Select>
        </div>


        <LineGraph
          xAccessor={{accessor: "date", displayText: "Date"}}
          yAccessor={yAccessor}
          data={userHighscores.skills_summary}
        />
      </div>
    </Router>
  );
}