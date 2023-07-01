import { View, Text, FlatList } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { collection, orderBy, query, onSnapshot, where, limit } from 'firebase/firestore'
import { auth, database } from '../firebase'
import ChatRow from './ChatRow'
import { getConversations } from '../services/ConversationQueries'
import useAuth from '../hooks/useAuth'
import Footer from './Footer'
const ConversationList = ({ setActivePartner, setActiveConversation, activeConversation }) => {
    const { user } = useAuth()
    const [conversations, setConversations] = useState([]);

    useLayoutEffect(() => {
        const loadConversations = async () => {
            let convos = await getConversations(user.uid)
            setConversations(convos)
        }
        loadConversations()
    }, [])
    const onChatRowPressed = async (conversationDetails) => {
        setActiveConversation(conversationDetails)
    }

    return (
        <>
            {conversations.length > 0 ?
                <FlatList
                    data={conversations}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ChatRow onChatRowPressed={onChatRowPressed} setActiveConversation={setActiveConversation} conversationDetails={item} setActivePartner={setActivePartner} />}
                /> : <View>
                    <Text>You have no conversations at the moment</Text>
                </View>
            }
            <Footer />
        </>
    )
}

export default ConversationList