import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { TEXT_STYLES } from '../style'
import Ionicons from '@expo/vector-icons/Ionicons';

const TripInfo = ({ city, to, from, month, imageSource }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.connectButtonContainer} >
        <Ionicons
          color="white"
          name="chatbubble" size={30} />
      </TouchableOpacity>
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.header}>{city}</Text>
      <View
        style={{
          width: "80%",
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          margin:12
        }}
      />
      <View style={styles.dates}>
        <Text style={styles.dateText}>December</Text>
      </View>
    </View>
  )
}

export default TripInfo

const styles = StyleSheet.create({
  image: {
    height: "60%",
    width: "100%",
    borderRadius: 20,
    marginBottom: 10
  },
  header: {
    ...TEXT_STYLES.standard,
    color: "black",
    marginTop: 12
  },
  dates: {
    display: 'flex',
    flexDirection: 'row'
  },
  dateText:{
    fontSize: 20
  },
  container: {
    height: 300,
    borderRadius: 20,
    backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowOffset: {
      // width: 10,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  connectButtonContainer: {
    position: 'absolute',
    bottom: 130,
    right: 10,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "orange",
    width: 50,
    height: 50,
    borderRadius: 100
  },
  connectButton: {
    bottom: 105,
    right: 30,
    zIndex: 12,
    position: 'absolute'
  },
})