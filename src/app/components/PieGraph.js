"use client";
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryTooltip } from "victory";

const PieGraph = ({ data, colorScale, containerStyle={}, style={}, theme=VictoryTheme.material, radius}) => {
    return (
        <div
        style={{
            ...containerStyle
        }}>
            <VictoryPie
                style={style}
                colorScale={colorScale}
                data={data} 
                theme={theme}
                radius={radius}
                labels={({ datum }) => Math.round(datum.y*10000)/100+"%"}
                labelComponent = {<VictoryTooltip/>}/>
        </div>
    )
}

export default PieGraph;