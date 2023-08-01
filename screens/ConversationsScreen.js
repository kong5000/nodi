import React, { useState } from 'react'
import ConversationList from '../components/ConversationList';
import ChatScreen from './ChatScreen'
import Footer from '../components/Footer';
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { COLORS } from '../style';
const ConversationScreen = () => {
    const [activePartner, setActivePartner] = useState(null)
    const [activeConversation, setActiveConversation] = useState(null)
    return (
        <SafeAreaView style={styles.conversationScreen}>
            {!activePartner && <ConversationList setActivePartner={setActivePartner} setActiveConversation={setActiveConversation} />}
            {activePartner && <ChatScreen
                activeConversation={activeConversation}
                activePartner={activePartner}
                setActivePartner={setActivePartner} />}
        </SafeAreaView>
    )
}

export default ConversationScreen

const styles = StyleSheet.create({
    conversationScreen: {
        flex: 1
    }
})