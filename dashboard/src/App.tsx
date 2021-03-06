import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Alert } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import LineGraph from "./Components/LineGraph";
import HighscoresTable from "./Components/Table";
import Header from "./Components/Header";
import NewUserInputCard from "./Components/NewUserInputCard";
import UserSearchFiltersCard from "./Components/UserSearchFiltersCard";

export type SummaryTypes = "xp" | "totalLevel" | "ranking";
export type ProgressTimeframes = "daily" | "weekly" | "monthly" | "yearly" | "allTime";
export type AlertStatusTypes = "Success" | "Failed" | "None";

export default function App() {
  const [alertStatus, setAlertStatus] = useState<AlertStatusTypes>("None");
  const [alertText, setAlertText] = useState("");
  const [summaryType, setSummaryType] = useState<SummaryTypes>("xp");
  const [progressTimeframe, setProgressTimeframe] = useState<ProgressTimeframes>("daily");
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

  const updateAlertStatus = (status: AlertStatusTypes) => {
    setAlertStatus(status);
  };

  const updateAlertText = (text: string) => {
    setAlertText(text);
  };

  const updateSummaryType = (summaryTypeName: SummaryTypes) => {
    setSummaryType(summaryTypeName);
  };

  const updateProgressTimeframe = (timeFrame: ProgressTimeframes) => {
    setProgressTimeframe(timeFrame);
  };

  const updateUserData = (data: any) => {
    setUserHighscores(data);
  };

  useEffect(() => {
    switch (summaryType) {
      case "totalLevel":
        setYAccessor({accessor: "total_levels", displayText: "Total Levels"});
        break;
      case "ranking":
        setYAccessor({accessor: "ranking", displayText: "Ranking"});
        break;
      default:
        setYAccessor({accessor: "total_experience", displayText: "Total XP"});
        break;
    }
  },        [summaryType]); // Only re-run the effect if summary type changes

  const getAlertFromStatus = (status: string) => {
    switch (status) {
        case "Failed":
           return <Alert severity="error">{alertText}</Alert>;
        case "Success":
            return <Alert severity="success">{alertText}</Alert>;
        default:
            break;

    }
  };

  return (
    // @ts-ignore
    <Router>
      <div className="App">
        {Header()}
        {getAlertFromStatus(alertStatus)}

        <NewUserInputCard onStatusUpdate={updateAlertStatus} onAlertTextUpdate={updateAlertText}/>
        <UserSearchFiltersCard
          onUserDataUpdate={updateUserData}
          onSummaryTypeUpdate={updateSummaryType}
          onProgressTimeframeUpdate={updateProgressTimeframe}
        />

        <div>
          <LineGraph
            xAccessor={{accessor: "date", displayText: "Date"}}
            yAccessor={yAccessor}
            data={userHighscores.skills_summary}
          />
        </div>

        <div>
          <HighscoresTable
            data={userHighscores.skills}
            type="Skills"
            timeframe={progressTimeframe}
            includeLastUpdated={true}
          />
          <HighscoresTable
            data={userHighscores.bosses}
            type="Bosses"
            timeframe={progressTimeframe}
            includeLastUpdated={false}
          />
        </div>
      </div>
    </Router>
  );
}