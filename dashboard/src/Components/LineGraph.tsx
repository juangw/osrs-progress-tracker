import React, { useState, useEffect } from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from "react-vis";
import "../../node_modules/react-vis/dist/style.css";
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

export default function LineGraph(props: LineGraphProps) {
    const [mappedData, setMappedData] = useState([{x: 0, y: 0}]);
    const [yDomain, setYDomain] = useState([0, 10000]);

    useEffect(() => {
        if (!props.data.length) { return; }
        let maxY = 0;
        let minY = 4600000000;
        const graphData = props.data.map(function(item: any) {
            const value = Number(item[props.yAccessor.accessor]);
            maxY = value > maxY ? value : maxY;
            minY = value < minY ? value : minY;
            return {
              x: item[props.xAccessor.accessor],
              y: value,
            };
        });
        const yDiff = maxY - minY;
        setMappedData(_.orderBy(graphData, "x", ["asc"]));
        setYDomain([minY - (yDiff * 3), maxY + (yDiff * 3)]);
    },        [props]); // Only re-run the effect if props data changes

    return (
        // @ts-ignore
        <XYPlot
            width={1300}
            height={300}
            yDomain={yDomain}
            xType="ordinal"
            margin={{left: 100, right: 100, top: 40, bottom: 40}}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <LineSeries
                color="green"
                data={mappedData}/>
            <XAxis orientation={"bottom"} title={props.xAccessor.displayText} />
            <YAxis orientation={"left"} title={props.yAccessor.displayText} />
        </XYPlot>
    );
}