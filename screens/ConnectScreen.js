import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { ToggleButton } from 'react-native-paper';
import { storeSetting } from '../services/LocalStorage';

import React, { useState } from 'react'
import StyleText from '../components/StyleText';
import Footer from '../components/Footer';

const ConnectScreen = () => {
  const [genderMatchFilter, setGenderMatchFilter] = useState('')
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    }}>
      <StyleText
        text="Connection/Request Screen"
        fontSize={40}
        semiBold
      />
      <Footer />
    </SafeAreaView>
  )
}

export default ConnectScreen

const styles = StyleSheet.create({
  toggleText: {
    fontSize: 17
  },
  toggleButton: {
    width: 90
  },
})