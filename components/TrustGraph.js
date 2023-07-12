import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const TrustGraph = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, styles.topRow]}>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={90} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
        }}>
          <Ionicons name="person-circle-outline" size={70} color="black" />
        </TouchableOpacity>
      </View>
      <Text>TrustGraph</Text>
    </SafeAreaView>
  )
}

export default TrustGraph

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: "70%"
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 210
  },
  topRow: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})