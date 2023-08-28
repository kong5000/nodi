import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../style'
import StyleText from './StyleText'

const NextDestinations = ({ destinations }) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
        }}>
            {destinations.map(destination =>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: COLORS.neutralGrey,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginRight: '2.5%',
                    marginBottom: '2.5%'
                }}>
                    <StyleText
                        text={destination}
                        fontSize={19}
                    />
                </View>
            )}
        </View>
    )
}

export default NextDestinations

const styles = StyleSheet.create({})