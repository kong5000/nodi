import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import StyleText from './StyleText'
import { BUTTON_STYLE, COLORS, FLEX_CENTERED } from '../style'
const { width, height } = Dimensions.get('window');

const StyledButton = ({ text, enabled, onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[BUTTON_STYLE.button, enabled ? BUTTON_STYLE.enabledButton
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

export default StyledButton