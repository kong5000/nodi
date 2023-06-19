import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"

const Setup3 = () => {
    const ref = useRef();
    const [locations, setLocations] = useState([])

    const handleAddLocation = (newLocation) => {
        setLocations((prevLocations) => [
            ...prevLocations,
            newLocation
        ]);
    };

    return (
        <View style={styles.container}>
            {locations.map(location => <Text>{location}</Text>)}
            <Text>Where are you headed?</Text>
            <Text>{PLACES_API_KEY}key heye</Text>
            <View style={styles.searchBar} >
                {/* <ScrollView keyboardShouldPersistTaps='always' > */}
                <GooglePlacesAutocomplete
                    listViewDisplayed={false}
                    ref={ref}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        ref.current.setAddressText('')
                        console.log(data.description);
                        handleAddLocation(data.description)
                    }}
                    query={{
                        key: PLACES_API_KEY,
                        language: 'en',
                    }}
                    onFail={error => console.error(error)}
                    debounce={200}
                    fetchDetails={false}
                />
                {/* </ScrollView> */}
            </View>
        </View>
    )
}

export default Setup3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'green'
    },
    searchBar: {
        flex: 1,
        width: '85%',
        height: '100%',
        backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'black'
    }
})