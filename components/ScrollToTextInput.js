import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONT_SIZE } from '../style'
import { TextInput } from 'react-native-paper'

const ScrollToTextInput = ({ scrollTo, value, setValue, label }) => {
    const componentRef = useRef()
    return (
        <View ref={componentRef} collapsable={false}>
            <TextInput
                onFocus={() => {
                    if (componentRef.current) {
                        componentRef.current.measure((x, y, width, height, pageX, pageY) => {
                            scrollTo({ x: 0, y: pageY })
                        });
                    }
                }}
                theme={{
                    colors: {
                        onSurfaceVariant: COLORS.halfGrey,
                    }
                }}
                label={label}
                activeOutlineColor='black'
                mode='outlined'
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                value={value}
                onChangeText={text => setValue(text)}
            />
        </View>
    )
}

export default ScrollToTextInput

const styles = StyleSheet.create({
    textInput: {
        color: 'black',
        minWidth: "85%",
        height: 55,
        backgroundColor: 'white',
        marginBottom: '4%',
        fontWeight: '700'
    },
    textInputOutline: {
        borderColor: COLORS.neutralGrey,
        borderRadius: FONT_SIZE.small
    }

})