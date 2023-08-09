import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyleText from './StyleText'
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEMES } from '../style';
const ProfileInfoContainer = ({ icon, text, last }) => {
    return (
        <View
            style={{
                padding:6,
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 10,
                // borderRadius: 10,
                // borderTopWidth: 1,
                // borderBottomWidth: last ? 1 : 0,
                // justifyContent:'center',
                alignItems: 'center',
                shadowOffset: {
                    // width: 10,
                    // height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1,
                // padding: 20
                backgroundColor:'white'
            }}
        >
            <Ionicons
                style={{
                    marginHorizontal: 10
                }}
                name={icon}
                size={32}
            />
            <StyleText
                text={text}
                style={{ fontSize: 22 }}
            />
        </View>
    )
}

export default ProfileInfoContainer

const styles = StyleSheet.create({

})