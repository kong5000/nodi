import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.profileText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac auctor nibh. Sed malesuada dolor eget nulla posuere suscipit. Ut id velit id nunc pretium ultricies.  Quisque ac auctor nibh.           </Text>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 50,
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 20,
        shadowOffset: {
            // width: 10,
            // height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 20
    },
    profileText: {
        fontSize: 20,
        fontWeight: "500"
    },
    comma: {
        // color: black,
        fontSize: 40
    }
})