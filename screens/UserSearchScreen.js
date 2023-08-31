import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import Footer from '../components/Footer'
import Ionicons from '@expo/vector-icons/Ionicons';

const UserSearchScreen = () => {
    const navigation = useNavigation()
    const DUMMY_DATA = [
        {
            name: "Al",
            id: 1
        },
        {
            name: "Anna",
            id: 2
        },
        {
            name: "Bary",
            id: 3
        },
        {
            name: "Chuck",
            id: 4
        }
    ]
    const [data, setData] = useState([])
    const [input, setInput] = useState('')

    const onChangeText = async (text) => {
        setInput(text)
        if (text) {
            setData(DUMMY_DATA.filter(profile => profile.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())))
        } else {
            setData([])
        }
    }
    return (
        <View style={styles.screen}>
            <FlatList
                keyExtractor={item => item.id}
                data={data}
                renderItem={({ item, index }) => (
                    <Pressable
                        style={styles.person}
                        onPress={() => alert(`pressed`)}
                    >
                        <Text
                            style={styles.resultText}
                        >{item.name}</Text>
                        <Ionicons
                            style={styles.detailIcon}
                            name="person-outline" size={32} />
                    </Pressable>
                )
                }
                showsVerticalScrollIndicator={false}
            />
            <Footer />
        </View>
    )
}

export default UserSearchScreen

const styles = StyleSheet.create({
    person: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        paddingRight: 10,
        height: 60
    },
    screen: {
        flex: 1,
        backgroundColor: "white"
    },
    resultText: {
        fontSize: 20,
        marginLeft: 15
    }
})