import { View, Text, FlatList } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { collection, addDoc, orderBy, query, onSnapshot, where, limit } from 'firebase/firestore'
import { auth, database, sayHello } from '../firebase'
import ChatRow from './ChatRow'

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);

    useLayoutEffect(() => {
        const userId = auth.currentUser.uid
        const conversationsRef = collection(database, 'conversations')
        const conversationsQuery = query(
            conversationsRef,
            where(`members`, 'array-contains', userId),
            orderBy('lastActive', 'desc'),
            limit(10)
        );
        const unsubscribe = onSnapshot(conversationsQuery,
            (querySnapshot) =>

                setConversations(querySnapshot.docs.map(doc => ({
                    id: doc._id,
                    ...doc.data()
                })))


        );
        return unsubscribe
    }, [])

    return (
        conversations.length > 0 ? (
            <FlatList
                data={conversations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ChatRow conversationDetails={item} />}
            />
        ) : (
            <View>
                <Text>You have no conversations at the moment</Text>
            </View>
        )
    )
}

export default ConversationList