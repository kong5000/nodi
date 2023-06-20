import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Menu, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import { PLACES_API_KEY } from "@env"
import Destination from '../components/Destination';
import DateSelectorRow from '../components/DataSelectorRow';

const TravelSignup = () => {
    const [destinations, setDestinations] = useState([])
    const [trips, setTrips] = useState([])
    let trips_dummy = [{
        country: "Canada",
        statte: "BC",
        city: "Vancouver",
        from: "Jan 12",
        to: "Jan14"
    }]
    const [locations, setLocations] = useState([])

    const handleAddLocation = (newLocation) => {
        setLocations((prevLocations) => [
            ...prevLocations,
            newLocation
        ]);
    };


    return (
        <View style={styles.container}>
            <Text>Destination</Text>
           <Destination destinations={destinations} setDestinations={setDestinations}/>
        </View>
    )
}

export default TravelSignup

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