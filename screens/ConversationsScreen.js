import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, orderBy, query, onSnapshot, where, limit } from 'firebase/firestore'
import { auth, database, sayHello } from '../firebase'
import ConversationList from '../components/ConversationList';

const ConversationScreen = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback(async (messages = []) => {
        try {

            let result = await sayHello({ user: auth.currentUser })
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }


        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0]
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return (
        <View>
            <ConversationList />
        </View>
    )
}

export default ConversationScreen