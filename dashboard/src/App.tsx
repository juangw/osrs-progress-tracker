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

export type SummaryTypes =  "totalXP" | "gainedXP" | "totalLevel" | "ranking";
export type ProgressTimeframes = "daily" | "weekly" | "monthly" | "yearly" | "allTime";
export type AlertStatusTypes = "Success" | "Failed" | "None";

interface HighscoresData {
  skills_summary: any[];
  skills: any[];
  minigames: any[];
  bosses: any[];
}

export default function App() {
  const [alertStatus, setAlertStatus] = useState<AlertStatusTypes>("None");
  const [alertText, setAlertText] = useState("");
  const [summaryType, setSummaryType] = useState<SummaryTypes>("totalXP");
  const [progressTimeframe, setProgressTimeframe] = useState<ProgressTimeframes>("daily");
  const [yAccessor, setYAccessor] = useState({accessor: "total_experience", displayText: "Total XP"});
  const [userHighscores, setUserHighscores] = useState<HighscoresData>(
    {
      skills_summary: [],
      skills: [],
      minigames: [],
      bosses: [],
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

  const getExperienceGained = (highscoresData: HighscoresData): HighscoresData => {
    highscoresData.skills_summary.map((summary, index) => {
      if (index === 0) { return summary.experience_gained = 0; }
      summary.experience_gained = summary.total_experience - highscoresData.skills_summary[index - 1].total_experience;
    });
    return highscoresData;
  };

  useEffect(() => {
    switch (summaryType) {
      case "totalLevel":
        setYAccessor({accessor: "total_levels", displayText: "Total Levels"});
        break;
      case "ranking":
        setYAccessor({accessor: "ranking", displayText: "Ranking"});
        break;
      case "gainedXP":
        setUserHighscores(getExperienceGained(userHighscores));
        setYAccessor({accessor: "experience_gained", displayText: "Gained XP"});
        break;
      default:
        setYAccessor({accessor: "total_experience", displayText: "Total XP"});
        break;
    }
  },        [summaryType]); // Only re-run the effect if summary type changes

  const getAlertFromStatus = (status: string) => {
    switch (status) {
        case "Failed":
           return <Alert severity="error" onClose={() => {setAlertStatus("None"); }}>{alertText}</Alert>;
        case "Success":
            return <Alert severity="success" onClose={() => {setAlertStatus("None"); }}>{alertText}</Alert>;
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