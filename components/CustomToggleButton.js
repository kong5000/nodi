import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import StyleText from './StyleText'
import { BUTTON_STYLE, COLORS, FLEX_CENTERED } from '../style'
const { width, height } = Dimensions.get('window');

const CustomToggleButton = ({ onToggle, text, list, icon }) => {
    return (
        <TouchableOpacity onPress={() => onToggle()}>
            <View style={[BUTTON_STYLE.button, list.includes(text)
                ? BUTTON_STYLE.enabledButton
                : BUTTON_STYLE.disabledButton]
            }>
                {icon}
                <StyleText
                    text={text}
                    fontSize={16}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CustomToggleButton