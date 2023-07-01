import React, { useState } from 'react'
import ConversationList from '../components/ConversationList';
import ChatScreen
    from './ChatScreen'
import Footer from '../components/Footer';
const ConversationScreen = () => {
    const [activePartner, setActivePartner] = useState(null)
    const [activeConversation, setActiveConversation] = useState(null)
    return (
        <>
            {!activePartner && <ConversationList setActivePartner={setActivePartner} setActiveConversation={setActiveConversation} />}
            {activePartner && <ChatScreen
                activeConversation={activeConversation}
                activePartner={activePartner}
                setActivePartner={setActivePartner} />}
        </>
    )
}

export default ConversationScreen