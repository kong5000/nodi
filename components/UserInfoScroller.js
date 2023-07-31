import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { THEMES } from '../style'

const UserInfoScroller = ({ interests }) => {
    return (
        <View style={styles.top}>
            <View style={styles.view}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.container}>
                    {interests && interests.map((interest, index) =>
                        <View
                            key={index}
                            style={styles.interest}>
                            <Text style={styles.text}>{interest}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>

    )
}

export default UserInfoScroller

const styles = StyleSheet.create({
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 1,
        // width: 80,
        padding: 10,
        borderColor: 'grey',
        // backgroundColor: 'black',
        height: "100%"
    },
    top: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    header: {
        fontSize: 20,
        // width: 90,
        // borderColor: 'black',
        // marginLeft: 10,
        // color: "white",

    },
    view: {
        ...THEMES.shadow,
        borderRadius: 8,
        // borderWidth: 2,
        backgroundColor: "white",

    },
    container: {
        height: 50,
        // width: "100%",
        // // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderRadius: 20,
    },
    interest: {
        borderRightWidth: 0.5,
        borderColor: "grey"
    },
    text: {
        padding: 10,
        margin: 5,
        fontSize: 18
    }
})