import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const MatchScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>HOME</Text>
      </TouchableOpacity>
      <Text>MatchScreen</Text>
    </SafeAreaView>
  )
}

export default MatchScreen

const styles = StyleSheet.create({})