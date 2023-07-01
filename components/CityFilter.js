import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const CityFilter = ({cities, setActiveCity}) => {
    const test_cities =[
        "Vancouver, BC, Canada",
        "Montreal, QC, Canada",
        "Mexico City, Mexico"
    ]
    return (
        <View style={styles.cityFilter}>
            <Text>CityFilter</Text>
            <Ionicons name="options-outline" size={32} color="orange" />

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