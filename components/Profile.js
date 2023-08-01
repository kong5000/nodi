import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyleText from './StyleText'
const Profile = ({ style }) => {
    return (
        <View style={[styles.container, style && style]}>
            <StyleText style={styles.profileText}
            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac auctor nibh. Ut id velit id nunc pretium ultricies.  Quisque ac auctor nibh."}
            />
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        // position: 'relative',
        // bottom: 50,
        marginVertical: 15,
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
        shadowRadius: 2,
        padding: 30,
        paddingTop: 35,
        marginHorizontal: 10
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