import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import ChatRow from './ChatRow'
import { getConversations } from '../services/ConversationQueries'
import useAuth from '../hooks/useAuth'
import Footer from './Footer'
import { collection, query, orderBy, where, onSnapshot, limit } from 'firebase/firestore'
import { database } from '../firebase'
import getUserData from '../hooks/userData'
import StyleText from './StyleText'

const ConversationList = ({ setActivePartner, setActiveConversation, activeConversation }) => {
    const { user } = useAuth()
    const { conversations, setConversations } = getUserData()
    // const [conversations, setConversations] = useState([]);

    const onChatRowPressed = async (conversationDetails) => {
        setActiveConversation(conversationDetails)
    }

    return (
        <>
            {conversations.length > 0 ?
                <FlatList
                    data={conversations}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <ChatRow
                            onChatRowPressed={onChatRowPressed}
                            setActiveConversation={setActiveConversation}
                            conversationDetails={item}
                            setActivePartner={setActivePartner}
                        />}
                /> : <View>
                    <StyleText
                        text="No active conversations"
                        fontSize={30}
                    />
                </View>
            }
            <Footer />
        </>
    )
}

export default ConversationList