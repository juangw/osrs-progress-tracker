import React, { useState, useEffect } from "react";
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
    const [mappedData, setMappedData] = useState([{x: 0, y: 0}]);

    useEffect(() => {
        if (!props.data.length) { return; }
        const graphData = props.data.map(function(item: any) {
            console.log(item);
            return {
              x: item[props.xAccessor.accessor],
              y: Number(item[props.yAccessor.accessor]),
            };
        });
        setMappedData(graphData);
    },        [props]); // Only re-run the effect if props data changes
    
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
                data={mappedData}/>
            <XAxis title={props.xAccessor.displayText} />
            <YAxis title={props.yAccessor.displayText} />
        </XYPlot>
    );
}           