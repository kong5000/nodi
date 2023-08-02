import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES, THEMES } from '../style';
// import Like from '../assets/thumbs.svg';
import StyleText from './StyleText';
const Connect = ({ onPress }) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={styles.connectRow}
                onPress={onPress}>
                <Ionicons
                    style={styles.detailIcon}
                    name="paper-plane-outline" size={30}
                    color="white"
                />
                <StyleText
                    style={styles.connectText}
                    semiBold
                    text={"Connect"}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Connect

const styles = StyleSheet.create({
    connectText: {
        fontSize: 23,
        marginLeft: 2,
        color: "white"
    },
    connectRow: {
        // width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
        borderWidth: 2,
        borderColor: "white"
    },
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
        width: 65,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: "white",
        width: "100%",
        // height: 50,
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
        borderColor: "white",
        height: 70,
        width: 70,
        padding: 5,
        shadowOffset: {
            // width: 10,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        // padding: 20
        // borderWidth: 2,
    },
    buttonText: {
        fontSize: 25
    },
})