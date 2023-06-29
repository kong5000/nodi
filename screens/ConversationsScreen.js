import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, orderBy, query, onSnapshot, where, limit } from 'firebase/firestore'
import { auth, database, sayHello } from '../firebase'
import ConversationList from '../components/ConversationList';
import ChatScreen
    from './ChatScreen'
const ConversationScreen = () => {
    const [activePartner, setActivePartner] = useState(null)

    return (
        <View>
            {!activePartner && <ConversationList setActivePartner={setActivePartner} />}
            {activePartner && <ChatScreen activePartner={activePartner} setActivePartner={setActivePartner}/>}
        </View>
    )
}

export default ConversationScreen