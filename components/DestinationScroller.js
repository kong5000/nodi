import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { COMPONENTS, THEMES } from '../style'

const DestinationScroller = ({ label, items, matches, style }) => {
    return (
        <View style={[styles.top, style && style]}>
            <View style={styles.view}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.container}>
                    <View key={"header"} style={styles.textContainer}>
                        <Text style={styles.header}>{label}</Text>
                    </View>
                    {matches && matches.map((item) => <View
                        key={item}
                        style={[styles.component, styles.selectedComponent]}>
                        <Text style={styles.componentTextActive}>{item}</Text>
                    </View>)}
                    {items && items.map((item) => <View
                        key={item}
                        style={styles.component}>
                        <Text style={styles.componentText}>{item}</Text>
                    </View>)}
                </ScrollView>
            </View>
        </View>

    )
}

export default DestinationScroller

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        borderColor: 'grey',
        height: "100%",
        margin: 5
    },
    itemText: {
        fontSize: 20,
    },
    match: {
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 0,
        // borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'grey',
        backgroundColor: 'black',
        height: "100%"
    },
    matchText: {
        fontSize: 20,
        // width: 90,
        // borderColor: 'black',
        // marginLeft: 10,
        color: "white",
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 0,
        // width: 80,
        padding: 10,
        borderColor: 'grey',
        // backgroundColor: 'black',
        height: "100%"
    },
    top: {
        marginVertical: 10,
        marginHorizontal: 10,
        ...THEMES.shadow,
    },
    header: {
        fontSize: 20,
        // width: 90,
        borderColor: 'black',
        // marginLeft: 10,
        // color: "white",

    },
    view: {
        // ...THEMES.shadow,
        borderRadius: 8,
        // borderWidth: 2,
        backgroundColor: "white",

    },
    container: {
        height: 55,
        // width: "100%",
        // // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    text: {
        padding: 10,
        margin: 5,
        fontSize: 18
    },
    component: {
        ...COMPONENTS.component
    },
    selectedComponent: {
        ...COMPONENTS.selectedComponent

    },
    componentText: {
        ...COMPONENTS.componentText

    },
    componentTextActive: {
        ...COMPONENTS.componentTextActive
    },
})