import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { THEMES } from '../style'

const Interests = () => {
    return (
        <View style={styles.view}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scroll} contentContainerStyle={styles.container}>
                <View style={styles.interest}>
                    <Text style={styles.text}>⛰️ Hiking</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>⛰️ Hiking</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>🍻 Pubs and Bars</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Interests

const styles = StyleSheet.create({
    view: {
        ...THEMES.shadow,
        borderRadius: 8,
        // borderWidth: 2,
        backgroundColor: "white"
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
        borderRadius: 20,
    },
    interest: {
        borderRightWidth: 0.5,
        borderColor: "grey"
    },
    text:{
        padding: 10,
        margin: 5,
        fontSize: 18
    }
})