import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContext = createContext({
    chat: null,
    setChat: () => { }

})
export const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState()

    return (
        <ChatContext.Provider value={{
            chat,
            setChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default function useAuth() {
    return useContext(ChatContext)
}