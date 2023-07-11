import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryArea } from 'victory-native'
import CustomLabel from './CustomLabel'
const Chart = () => {
    const sampleData = [
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 3 },
        { x: 5, y: 2 }
    ]
    return (
        <VictoryChart domainPadding={{ x: 8}}>
            <VictoryArea
                //   interpolation="natural"
                style={{ data: { fill: "teal" } }}
                labels={({ datum }) => datum.y}
                data={sampleData}
                // labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                labelComponent={<CustomLabel/>}
            />
            {/* <VictoryLine
      interpolation="natural"
      labels={({ datum }) => datum.y}

    //   labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
      data={sampleData}
    /> */}
        </VictoryChart>

    )
}

export default Chart

const styles = StyleSheet.create({})