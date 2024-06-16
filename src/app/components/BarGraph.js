"use client";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip } from "victory";

const BarGraph = ({ data, containerStyle = {}, style = {}, theme = VictoryTheme.grayscale, x, height = 400, isMobile }) => {
    return (
        <div
            style={{
                ...containerStyle
            }}>
            <VictoryChart
                theme={theme}
                width={900}
                height={isMobile ? 900 : height}
                domainPadding={{ x: 40 }}
            >
                <VictoryBar
                    style={style}
                    data={data}
                    x={x}
                    // alignment="start"
                    labels={({ datum }) => datum.y}
                    labelComponent={<VictoryTooltip style={{
                        fontSize: isMobile ? 60 : 15
                    }}/>} />
                <VictoryAxis dependentAxis tickFormat={(t) => (Number.isInteger(t) ? t : null)} style={{
                    axis: {
                        stroke: "grey",
                        strokeWidth: 0.5
                    },
                    tickLabels: {
                        fontSize: isMobile ? 30 : 15,
                        fontFamily: "'Poppins', sans-serif"
                    }
                }} />
                <VictoryAxis style={{
                    axis: {
                        stroke: "grey",
                        strokeWidth: 0.5
                    },
                    tickLabels: {
                        fontSize: isMobile ? 20 : 12.5,
                        fontFamily: "'Poppins', sans-serif",
                        angle: isMobile ? 45 : 0
                    }
                }} />
            </VictoryChart>
        </div>
    )
}

export default BarGraph;