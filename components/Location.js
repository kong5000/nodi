import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { PLACES_API_KEY } from "@env"

const Location = () => {
    const [location, setLocation] = useState('')
    const [searchVisible, setSearchVisible] = useState(false)
    const ref = useRef()
    useEffect(()=>{
        if(searchVisible){
            ref.current.focus()
        }
    },[searchVisible])
    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='always' >
                {!searchVisible && <TouchableOpacity onPress={() => {
                    setSearchVisible(true)
                }}>
                    <View style={styles.dummySearch}>
                        <Text>
                            {location}
                        </Text>
                    </View>

                </TouchableOpacity>}
                {searchVisible && <GooglePlacesAutocomplete
                    ref={ref}
                    listViewDisplayed={false}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        console.log(data.description);
                        setLocation(data.description)
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
                />}

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