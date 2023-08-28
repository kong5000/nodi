import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyleText from './StyleText'

const BoxedText = ({ text }) => {
    return (
        <View style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: COLORS.neutralGrey,
            maxWidth: "50%",
            padding: 7,
            marginRight: '2.5%',
            marginBottom: '2.5%'
        }}>
            <StyleText
                text={text}
                fontSize={19}
            />
        </View>
    )
}

export default BoxedText

const styles = StyleSheet.create({})