import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { ToggleButton } from 'react-native-paper';
import { storeSetting } from '../services/LocalStorage';

import React, { useState } from 'react'
import StyleText from '../components/StyleText';
import Footer from '../components/Footer';

const GenderSelector = () => {
    const [genderMatchFilter, setGenderMatchFilter] = useState('')
    const [women, setWomen] = useState(true)
    const [men, setMen] = useState(true)
    const [nonbinary, setNonbinary] = useState(true)
    return (
        <SafeAreaView style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'lightgrey',
            marginTop: 15
        }}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setWomen(!women)
                    }}
                    style={[
                        styles.toggleButton,
                        women ? { backgroundColor: "black" } : {},
                        {
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            borderRightWidth: 1,
                            borderColor:'lightgrey'
                        }
                    ]}
                >
                    <View>
                        <Text style={[styles.toggleText, women ? { color: "white" } : { color: "black" }]}>Women</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setMen((prev) => !prev)}
                    style={[
                        {
                            borderRightWidth: 1,
                            borderColor:'lightgrey'
                        },
                        styles.toggleButton,
                        men ? { backgroundColor: "black" } : {},
                    ]}
                    value="Men" >
                    <View>
                        <Text style={[styles.toggleText, men ? { color: "white" } : { color: "black" }]}>Men</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setNonbinary(prev => !prev)}
                    style={[
                        styles.toggleButton,
                        {
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20
                        },
                        nonbinary ? { backgroundColor: "black" } : {}
                    ]}
                    value="Non-binary" >
                    <View>
                        <Text style={[styles.toggleText, nonbinary ? { color: "white" } : { color: "black" }]}>Non-binary</Text>
                    </View>
                </TouchableOpacity>
                {/* <ToggleButton
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
        </ToggleButton> */}
            </View>
            {/* <Footer /> */}
        </SafeAreaView>
    )
}

export default GenderSelector

const styles = StyleSheet.create({
    toggleText: {
        fontSize: 17
    },
    toggleButton: {
        width: 90,
        // height:30,
        paddingVertical: 10,
        // borderWidth: 1,
        // borderColor: 'lightgrey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})