import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, SIZES } from '../style'
import { FontAwesome5 } from '@expo/vector-icons';

const Footer = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')
            }}>
                <Ionicons name="person-outline" size={33} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Conversations')
            }}>
                <Ionicons name="chatbubbles-sharp" size={33} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Signup')
            }}>
                <Ionicons name="paper-plane-outline" size={33} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                navigation.navigate('Settings')
            }}>
                <FontAwesome5 name="cog" size={33} color="white" />
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
        height: SIZES.footerHeight,
        width: "100%",
        backgroundColor: COLORS.darkBlue,
        borderTopColor: '#D3D3D3',
        borderTopWidth: 2
    },
})