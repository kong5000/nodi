import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"

const Location = ({ setHideDates, searchVisible, setSearchVisible, enabled, location, setLocation, updateLocation }) => {
    const ref = useRef()
    useEffect(() => {
        if (searchVisible) {
            ref.current.setAddressText(location)
        }
    }, [searchVisible])

    return (
        <View style={enabled ? styles.enable : styles.disabled}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {!searchVisible && <TouchableOpacity
                    disabled={!enabled}
                    onPress={() => {
                        setSearchVisible(true)
                        setHideDates(true)
                        ref.current.focus()

                    }}>
                    <View style={styles.dummySearch}>
                        <Text style={styles.dummyText}>
                            {location}
                        </Text>
                        {!location && <Text style={styles.dummySearchText}>
                            Search for a city
                        </Text>}

                    </View>

                </TouchableOpacity>}
                <View style={searchVisible ? {} : { display: 'none' }}
                >
                    <GooglePlacesAutocomplete
                        ref={ref}
                        height={200}
                        listViewDisplayed={false}
                        placeholder='Search for a city'
                        onPress={(data, details = null) => {
                            setHideDates(false)
                            setLocation(data.description)
                            updateLocation(data.description)
                            setSearchVisible(false)
                            ref.current.setAddressText(data.description)
                        }}
                        query={{
                            key: PLACES_API_KEY,
                            language: 'en',
                            types: '(cities)'
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
    enabled: {
    },
    disabled: {
        opacity: 0.6
    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dummySearch: {
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 6,
        width: "100%",
        // marginLeft: "10%",
        // marginRight: "10%",
        justifyContent: 'center',
        height: 47
    },
    dummySearchText: {
        color: 'grey',
        opacity: 0.5,
        fontSize: 15,
        paddingBottom: 16,
        paddingLeft: 10
    },
    dummyText: {
        color: 'black',
        fontSize: 15,
        // paddingBottom: 16,
        paddingLeft: 10
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