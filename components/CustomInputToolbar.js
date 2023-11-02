import React from 'react';
import { StyleSheet } from 'react-native';
import { InputToolbar } from 'react-native-gifted-chat';

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