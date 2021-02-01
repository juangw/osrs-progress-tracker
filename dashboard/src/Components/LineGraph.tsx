import React from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from "react-vis";
import "../../node_modules/react-vis/dist/style.css";


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
    const remappedData = props.data.map(function(item: any) {
        return {
          x: Number(item[props.xAccessor.accessor]),
          y: Number(item[props.yAccessor.accessor]),
        };
    });
    return (
    <XYPlot
    width={1300}
    height={300}
    xType="ordinal"
    margin={{left: 100, right: 100, top: 40, bottom: 40}}
    >
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries
            color="green"
            data={remappedData}/>
        <XAxis title={props.xAccessor.displayText} />
        <YAxis title={props.yAccessor.displayText} />
    </XYPlot>
    );
}           