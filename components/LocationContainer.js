import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyleText from './StyleText'

const LocationContainer = ({ locations }) => {
    return (
        <View style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {locations && locations.forEach(location =>
                <StyleText
                    text={location}
                />
            )}

        </View>
    )
}

export default LocationContainer

const styles = StyleSheet.create({})