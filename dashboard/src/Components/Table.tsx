import React, { useState, useEffect, FC } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme } from "@material-ui/core";
import { cleanNumber } from "../Datasets/common";
import { OldestUpdate, RecentUpdate, ProgressTimeframes } from "../HomePage";

import _ from "lodash";

const useStyles = makeStyles((theme: Theme) => ({
    tableHeader: {
        color: theme.palette.secondary.main,
        background: theme.palette.primary.background,
     },
     tableCells: {
        color: theme.palette.secondary.main,
        fontWeight: "bold" as "bold"
     },
     tableCellPositive: {
        fontWeight: "bold",
        color: "green",
     },
     tableCellNegative: {
        fontWeight: "bold",
        color: "red",
     },
     tableCellNeutral: {
        fontWeight: "bold",
        color: theme.palette.secondary.main,
     }
}));


interface RowData {
    [key: string]: RowInfo;
}

interface RowInfo {
    experience?: string;
    level?: string;
    count?: string;
    ranking?: string;
    date: string;
}

interface TableProps {
    data: RowData[];
    type: "Skills" | "Bosses";
    timeframe: ProgressTimeframes;
    onOldestUpdate?: OldestUpdate;
    onRecentUpdate?: RecentUpdate;
}

export const HighscoresTable: FC<TableProps> = (props) => {
    const classes = useStyles();
    const [keys, setKeys] = useState(["placeholder"]);
    const [lastValues, setLastValues] = useState<RowData>({placeholder: {"date": ""}});
    const [earliestValues, setEarliestValues] = useState<RowData>({placeholder: {"date": ""}});

    useEffect(() => {
        if (!props.data.length) { return; }
        const orderedProps: RowData[] = _.orderBy(props.data, "date", ["desc"]);

        // Grab most recent data
        const latestDatapoint = orderedProps[0];
        const firstKey = Object.keys(latestDatapoint)[0];
        if (props.onRecentUpdate) { props.onRecentUpdate(latestDatapoint[firstKey].date); }
        setLastValues(latestDatapoint);
        setKeys(Object.keys(orderedProps[0]));

        // Grab oldest data
        if (typeof orderedProps[1] !== "undefined") {
            const earliestDatapoint = orderedProps[orderedProps.length - 1];
            const earliestKey = Object.keys(earliestDatapoint)[0];
            setEarliestValues(earliestDatapoint);
            if (props.onOldestUpdate) { props.onOldestUpdate(earliestDatapoint[earliestKey].date); }
        }
    },        [props]); // Only re-run the effect if props data changes

    const computeDifference = (
        lastVals: RowData,
        earliestVals: RowData,
        key: string,
        field: "experience" | "ranking" | "level" | "count",
    ) => {
        let difference;
        if (typeof lastVals[key] !== "undefined" && typeof earliestVals[key] !== "undefined") {
            const currentValue = lastVals[key][field] === "-1" ? "0" : lastVals[key][field];
            const compareValue = earliestVals[key][field] === "-1" ? "0" : earliestVals[key][field];
            difference = Number(currentValue) - Number(compareValue);
        } else if (typeof lastVals[key] !== "undefined" && typeof earliestVals[key] === "undefined") {
            const currentValue = lastVals[key][field] === "-1" ? "0" : lastVals[key][field];
            const compareValue = 0;
            difference = Number(currentValue) - Number(compareValue);
        } else {
            difference = 0;
        }
        if (field === "ranking") { difference = difference * -1; }
        return difference;
    };

    const getStyledCell = (value: number) => {
        if (value > 0) {
            return <TableCell align="left" className={classes.tableCellPositive}>{cleanNumber(value)}</TableCell>;
        }
        if (value < 0) {
            return <TableCell align="left" className={classes.tableCellNegative}>{cleanNumber(value)}</TableCell>;
        }
        return <TableCell align="left" className={classes.tableCells}>{cleanNumber(value)}</TableCell>;
    };

    const createRows = (tableType: string, key: string) => {
        if (key === "placeholder" || key === "date") { return; }
        return (
            <TableRow style={{height: 1}} key={key}>
                <TableCell component="th" scope="row" className={classes.tableCells}>
                    {key.toUpperCase().replace(/_/g, " ")}
                </TableCell>
                {tableType === "Skills" ? (
                    <React.Fragment>
                        <TableCell align="left" className={classes.tableCells}>
                            {cleanNumber(Number(lastValues[key].experience))}
                        </TableCell>
                        {getStyledCell(computeDifference(lastValues, earliestValues, key, "experience"))}
                        <TableCell align="left" className={classes.tableCells}>
                            {cleanNumber(Number(lastValues[key].level))}
                        </TableCell>
                        {getStyledCell(computeDifference(lastValues, earliestValues, key, "level"))}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TableCell align="left" className={classes.tableCells}>
                            {
                                cleanNumber(Number(
                                    lastValues[key].count === "-1"
                                    ? "0"
                                    : lastValues[key].count
                                ))
                            }
                        </TableCell>
                        {getStyledCell(computeDifference(lastValues, earliestValues, key, "count"))}
                    </React.Fragment>
                )}
                <TableCell align="left" className={classes.tableCells}>
                    {
                        cleanNumber(Number(
                            lastValues[key].ranking === "-1"
                            ? "0"
                            : lastValues[key].ranking
                        ))
                    }
                </TableCell>
                {getStyledCell(computeDifference(lastValues, earliestValues, key, "ranking"))}
            </TableRow>
        );
    };

    const getTableHeaderCells = (tableType: string) => {
        return (
            <React.Fragment>
                <TableCell align="left">{tableType}</TableCell>
                {tableType === "Skills" ? (
                    <React.Fragment>
                        <TableCell align="left">Current Experience</TableCell>
                        <TableCell align="left">Experience Gained</TableCell>
                        <TableCell align="left">Current Level</TableCell>
                        <TableCell align="left">Levels Gained</TableCell>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TableCell align="left">Current Count</TableCell>
                        <TableCell align="left">Count Gained</TableCell>
                    </React.Fragment>
                )}
                <TableCell align="left">Current Ranking</TableCell>
                <TableCell align="left">Ranks Gained</TableCell>
            </React.Fragment>
        );
    };

    return (
        // @ts-ignore
        <React.Fragment>
            <Table style={{ width: "40%" }} size="small">
                <TableHead className={classes.tableHeader}>
                    <TableRow key={"headers"}>
                        {getTableHeaderCells(props.type)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key: string) => createRows(props.type, key))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};