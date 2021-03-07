import React, { useState, useEffect } from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries, LineMarkSeriesPoint, Hint } from "react-vis";
import { cleanNumber } from "../Datasets/common";
import "../../node_modules/react-vis/dist/style.css";
import moment from "moment";
import _ from "lodash";


interface Accessor {
    accessor: string;
    displayText: string;
}

interface LineGraphProps {
    xAccessor: Accessor;
    yAccessor: Accessor;
    data: any[];
}

interface Coordinate {
    x: Date;
    y: number;
}

export default function LineGraph(props: LineGraphProps) {
    const [mappedData, setMappedData] = useState<Coordinate[] | any[] | undefined>(undefined);
    const [yDomain, setYDomain] = useState([0, 10000]);
    const [hoverValue, setHoverValue] = useState<Coordinate | LineMarkSeriesPoint | undefined>(undefined);
    const defaultEmptyData = [{x: new Date("1/1/2020"), y: 0}];

    useEffect(() => {
        if (!props.data.length) { return; }
        let maxY = 0;
        let minY = 4600000000;
        const graphData = props.data.map(function(item: any) {
            const value = Number(item[props.yAccessor.accessor]);
            maxY = value > maxY ? value : maxY;
            minY = value < minY ? value : minY;
            const coordinate: Coordinate = {
              x: moment(item[props.xAccessor.accessor]).toDate(),
              y: value,
            };
            return coordinate;
        });
        const yDiff = maxY - minY;
        const lowerBound = (minY - (yDiff * 1.5) < 0) ? minY - (yDiff * 1.5) : 0;
        setMappedData(_.orderBy(graphData, "x", ["asc"]));
        setYDomain([lowerBound, maxY + (yDiff * 1.5)]);
    },        [props]); // Only re-run the effect if props data changes

    const createTooltip = () => {
        if (typeof hoverValue === "undefined" || typeof mappedData === "undefined") { return; }
        return (
            <Hint value={hoverValue} style={{fontSize: 14}}>
                <div style={{background: "rgba(45, 45, 45, 0.75)", color: "white", borderStyle: "solid", borderColor: "black"}}>
                    <div style={{fontSize: 12}}>Date: {moment(hoverValue.x).format("MM-DD-YYYY HH:mm")}</div>
                    <div style={{fontSize: 12}}>Value: {cleanNumber(hoverValue.y as number)}</div>
                </div>
            </Hint>
        );
    };

    return (
        // @ts-ignore
        <XYPlot
            width={1300}
            height={300}
            yDomain={yDomain}
            xType="time"
            margin={{left: 100, right: 100, top: 40, bottom: 40}}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <LineMarkSeries
                color="#CF6D46"
                data={typeof mappedData === "undefined" ? defaultEmptyData : mappedData}
                onSeriesMouseOut={() => setHoverValue(undefined)}
                onNearestX={(value: LineMarkSeriesPoint) => setHoverValue(value)}
            />
            {createTooltip()}
            <XAxis
                orientation={"bottom"}
                title={props.xAccessor.displayText}
                tickFormat={(d: Date) => moment(d).format("MMM DD HH:mm")}
                tickLabelAngle={-20}
                tickTotal={typeof mappedData === "undefined" ? 0 : 12}
            />
            <YAxis orientation={"left"} title={props.yAccessor.displayText} />
        </XYPlot>
    );
}