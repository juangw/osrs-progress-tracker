import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import { Alert } from "@material-ui/core";
import { customTheme } from "./Components/styling/theme";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { LineGraph } from "./Components/LineGraph";
import { HighscoresTable } from "./Components/Table";
import { NewUserInputCard } from "./Components/NewUserInputCard";
import { UserSearchFiltersCard } from "./Components/UserSearchFiltersCard";

const useStyles = makeStyles(theme => ({
  home: {
    background: customTheme.secondary,
    height: "100%",
    width: "100%",
  },
  tablesWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  border: {
    borderRight: "2px solid black",
    marginRight: "5px",
    marginLeft: "5px",
  }
}));

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
export interface OldestUpdate {
  (update: string): void;
}
export interface RecentUpdate {
  (update: string): void;
}

export const HomePage: FC = () => {
  const classes = useStyles();

  const [alertStatus, setAlertStatus] = useState<AlertStatusTypes>("None");
  const [oldestUpdate, setOldestUpdate] = useState<string>("N/A");
  const [recentUpdate, setRecentUpdate] = useState<string>("N/A");
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

  const updateOldestUpdate = (updated: string) => {
    setOldestUpdate(updated);
  };

  const updateRecentUpdate = (updated: string) => {
    setRecentUpdate(updated);
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

  const displayUpdatedTime = (lastUpdatedTime: string, prevUpdatedTime: string) => {
    const lastUpdatedText = lastUpdatedTime === "N/A" ? "N/A" : moment(lastUpdatedTime).format("MM-DD-YYYY HH:mm");
    const prevUpdatedText = prevUpdatedTime === "N/A" ? "N/A" : moment(prevUpdatedTime).format("MM-DD-YYYY HH:mm");
    return (
        <React.Fragment>
            <p style={{fontSize: 14, color: customTheme.tertiary}}>
                Highscores Results From: {lastUpdatedText}
            </p>
            <p style={{fontSize: 14, color: customTheme.tertiary}}>
                Compared Against Last Data Point From: {prevUpdatedText}
            </p>
        </React.Fragment>
    );
};

  return (
    // @ts-ignore
    <div className={classes.home}>
      {getAlertFromStatus(alertStatus)}

      <div style={{paddingTop: `${customTheme.verticalSpacing}px`}}/>
      <NewUserInputCard onStatusUpdate={updateAlertStatus} onAlertTextUpdate={updateAlertText}/>

      <div style={{paddingTop: `${customTheme.verticalSpacing}px`}}/>
      <UserSearchFiltersCard
        onUserDataUpdate={updateUserData}
        onSummaryTypeUpdate={updateSummaryType}
        onProgressTimeframeUpdate={updateProgressTimeframe}
        onStatusUpdate={updateAlertStatus}
        onAlertTextUpdate={updateAlertText}
      />

      <div style={{paddingTop: `${customTheme.verticalSpacing}px`}}/>
      <LineGraph
        xAccessor={{accessor: "date", displayText: "Date"}}
        yAccessor={yAccessor}
        data={userHighscores.skills_summary}
      />

      <div style={{paddingTop: `${customTheme.verticalSpacing}px`}}/>
      {displayUpdatedTime(oldestUpdate, recentUpdate)}
      <div className={classes.tablesWrapper}>
        <HighscoresTable
          data={userHighscores.skills}
          type="Skills"
          timeframe={progressTimeframe}
          onOldestUpdate={updateOldestUpdate}
          onRecentUpdate={updateRecentUpdate}
        />
        <div className={classes.border} />
        <HighscoresTable
          data={userHighscores.bosses}
          type="Bosses"
          timeframe={progressTimeframe}
        />
      </div>
    </div>
  );
};