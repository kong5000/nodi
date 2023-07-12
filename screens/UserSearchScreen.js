import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import Footer from '../components/Footer'

const UserSearchScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.screen}>
            <Text>UserSearchScreen</Text>
            <Footer />
        </View>
    )
}

export default UserSearchScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white"
    },

})