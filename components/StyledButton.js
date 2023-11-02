import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BUTTON_STYLE } from '../style';
import StyleText from './StyleText';

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