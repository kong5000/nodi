import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');

const Slide = ({label, alignRight}) => {
  return (
    <View style={{
        width
    }}>
      <Text>{label}</Text>
    </View>
  )
}

export default Slide

const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    slider: {
      height: 0.61 * height
    },
    footer: {
      flex: 1
    }
  });