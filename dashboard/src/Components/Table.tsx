import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { styles } from "./styling/table.css";

import _ from "lodash";


interface SkillRowData {
    experience: string;
    ranking: string;
    level: string;
    date: string;
    [key: string]: string;
}

interface HighscoresData {
    date: string;
}

interface TableProps {
    data: HighscoresData[];
}

export default function HighscoresTable(props: TableProps) {
    const [prevUpdated, setPrevUpdated] = useState("N/A");
    const [lastUpdated, setLastUpdated] = useState("N/A");
    const [keys, setKeys] = useState([""]);
    const [currentValues, setCurrentValues] = useState([{date: "", experience: "0", level: "0", ranking: "0"}]);
    const [compareValues, setCompareValues] = useState([{date: "", experience: "0", level: "0", ranking: "0"}]);

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
        currentVals: SkillRowData[],
        compareVals: SkillRowData[],
        index: number,
        field: string,
    ) => {
        let difference;
        if (typeof currentVals[index] !== "undefined" && typeof compareVals[index] !== "undefined") {
            difference = Number(currentVals[index][field]) - Number(compareVals[index][field]);
        } else if (typeof currentVals[index] !== "undefined") {
            difference = Number(currentVals[index][field]);
        } else {
            difference = 0;
        }
        if (field === "ranking") { difference = difference * -1; }
        return difference;
    };

    const getStyledCell = (value: number) => {
        console.log(value);
        if (value > 0) { return <TableCell align="left" style={styles.tableCellPositive}>{value}</TableCell>; }
        if (value < 0) { return <TableCell align="left" style={styles.tableCellNegative}>{value}</TableCell>; }
        return <TableCell align="left" style={styles.tableCells}>{value}</TableCell>;
    };

    const createRows = (skill: string, index: number) => {
        if (skill === "date") { return; }
        const experienceDiff = computeDifference(currentValues, compareValues, index, "experience");
        const levelDiff = computeDifference(currentValues, compareValues, index, "level");
        const rankingDiff = computeDifference(currentValues, compareValues, index, "ranking");
        return (
            <TableRow key={skill}>
                <TableCell component="th" scope="row" style={styles.tableCells}>
                    {skill.toUpperCase()}
                </TableCell>
                <TableCell align="left" style={styles.tableCells}>
                    {currentValues[index].experience}
                </TableCell>
                {getStyledCell(experienceDiff)}
                <TableCell align="left" style={styles.tableCells}>
                    {currentValues[index].level}
                </TableCell>
                {getStyledCell(levelDiff)}
                <TableCell align="left" style={styles.tableCells}>
                    {currentValues[index].ranking}
                </TableCell>
                {getStyledCell(rankingDiff)}
            </TableRow>
        );
    };

    return (
        // @ts-ignore
        <React.Fragment>
            <p>Highscores Results From: {lastUpdated} Compared Against Last Data Point From: {prevUpdated}</p>

            <Table>
                <TableHead style={styles.tableHeader}>
                    <TableRow key={"headers"}>
                        <TableCell align="left">Skill Name</TableCell>
                        <TableCell align="left">Current Experience</TableCell>
                        <TableCell align="left">Experience Gained</TableCell>
                        <TableCell align="left">Current Level</TableCell>
                        <TableCell align="left">Levels Gained</TableCell>
                        <TableCell align="left">Current Ranking</TableCell>
                        <TableCell align="left">Ranks Gained</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((skill: string, index: number) => createRows(skill, index))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}