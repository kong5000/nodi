import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES, THEMES } from '../style';

const Connect = () => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={{ width: "50%", display:'flex', flexDirection: 'row', alignItems:'center',justifyContent:'center' }}>
                <Ionicons
                    color="blue"
                    name="shield-checkmark-outline" size={40} />
                <Text style={styles.trustText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.buttonText} >Connect</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Connect

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: SIZES.footerHeight,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "white",
        width: "100%",
        height: 55,
        ...THEMES.shadow
    },
    connectButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        borderLeftWidth: 2,
        borderLeftColor: 'grey',
        height: 55
    },
    buttonText: {
        fontSize: 25
    },
    trustText: {
        fontSize: 20,
        marginLeft: 5
    }
})