import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { ToggleButton } from 'react-native-paper';
import { storeSetting } from '../services/LocalStorage';

import React, { useState } from 'react'
import StyleText from '../components/StyleText';
import Footer from '../components/Footer';

const UserSettingsScreen = () => {
  const [genderMatchFilter, setGenderMatchFilter] = useState('')
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <View
        style={{
          borderColor: 'rgba(0, 0, 0, 0.25)',
          borderBottomWidth: 1,
          width: "100%",
          marginVertical: 5
        }}
      />
      <StyleText
        semiBold
        text="Gender Preferences"
        style={{ fontSize: 20 }}
      />
      <ToggleButton.Row
        style={styles.toggleRow}
        onValueChange={value => {
          setGenderMatchFilter(value)
          storeSetting('genderMatchFilter', value)
        }}
        value={genderMatchFilter}
      >
        <ToggleButton
          style={[
            styles.toggleButton,
            genderMatchFilter == "Women" ? { backgroundColor: "black" } : {},
            {
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20
            }
          ]}
          icon={() =>
            <View>
              <Text style={[styles.toggleText, genderMatchFilter == "Women" ? { color: "white" } : { color: "black" }]}>Women</Text>
            </View>
          }
          value="Women"
          color="red"
        >
        </ToggleButton>
        <ToggleButton
          style={[
            styles.toggleButton,
            genderMatchFilter == "Men" ? { backgroundColor: "black" } : {},
          ]}

          icon={() => <View>
            <Text style={[styles.toggleText, genderMatchFilter == "Men" ? { color: "white" } : { color: "black" }]}>Men</Text>
          </View>
          }
          value="Men" >
        </ToggleButton>
        <ToggleButton
          style={[
            styles.toggleButton,
            genderMatchFilter == "Non-binary" ? { backgroundColor: "black" } : {}
          ]}
          icon={() => <View>
            <Text style={[styles.toggleText, genderMatchFilter == "Non-binary" ? { color: "white" } : { color: "black" }]}>Non-binary</Text>
          </View>
          }
          value="Non-binary" >
        </ToggleButton>
        <ToggleButton
          style={[
            styles.toggleButton,
            genderMatchFilter == "everyone-gender" ? { backgroundColor: "black" } : {},
            {
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20
            }
          ]}
          icon={() => <View>
            <Text style={[styles.toggleText, genderMatchFilter == "everyone-gender" ? { color: "white" } : { color: "black" }]}>Everyone</Text>
          </View>
          }
          value="everyone-gender" >
        </ToggleButton>
      </ToggleButton.Row>
      <Footer />
    </SafeAreaView>
  )
}

export default UserSettingsScreen

const styles = StyleSheet.create({
  toggleText: {
    fontSize: 17
  },
  toggleButton: {
    width: 90
  },
})