import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyleText from './StyleText'
const Profile = ({ style, text }) => {
    return (
        <View style={[styles.container, style && style]}>
            <StyleText style={styles.profileText}
            // text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac auctor nibh. Ut id velit id nunc pretium ultricies.  Quisque ac auctor nibh."}
            text={text}
            />
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        // position: 'relative',
        // bottom: 50,
        // marginVertical: 15,
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginRight: "5%"
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