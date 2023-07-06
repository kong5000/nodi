import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TEXT_STYLES } from '../style'

const TripInfo = ({ city, to, from, month }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{city}</Text>
      <View style={styles.dates}>

      <Text>Jan 1 to Feb 10 </Text>
      
      </View>
    </View>
  )
}

export default TripInfo

const styles = StyleSheet.create({
  header: {
    ...TEXT_STYLES.standard,
    color: "black"
  },
  dates: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    height: 100,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  }
})