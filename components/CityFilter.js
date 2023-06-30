import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CityFilter = ({cities, setActiveCity}) => {
    const test_cities =[
        "Vancouver, BC, Canada",
        "Montreal, QC, Canada",
        "Mexico City, Mexico"
    ]
    return (
        <View style={styles.cityFilter}>
            <Text>CityFilter</Text>
        </View>
    )
}

export default CityFilter

const styles = StyleSheet.create({
    cityFilter:{
        width: '100%',
        backgroundColor: 'red'
    }
})