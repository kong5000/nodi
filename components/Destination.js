import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import DateSelectorRow from '../components/DataSelectorRow';
import Location from './Location';

const Destination = ({destinations, setDestinations}) => {
    const [location, setLocation] = useState(null)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    let isValid = to && from && location

    let trips_dummy = [{
        country: "Canada",
        state: "BC",
        city: "Vancouver",
        from: "Jan 12",
        to: "Jan14"
    }]

    const updateDestinations = () => {
        const newDestination = {
            location,
            from,
            to
        }
        setDestinations([...destinations, newDestination])
    }


    return (
        <View style={styles.container}>
            <Location setLocation={setLocation} location={location} />
            <DateSelectorRow to={to} setTo={setTo} from={from} setFrom={setFrom} />
        </View>
    )
}

export default Destination

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'green'
    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dateSelectorRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchBar: {
        width: '85%',
        height: '50%',
        backgroundColor: 'purple',
        borderWidth: 2,
        borderColor: 'black'
    }
})