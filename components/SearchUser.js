import { Pressable, TouchableWithoutFeedback, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SIZES } from '../style'
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchUser = ({ onChangeText, input }) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.view}>
                <View style={styles.search}>
                    <TouchableOpacity onPress={showModal}>
                        <Ionicons
                            name="options-outline" size={42} />
                    </TouchableOpacity>
                    <TextInput placeholder='Search For User'
                        value={input}
                        onChangeText={onChangeText}
                        style={{
                            height: "100%",
                            marginHorizontal: 12,
                            // borderWidth: 1,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            width: "80%",
                            // backgroundColor: 'red',
                            fontSize: 18
                        }}
                    />
                </View>
                <FlatList
                    keyExtractor={item => item.id}
                    data={data}
                    renderItem={({ item, index }) => (
                        <Pressable
                            style={styles.person}
                            onPress={() => alert(`pressed`)}
                        >
                            <Text>{item.name}</Text>
                            <Ionicons
                                style={styles.detailIcon}
                                name="person-outline" size={32} />
                        </Pressable>
                    )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>

    )
}

export default SearchUser

const styles = StyleSheet.create({
    search: {
        display: 'flex',
        flexDirection: 'row'
    },
    containerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        height: "50%",
        width: "100%"
    },

    add: {
        marginLeft: 2,
        color: '#581845',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'red'
    },
    view: {
        height: SIZES.headerHeight,
        borderBottomWidth: 2
    },

    text: {
        // padding: 10,
        margin: 5,
        fontSize: 18
    },


    component: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 40,
        margin: 5
    },
    selectedComponent: {
        backgroundColor: 'black',
    },
    componentText: {
        color: 'black',
        fontSize: 16
    },
    componentTextActive: {
        color: 'white',
        fontSize: 16
    },
})