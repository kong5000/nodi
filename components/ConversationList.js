import { View, Text, FlatList } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import ChatRow from './ChatRow'
import { getConversations } from '../services/ConversationQueries'
import useAuth from '../hooks/useAuth'
import Footer from './Footer'
import { collection, query, orderBy, where , onSnapshot, limit} from 'firebase/firestore'
import { database } from '../firebase'
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

    useLayoutEffect(() => {
        const conversationRef = collection(database, 'conversations')
        const q = query(conversationRef,
            where('members', 'array-contains', user.uid),
            orderBy('lastActive', 'desc'),
            limit(20))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === 'modified') {
                    const conversationData = change.doc.data()
                    setConversations(prev => prev.map(conv => {
                        if(conv.id == change.doc.id){
                            conv.lastMessage = conversationData.lastMessage
                            conv.lastAuthor = conversationData.lastAuthor
                            conv.lastActive = conversationData.lastActive
                        }
                        return conv
                    }))
                }
                if (change.type === 'removed') {
                    setConversations(prev => prev.filter(conv => {
                        if(conv.id == change.doc.id){
                            return false
                        }
                        return true
                    }))
                }
            });
        });
        return unsubscribe;
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