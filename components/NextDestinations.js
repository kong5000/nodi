import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../style'
import StyleText from './StyleText'
import CountryFlag from 'react-native-country-flag'
import { COUNTRY_ISO_MAP } from '../data'

const NextDestinations = ({ destinations }) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
        }}>
            {destinations && destinations.map(destination =>
                <View
                    key={destination}
                    style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: COLORS.neutralGrey,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        marginRight: '2.5%',
                        marginBottom: '2.5%',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                    <CountryFlag isoCode={COUNTRY_ISO_MAP[destination]} size={30}
                        style={{ borderRadius: 2, marginRight: 10 }} />
                    <StyleText
                        text={destination}
                        fontSize={19}
                    />
                </View>
            )
            }
        </View >
    )
}

export default NextDestinations

const styles = StyleSheet.create({})