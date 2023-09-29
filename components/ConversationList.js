import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import getUserData from '../hooks/userData'
import ChatRow from './ChatRow'
import StyleText from './StyleText'

const ConversationList = ({ mode }) => {
    const { setActiveChat } = getUserData()

    const navigation = useNavigation()
    const { conversations, requests } = getUserData()

    const onChatRowPressed = async (conversationDetails) => {
        setActiveChat(conversationDetails)
        navigation.navigate('Chat')
    }
    let items = conversations
    if (mode == "requests") {
        items = requests
    }

    useEffect(() => {
        if(mode == "requests"){
            console.log("GET YOUR REQUESTS")
            console.log(items)

        }
    },[items])
    return (
        <>
            {items.length > 0 ?
                <FlatList
                    style={{ width: "85%", height: "100%" }}
                    data={items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <ChatRow
                            onChatRowPressed={onChatRowPressed}
                            conversationDetails={item}
                        />}
                /> : <View>
                    <StyleText
                        text="No active conversations"
                        fontSize={30}
                    />
                </View>
            }
        </>
    )
}

export default ConversationList