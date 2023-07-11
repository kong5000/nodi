import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES, THEMES } from '../style';
// import Like from '../assets/thumbs.svg';
import Icon from './Icon'
const Connect = () => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.connectButton}>
                <Icon/>
                {/* <Icon/> */}
                {/* <Ionicons
                    color="#FFAB91"
                    name="thumbs-up-outline" size={50} /> */}
            </TouchableOpacity>
        </View>
    )
}

export default Connect

const styles = StyleSheet.create({
    trustButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 3,
        borderRadius: 50,
        height: 65,
        width: 65
    },
    container: {
        position: 'absolute',
        bottom: SIZES.footerHeight + 30,
        left: 140,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: "white",
        width: "100%",
        height: 50,
        ...THEMES.shadow
    },
    connectButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: "50%",
        // padding: 5,
        // height: 55,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#FFAB91",
        height: 70,
        width: 70,
        padding: 5,
        shadowOffset: {
            // width: 10,
            height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        // padding: 20
        // borderWidth: 2,
    },
    buttonText: {
        fontSize: 25
    },
})