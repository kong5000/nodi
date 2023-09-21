import { PLACES_API_KEY } from "@env";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import StyleText from './StyleText';
import { COLORS } from '../style';
const { width, height } = Dimensions.get('window');

const LocationSearch = ({ style, showIcon, mode, placeholder }) => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: COLORS.halfGrey,
            height: 55,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: "15%",
            borderRadius: 10,
            padding: 10,
            ...style
        }}>
            {showIcon && <Ionicons name="search-outline" size={26} color={COLORS.mainTheme} style={{
                zIndex: 1,

            }} />}

            <GooglePlacesAutocomplete
                // placeholder='Enter your placeholder text here'
                placeholder={placeholder}
                textInputProps={{
                    placeholderTextColor: COLORS.halfGrey,

                }}
                enablePoweredByContainer={false}
                // autoFillOnNotFound={true}
                styles={{
                    container: {
                        borderColor: 'purple'
                    },
                    textInput: {
                        // ...TEXT_STYLES.searchBarInput
                    },
                    listView: {
                        position: 'absolute',
                        left: -37,
                        width: width * 0.8,
                        zIndex: 2,
                        top: 60,
                        borderWidth: 1,

                    },
                    row: {

                    },
                    description: {
                        backgroundColor: 'red'
                        // ...TEXT_STYLES.searchBarText
                    },
                }}
                renderRow={(data, index) =>
                    <View style={{
                    }}>
                        <StyleText
                            text={data.description}
                        />
                    </View>
                }
                listViewDisplayed={false}
                onPress={(data, details = null) => {
                    // setHideDates(false)
                    // setLocation(data.description)
                    // setSearchVisible(false)
                    // ref.current.setAddressText(data.description)
                    // updateDestination(data.description)
                }}
                query={{
                    key: PLACES_API_KEY,
                    language: 'en',
                    types: mode ? mode : '(cities)'
                }}
                onFail={error => console.error(error)}
                debounce={100}
                fetchDetails={false}
            />
        </View>
    )
}

export default LocationSearch

const styles = StyleSheet.create({})