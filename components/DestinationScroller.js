import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COMPONENTS, THEMES } from '../style'
import StyleText from './StyleText'

const DestinationScroller = ({ label, items, style, selectedTrip }) => {
    const [locations, setLocations] = useState([])
    useEffect(() => {
        setLocations(
            items.map((item) => {
                if (selectedTrip && selectedTrip.city == item) {
                    return <StyleText
                        text={item}
                        bold={true}
                    />
                }
                return <StyleText text={item} />
            })
        )
    }, [selectedTrip])

    return (
        <View style={[styles.top, style && style]}>
            <View style={styles.view}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.container}>
                    <View key={"header"} style={styles.textContainer}>
                        <StyleText
                            style={styles.header}
                            text={label}
                        />
                    </View>
                    {locations && locations.map((item, index) => <View
                        key={index}
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
    selectedText: {
        fontWeight: 'bold',
    },
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
        // marginVertical: 10,
        marginHorizontal: 10,
        ...THEMES.shadow,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 30,
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
        // ...COMPONENTS.component
        marginRight: 20
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