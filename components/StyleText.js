import { StyleSheet, Text } from 'react-native'
import React from 'react'
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  } from '@expo-google-fonts/inter';
const StyleText = ({ text, style, bold, semiBold, fontSize }) => {
    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
      });
    if (!fontsLoaded) {
        return <></>
    } else {
        let font = styles.text

        if (bold) font = styles.bold
        if (semiBold) font = styles.semiBold

        return (
            <Text style={[font, style, fontSize && {fontSize: fontSize}]}>{text}</Text>
        )
    }
}

export default StyleText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter_400Regular',
    },
    bold: {
        fontFamily: 'Inter_700Bold',
    },
    semiBold:{
        fontFamily: 'Inter_600SemiBold',

    }
})