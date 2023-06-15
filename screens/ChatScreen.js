import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, orderBy, query, onSnapshot, where, limit} from 'firebase/firestore'
import { auth, database, sayHello } from '../firebase'

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const userId = auth.currentUser.uid
        const conversationsRef = collection(database, 'conversations')

        // Create a query to retrieve conversations where the user is a member
        const conversationsQuery = query(
            conversationsRef,
            where(`members.${userId}`, '==', true),
            orderBy('lastActive', 'desc'),
            limit(10)
        );

        // Set an onSnapshot listener for the conversations query
        const unsubscribe = onSnapshot(conversationsQuery, (querySnapshot) => {
            querySnapshot.forEach((conversationDoc) => {
                console.log(conversationDoc.data())

                // const messageRef = collection(database, 'messages')
                // const messageQuery = query(
                //     messageRef,
                //     where(`conversation`, '==', conversationId),
                //     orderBy('lastActive', 'desc'),
                //     limit(20)
                // );
                // const messageSnap = await getDocs(messageQuery)

            });
        });
        return unsubscribe
        // const collectionRef = collection(database, 'chats')
        // const q = query(collectionRef, orderBy('createdAt', 'desc'))
        // const unsubscribe = onSnapshot(q, snapshot => {
        //     console.log('snapshot')
        //     setMessages(
        //         snapshot.docs.map(doc => ({
        //             _id: doc.id,
        //             createdAt: doc.data().createdAt.toDate(),
        //             text: doc.data().text,
        //             user: doc.data().user
        //         }))
        //     )
        // })
        // return unsubscribe
    }, [])

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
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: "https://i.pravatar.cc/300"
            }}
        />
    )
}

export default ChatScreen