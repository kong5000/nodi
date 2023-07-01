import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

import Ionicons from '@expo/vector-icons/Ionicons'

const Footer = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')
            }}>
                <Ionicons name="person-outline" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')
            }}>
                <Ionicons name="earth-outline" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Conversations')
            }}>
                <Ionicons name="chatbubbles-sharp" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')
            }}>
                <Ionicons name="options-outline" size={33} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        height: 100,
        width: "100%",
        backgroundColor: 'white',
        borderTopColor: '#D3D3D3',
        borderTopWidth: 2
    },
})