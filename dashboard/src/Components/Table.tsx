import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { cleanNumber } from "../Datasets/common";
import { styles } from "./styling/table.css";

import _ from "lodash";


interface RowData {
    experience?: string;
    level?: string;
    count?: string;
    ranking?: string;
    date: string;
}

interface HighscoresData {
    date: string;
}

interface TableProps {
    data: HighscoresData[];
    type: "Skills" | "Bosses";
    includeLastUpdated: boolean;
}

export default function HighscoresTable(props: TableProps) {
    const [prevUpdated, setPrevUpdated] = useState("N/A");
    const [lastUpdated, setLastUpdated] = useState("N/A");
    const [keys, setKeys] = useState([""]);
    const [currentValues, setCurrentValues] = useState<RowData[]>([{date: ""}]);
    const [compareValues, setCompareValues] = useState<RowData[]>([{date: ""}]);

    useEffect(() => {
        if (!props.data.length) { return; }
        const orderedProps = _.orderBy(props.data, "date", ["desc"]);
        setLastUpdated(orderedProps[0].date);
        setKeys(Object.keys(orderedProps[0]));
        setCurrentValues(Object.values(orderedProps[0]));
        if (typeof orderedProps[1] !== "undefined") {
            setCompareValues(Object.values(orderedProps[1]));
            setPrevUpdated(orderedProps[1].date);
        }
    },        [props]); // Only re-run the effect if props data changes

    const computeDifference = (
        currentVals: RowData[],
        compareVals: RowData[],
        index: number,
        field: "experience" | "ranking" | "level" | "count",
    ) => {
        let difference;
        if (typeof currentVals[index] !== "undefined" && typeof compareVals[index] !== "undefined") {
            const currentValue = currentVals[index][field] === "-1" ? "0" : currentVals[index][field];
            const compareValue = compareVals[index][field] === "-1" ? "0" : compareVals[index][field];
            difference = Number(currentValue) - Number(compareValue);
        } else {
            difference = 0;
        }
        if (field === "ranking") { difference = difference * -1; }
        return difference;
    };

    const getStyledCell = (value: number) => {
        if (value > 0) {
            return <TableCell align="left" style={styles.tableCellPositive}>{cleanNumber(value)}</TableCell>;
        }
        if (value < 0) {
            return <TableCell align="left" style={styles.tableCellNegative}>{cleanNumber(value)}</TableCell>;
        }
        return <TableCell align="left" style={styles.tableCells}>{cleanNumber(value)}</TableCell>;
    };

    const createRows = (tableType: string, key: string, index: number) => {
        if (key === "date") { return; }
        return (
            <TableRow style={{height: 1}} key={key}>
                <TableCell component="th" scope="row" style={styles.tableCells}>
                    {key.toUpperCase().replace(/_/g, " ")}
                </TableCell>
                {tableType === "Skills" ? (
                    <React.Fragment>
                        <TableCell align="left" style={styles.tableCells}>
                            {cleanNumber(Number(currentValues[index].experience))}
                        </TableCell>
                        {getStyledCell(computeDifference(currentValues, compareValues, index, "experience"))}
                        <TableCell align="left" style={styles.tableCells}>
                            {cleanNumber(Number(currentValues[index].level))}
                        </TableCell>
                        {getStyledCell(computeDifference(currentValues, compareValues, index, "level"))}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TableCell align="left" style={styles.tableCells}>
                            {
                                cleanNumber(Number(
                                    currentValues[index].count === "-1"
                                    ? "0"
                                    : currentValues[index].count
                                ))
                            }
                        </TableCell>
                        {getStyledCell(computeDifference(currentValues, compareValues, index, "count"))}
                    </React.Fragment>
                )}
                <TableCell align="left" style={styles.tableCells}>
                    {
                        cleanNumber(Number(
                            currentValues[index].ranking === "-1"
                            ? "0"
                            : currentValues[index].ranking
                        ))
                    }
                </TableCell>
                {getStyledCell(computeDifference(currentValues, compareValues, index, "ranking"))}
            </TableRow>
        );
    };

    const displayUpdatedTime = (lastUpdatedTime: string, prevUpdatedTime: string) => {
        return (
            <React.Fragment>
                <p style={{fontSize: 14}}>Highscores Results From: {lastUpdatedTime}</p>
                <p style={{fontSize: 14}}>Compared Against Last Data Point From: {prevUpdatedTime}</p>
            </React.Fragment>
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
            {props.includeLastUpdated ? displayUpdatedTime(lastUpdated, prevUpdated) : <React.Fragment/>}

            <Table style={{ width: "40%" }} size="small">
                <TableHead style={styles.tableHeader}>
                    <TableRow key={"headers"}>
                        {getTableHeaderCells(props.type)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key: string, index: number) => createRows(props.type, key, index))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}