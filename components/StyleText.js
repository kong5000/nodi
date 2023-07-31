import { StyleSheet, Text } from 'react-native'
import React from 'react'
import {
    useFonts, WorkSans_100Thin,
    WorkSans_200ExtraLight,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_800ExtraBold,
    WorkSans_900Black,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light_Italic,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black_Italic,
} from '@expo-google-fonts/work-sans';
const StyleText = ({ text, style, bold, semiBold }) => {
    let [fontsLoaded] = useFonts({
        WorkSans_100Thin,
        WorkSans_200ExtraLight,
        WorkSans_300Light,
        WorkSans_400Regular,
        WorkSans_500Medium,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
        WorkSans_800ExtraBold,
        WorkSans_900Black,
        WorkSans_100Thin_Italic,
        WorkSans_200ExtraLight_Italic,
        WorkSans_300Light_Italic,
        WorkSans_400Regular_Italic,
        WorkSans_500Medium_Italic,
        WorkSans_600SemiBold_Italic,
        WorkSans_700Bold_Italic,
        WorkSans_800ExtraBold_Italic,
        WorkSans_900Black_Italic,
    });
    if (!fontsLoaded) {
        return <></>
    } else {
        let font = styles.text

        if (bold) font = styles.bold
        if (semiBold) font = styles.semiBold

        return (
            <Text style={[font, style]}>{text}</Text>
        )
    }
}

export default StyleText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'WorkSans_400Regular',
    },
    bold: {
        fontFamily: 'WorkSans_700Bold',
    },
    semiBold:{
        fontFamily: 'WorkSans_600SemiBold',

    }
})