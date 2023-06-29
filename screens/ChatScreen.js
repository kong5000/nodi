import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { database } from '../firebase'
import useAuth from '../hooks/useAuth'
import { getMessages } from '../services/ConversationQueries'

const ChatScreen = ({ setActivePartner, activeConversation }) => {
    const { user } = useAuth()
    const [messages, setMessages] = useState([])

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
            {
                _id: 2,
                text: 'Hello developer 2',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
        const initializeMessages = async () => {
            let latest = await getMessages(activeConversation.id, user.uid)
            setMessages(latest)
        }
        initializeMessages()
    }, [])

    useLayoutEffect(() => {
        const messagesRef = collection(database, 'conversations', activeConversation.id, 'messages')
        const q = query(messagesRef)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // Handle new messages
                    const messageData = change.doc.data();
                    console.log("New message:", messageData);
                }
            });
        });
        return unsubscribe;

    }, [])

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { text } = messages[0]
        await addDoc(collection(database, 'conversations', activeConversation.id, 'messages'), {
            conversationId: activeConversation.id,
            text,
            author: user.uid,
            createdAt: new Date()
        })

    }, [])

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            <TouchableOpacity onPress={() => setActivePartner(null)}><Text>Hello</Text>
            </TouchableOpacity>
            <Text>Hello</Text>
        </>
    )
}
export default ChatScreen