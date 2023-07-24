import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"
import { COLORS, TEXT_STYLES, THEMES } from '../style';

const Location = ({ setHideDates, searchVisible, setSearchVisible, enabled, location, setLocation }) => {
    const ref = useRef()
    // useEffect(() => {
    //     if (searchVisible) {
    //         ref.current.setAddressText(location)
    //     }
    // }, [searchVisible])

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {!searchVisible && <TouchableOpacity
                    disabled={!enabled}
                    onPress={() => {
                        setSearchVisible(true)
                        setHideDates(true)
                        ref.current.focus()

                    }}>
                    <View style={styles.dummySearch}>
                        {location && <Text style={styles.dummyText}>
                            {location}
                        </Text>}
                        {!location && <Text style={TEXT_STYLES.searchBarText}>
                            Search for a city
                        </Text>}

                    </View>

                </TouchableOpacity>}
                <View style={searchVisible ? {} : { display: 'none' }}
                >
                    <GooglePlacesAutocomplete
                        enablePoweredByContainer={false}
                        // autoFillOnNotFound={true}
                        styles={{
                            textInput: {
                                ...TEXT_STYLES.searchBarInput
                            },
                            listView: {
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: COLORS.brightContrast,
                                backgroundColor: COLORS.mainTheme
                            },
                            row: {
                                backgroundColor: COLORS.mainTheme,
                                borderColor: COLORS.brightContrast,
                                // ...TEXT_STYLES.searchBarText

                            },
                            description: {
                                ...TEXT_STYLES.searchBarText
                            },
                        }}
                        listEmptyComponent={<TouchableOpacity>
                            <Text style={TEXT_STYLES.searchBarText}>Couldn't find it?</Text>
                        </TouchableOpacity>}
                        ref={ref}
                        height={200}
                        listViewDisplayed={false}
                        placeholder=''
                        onPress={(data, details = null) => {
                            console.log(data.description)
                            setHideDates(false)
                            setLocation(data.description)
                            setSearchVisible(false)
                            ref.current.setAddressText(data.description)
                        }}
                        query={{
                            key: PLACES_API_KEY,
                            language: 'en',
                            types: '(cities)'
                        }}
                        onFail={error => console.error(error)}
                        debounce={100}
                        fetchDetails={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    container: {

    },
    enabled: {
    },
    disabled: {
        opacity: 0.6
    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dummySearch: {
        ...TEXT_STYLES.searchBarInput,
        // marginLeft: "10%",
        // marginRight: "10%",
        // height: 47,
        // paddingBottom: 5
    },
    dummyText: {
        color: 'black',
        fontFamily: 'Montserrat_400Regular',
        // paddingBottom: 16,
        fontSize: 20,
        paddingLeft: 10
    },
    dummySearchText: {
        ...TEXT_STYLES.standard
        // color: 'red',
        // fontFamily: 'Montserrat_400Regular',
        // fontSize: 20,
        // paddingLeft: 10,
        // paddingBottom: 15
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