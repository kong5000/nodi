import { StyleSheet, Text, View } from 'react-native'
import { InputToolbar } from 'react-native-gifted-chat';
import React from 'react'

// @Todo style input text box here

const CustomInputToolbar = (props) => {
  return (
    <InputToolbar containerStyle={styles.inputToolbarBackground} {...props} />
  )
}

export default CustomInputToolbar

const styles = StyleSheet.create({
    inputToolbarBackground: {
    },
  });