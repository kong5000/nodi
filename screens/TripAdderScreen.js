import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import Footer from '../components/Footer'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"
import { COLORS, TEXT_STYLES } from '../style';
import TravelSignup from './TravelSignup';

const TripAdderScreen = () => {
    const destination = {}
    const [searchVisible, setSearchVisible] = useState(false)
    const [hideDates, setHideDates] = useState(false)
    const [edit, setEdit] = useState(true)
    const [localValid, setLocalValid] = useState(false)
    const [location, setLocation] = useState('')
    const ref = useRef()
    const [dayTo, setDayTo] = useState(destination.dayTo);
    const [dayFrom, setDayFrom] = useState(destination.dayFrom);
    const [monthFrom, setMonthFrom] = useState(destination.monthFrom);
    const [monthTo, setMonthTo] = useState(destination.monthTo);
    const save = () => {
        console.log("ssave")
        if (!isValid()) {
            checkForm()
            alert("Please complete")
        } else {
            checkForm()
            setSearchVisible(false)
            updateDestination(index, { city: location, dayFrom, monthFrom, dayTo, monthTo })
            setEdit(false)
            setLocalValid(true)
        }
    }
    const updateLocation = (newLocation) => {
        updateDestination(index, { city: newLocation, dayFrom, dayTo })
    }
    return (
        <View style={styles.screen}>
            <TravelSignup
                setTrips={() =>
                    console.log('set')}
                trips={[]}
                setPage={() => console.log("page")}
            />
        </View>
    )
}

export default TripAdderScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: "red"
    },

})