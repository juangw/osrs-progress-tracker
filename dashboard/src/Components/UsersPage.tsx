import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import { Card, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { LineGraph } from "./LineGraph";
import { HighscoresTable } from "./UsersTable";
import { UserSearchFiltersCard } from "./UserSearchFiltersCard";
import Skeleton from "@material-ui/lab/Skeleton";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme: Theme) => ({
  users: {
    background: theme.palette.background.default,
  },
  tablesWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  border: {
    borderRight: "2px solid black",
    marginRight: "5px",
    marginLeft: "5px",
  },
  graphCard: {
    background: theme.palette.primary.main,
    margin: "20px",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
  updateTimeCard: {
    background: theme.palette.primary.main,
    padding: "10px",
    margin: "20px",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
  tableCard: {
    background: theme.palette.primary.main,
    margin: "20px",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
  CardLoader: {
    maxWidth: "none",
    margin: "20px",
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: "3px 3px 10px gray",
  },
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

export const UsersPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles(isLoading);

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
        <p style={{fontSize: 14}}>
          Highscores Results From: {lastUpdatedText}
        </p>
        <p style={{fontSize: 14}}>
          Compared Against Last Data Point From: {prevUpdatedText}
        </p>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.users}>
      {getAlertFromStatus(alertStatus)}

      <UserSearchFiltersCard
        onUserDataUpdate={setUserHighscores}
        onSummaryTypeUpdate={setSummaryType}
        onProgressTimeframeUpdate={setProgressTimeframe}
        onStatusUpdate={setAlertStatus}
        onAlertTextUpdate={setAlertText}
        setIsUserPageLoading={setIsLoading}
      />

      {
        isLoading
        ? <Skeleton className={classes.CardLoader} variant="rect">
            <LineGraph
              xAccessor={{accessor: "date", displayText: "Date"}}
              yAccessor={yAccessor}
              data={userHighscores.skills_summary}
            />
          </Skeleton>
        : <Card className={classes.graphCard}>
            <LineGraph
              xAccessor={{accessor: "date", displayText: "Date"}}
              yAccessor={yAccessor}
              data={userHighscores.skills_summary}
            />
          </Card>
      }

      {
        isLoading
        ? <Skeleton className={classes.CardLoader} variant="rect">
            {displayUpdatedTime(oldestUpdate, recentUpdate)}
          </Skeleton>
        : <Card className={classes.updateTimeCard}>
            {displayUpdatedTime(oldestUpdate, recentUpdate)}
          </Card>
      }

      {
        isLoading
        ? <Skeleton className={classes.CardLoader} variant="rect">
            <div className={classes.tablesWrapper}>
              <HighscoresTable
                data={userHighscores.skills}
                type="Skills"
                timeframe={progressTimeframe}
                onOldestUpdate={setOldestUpdate}
                onRecentUpdate={setRecentUpdate}
              />
              <div className={classes.border} />
              <HighscoresTable
                data={userHighscores.bosses}
                type="Bosses"
                timeframe={progressTimeframe}
              />
            </div>
          </Skeleton>
        : <Card className={classes.tableCard}>
            <div className={classes.tablesWrapper}>
              <HighscoresTable
                data={userHighscores.skills}
                type="Skills"
                timeframe={progressTimeframe}
                onOldestUpdate={setOldestUpdate}
                onRecentUpdate={setRecentUpdate}
              />
              <div className={classes.border} />
              <HighscoresTable
                data={userHighscores.bosses}
                type="Bosses"
                timeframe={progressTimeframe}
              />
            </div>
          </Card>
      }
    </div>
  );
};