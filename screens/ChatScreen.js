import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { addDoc, collection, onSnapshot, query, doc } from 'firebase/firestore'
import { database } from '../firebase'
import useAuth from '../hooks/useAuth'
import { getMessages } from '../services/ConversationQueries'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES, TEXT_STYLES } from '../style'
import { Menu, Portal, Modal, Button } from 'react-native-paper'
import { deleteConversation } from '../services/ConversationQueries'

const ChatScreen = ({ setActivePartner, activeConversation, activePartner }) => {
    const { user } = useAuth()
    const [messages, setMessages] = useState([])
    const [enableLoadEarlier, setEnableLoadEarlier] = useState([])
    const [menuVisible, setMenuVisible] = useState(false)
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const openMenu = () => setMenuVisible(true);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const closeMenu = () => setMenuVisible(false);
    useEffect(() => {
        const initializeMessages = async () => {
            let latest = await getMessages(activeConversation.id, user.uid)
            if (latest.length > 10) {
                setEnableLoadEarlier(true)
            }
            setMessages(latest)
        }
        initializeMessages()
    }, [])

    useLayoutEffect(() => {
        const messagesRef = collection(database, 'conversations', activeConversation.id, 'messages')
        const q = query(messagesRef)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // Handle new messages
                    const messageData = change.doc.data();
                    console.log("New message:", messageData);
                    console.log(change.doc.id)
                    let newMessage = {
                        _id: change.doc.id,
                        text: messageData.text,
                        createdAt: messageData.createdAt.toDate(),
                        user: {
                            _id: messageData.author == user.uid ? 1 : 2
                        }
                    }
                    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
                }
            });
        });
        return unsubscribe;
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const { text } = messages[0]
        await addDoc(collection(database, 'conversations', activeConversation.id, 'messages'), {
            conversationId: activeConversation.id,
            text,
            author: user.uid,
            createdAt: new Date()
        })

    }, [])
    const unMatch = async () => {
        await deleteConversation(activeConversation.id)
        console.log("UNMATCHEd")
        setActivePartner(null)
    }
    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Button onPress={unMatch}>Confirm Unmatch?</Button>
                </Modal>
            </Portal>
            <View style={styles.chatBar}>
                <View style={styles.partnerDisplay}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }} onPress={() => {
                        setActivePartner(null)
                    }}>
                        <Ionicons name="arrow-back-outline" size={32} />
                        <Image style={styles.profilePicture} source={{ uri: activePartner.profilePicture }} />
                    </TouchableOpacity>
                    <Text style={styles.displayName}>{activePartner.displayName}</Text>
                </View>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<TouchableOpacity style={styles.menuIcon} onPress={openMenu}>
                        <Ionicons name="menu-outline" size={32} />
                    </TouchableOpacity>}>
                    <Menu.Item onPress={() => { }} title="View Profile" />
                    <Menu.Item onPress={() => { }} title="Mute Notifications" />
                    <Menu.Item onPress={() => {
                        setMenuVisible(false)
                        showModal()
                    }} title="Unmatch" />
                    <Menu.Item onPress={() => { }} title="Block" />
                    <Menu.Item onPress={() => { }} title="Report" />
                </Menu>
            </View>

            <GiftedChat
                loadEarlier={enableLoadEarlier}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </SafeAreaView>
    )
}
export default ChatScreen

const styles = StyleSheet.create({
    partnerDisplay: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatBar: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profilePicture: {
        width: SIZES.profilePicture,
        height: SIZES.profilePicture,
        borderRadius: SIZES.profilePicture / 2,
        marginRight: 10
    },
    menuIcon: {
        marginRight: 15
    },
    displayName: {
        ...TEXT_STYLES.displayName
    }
})