import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as style from '../style';
import StyleText from './StyleText';

const UserDetail = ({ text, icon, textStyle }) => {
    return (
        <View style={styles.container}>
            {icon}
            <StyleText text={text} fontSize={18} style={textStyle ? textStyle: null} />
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