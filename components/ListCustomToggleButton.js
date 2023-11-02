import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BUTTON_STYLE } from '../style';
import StyleText from './StyleText';

const ListCustomToggleButton = ({ onToggle, text, list, icon }) => {
    return (
        <TouchableOpacity onPress={() => onToggle()}>
            <View style={[BUTTON_STYLE.button, (list && list.includes(text))
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

export default ListCustomToggleButton