import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import StyleText from '../components/StyleText'
import { BUTTON_STYLE, COLORS, FLEX_CENTERED } from '../style'

const CustomButton = ({ onPress, label, style, icon, textColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                ...FLEX_CENTERED,
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: COLORS.mainTheme,
                borderWidth: 0,
                display: 'flex',
                ...style
            }}>
                <View style={{marginRight: 12}}>
                    {icon && icon}
                </View>
                <StyleText
                    text={label}
                    fontSize={18}
                    semiBold
                    style={{
                        color: textColor ? textColor : 'white'
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})