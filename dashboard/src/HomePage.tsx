import React, { useState, useEffect } from "react";
import { Alert } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import LineGraph from "./Components/LineGraph";
import HighscoresTable from "./Components/Table";
import NewUserInputCard from "./Components/NewUserInputCard";
import UserSearchFiltersCard from "./Components/UserSearchFiltersCard";

export type SummaryTypes =  "totalXP" | "gainedXP" | "totalLevel" | "ranking";
export type ProgressTimeframes = "daily" | "weekly" | "monthly" | "yearly" | "allTime";
export type AlertStatusTypes = "Success" | "Warning" | "Failed" | "None";

export interface HighscoresData {
  skills_summary: any[];
  skills: any[];
  minigames: any[];
  bosses: any[];
}

export interface DataUpdate {
  (data: any): void;
}
export interface SummaryTypeUpdate {
  (summaryType: SummaryTypes): void;
}
export interface ProgressTimeframeUpdate {
  (progressTimeframe: ProgressTimeframes): void;
}
export interface StatusUpdate {
  (status: AlertStatusTypes): void;
}
export interface TextUpdate {
  (text: string): void;
}

export default function HomePage() {
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

  useEffect(() => {
    switch (summaryType) {
      case "totalLevel":
        setYAccessor({accessor: "total_levels", displayText: "Total Levels"});
        break;
      case "ranking":
        setYAccessor({accessor: "ranking", displayText: "Ranking"});
        break;
      case "gainedXP":
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
          return <Alert severity="error" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
        case "Success":
          return <Alert severity="success" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
        case "Warning":
          return <Alert severity="warning" onClose={() => setAlertStatus("None")}>{alertText}</Alert>;
        default:
          break;
    }
  };

  return (
    // @ts-ignore
    <div className="HomePage">
      {getAlertFromStatus(alertStatus)}

      <NewUserInputCard onStatusUpdate={updateAlertStatus} onAlertTextUpdate={updateAlertText}/>
      <UserSearchFiltersCard
        onUserDataUpdate={updateUserData}
        onSummaryTypeUpdate={updateSummaryType}
        onProgressTimeframeUpdate={updateProgressTimeframe}
        onStatusUpdate={updateAlertStatus}
        onAlertTextUpdate={updateAlertText}
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
  );
}