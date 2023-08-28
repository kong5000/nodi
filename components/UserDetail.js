import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import StyleText from './StyleText';
import * as style from '../style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'

const UserDetail = ({ text, icon }) => {
    return (
        <View style={styles.container}>
            <Ionicons
                name={icon}
                size={32}
                style={{marginRight: "2%"}}
            />
            <StyleText
                text={text}
                fontSize={18}
            />
        </View>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    container: {
        ...style.FLEX_CENTERED,
        flexDirection: 'row',
        marginTop: '2%',
        maxWidth: "100%"
    }
})