import { StyleSheet, Text } from 'react-native'
import React from 'react'
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

const StyleText = ({ text, style, bold, semiBold, fontSize }) => {
    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    });
    if (!fontsLoaded) {
        return <></>
    } else {
        let font = styles.text

        if (bold) font = styles.bold
        if (semiBold) font = styles.semiBold

        return (
            <Text style={[font, style, fontSize && { fontSize: fontSize }]}>{text}</Text>
        )
    }
}

export default StyleText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto_400Regular',
    },
    bold: {
        fontFamily: 'Roboto_700Bold',
    },
    semiBold: {
        fontFamily: 'Roboto_500Medium',

    }
})