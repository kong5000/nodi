import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { PLACES_API_KEY } from "@env"

const Location = ({ searchVisible, setSearchVisible, enabled, location, setLocation, updateLocation }) => {
    const ref = useRef()
    useEffect(() => {
        if (searchVisible) {
            ref.current.setAddressText(location)
        }
    }, [searchVisible])

    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='always' >
                {!searchVisible && <TouchableOpacity
                    disabled={!enabled}
                    onPress={() => {
                        setSearchVisible(true)
                        ref.current.focus()

                    }}>
                    <View style={styles.dummySearch}>
                        <Text>
                            {location}
                        </Text>
                    </View>

                </TouchableOpacity>}
                <View style={searchVisible ? {} : { display: 'none' }}
                >
                    <GooglePlacesAutocomplete
                        ref={ref}
                        listViewDisplayed={false}
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            console.log(data.description);
                            setLocation(data.description)
                            updateLocation(data.description)
                            setSearchVisible(false)
                            ref.current.setAddressText(data.description)
                        }}
                        query={{
                            key: PLACES_API_KEY,
                            language: 'en',
                        }}
                        onFail={error => console.error(error)}
                        debounce={200}
                        fetchDetails={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    dateSelectorLabel: {
        flex: 0.5
    },
    dummySearch: {
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: 'white',
        width: "100%",
        padding: 10,
        height: 40
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