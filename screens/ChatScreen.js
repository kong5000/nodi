import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native'
import { where, limit, orderBy, collection, onSnapshot, query } from 'firebase/firestore'
import { database } from '../firebase'
import useAuth from '../hooks/useAuth'
import { getMessages } from '../services/ConversationQueries'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES, TEXT_STYLES } from '../style'
import { Menu, Portal, Modal, Button } from 'react-native-paper'
import { deleteConversation } from '../services/ConversationQueries'
import { addChatMessage } from '../services/ConversationQueries'
import { storage } from '../firebase'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRoute } from '@react-navigation/core';
import StyleText from '../components/StyleText'
import getUserData from '../hooks/userData'
import Footer from '../components/Footer'
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/core'

const ChatScreen = () => {
    const navigation = useNavigation()
    const { activeChat } = getUserData()
    const { user } = useAuth()
    const [partner, setPartner] = useState(null)
    const [messages, setMessages] = useState([])
    const [enableLoadEarlier, setEnableLoadEarlier] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const openMenu = () => setMenuVisible(true);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const closeMenu = () => setMenuVisible(false);
    useEffect(() => {
        const initializeMessages = async () => {
            // let latest = await getMessages(activeChat.id, user.uid)
            let latest = await getMessages(activeChat.id, user.uid)
            if (latest.length >= 15) {
                setEnableLoadEarlier(true)
            }
            setMessages(latest)
        }
        initializeMessages()
    }, [])

    useEffect(() => {
        if (activeChat && user) {
            activeChat.members.forEach(memberId => {
                if (memberId !== user.uid) {
                    setPartner(activeChat.memberInfo[memberId])
                    console.log("Partner Below")
                    console.log(activeChat.memberInfo[memberId])
                }
            })
        }
    }, [activeChat, user])

    useLayoutEffect(() => {
        const messagesRef = collection(database, 'conversations', activeChat.id, 'messages')
        // Only subcribe to chat messages that were made after opening the chat
        const q = query(messagesRef, where("createdAt", ">", new Date()),
            orderBy('createdAt', 'desc'),
            limit(1))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // Handle new messages
                    const messageData = change.doc.data();
                    let newMessage = {
                        _id: change.doc.id,
                        text: messageData.text,
                        createdAt: messageData.createdAt.toDate(),
                        user: {
                            _id: messageData.author == user.uid ? 1 : 2
                        },
                        image: messageData.image
                    }
                    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
                }
            });
        });
        return unsubscribe;
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const { text } = messages[0]
        await addChatMessage(text, null, activeChat.id, user.uid)
    }, [])

    const unMatch = async () => {
        await deleteConversation(activeChat.id)
    }

    const pickImage = async (index) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                const uid = user.uid;
                var date = new Date();

                var unixTimestamp = Math.floor(date.getTime() / 1000);
                const filename = `chat_pic${"_" + uid + "_" + unixTimestamp}`;
                const response = await fetch(result.uri);

                const blob = await response.blob();
                const storageRef = ref(storage, filename);

                await uploadBytes(storageRef, blob);

                const downloadURL = await getDownloadURL(storageRef);
                await addChatMessage('', downloadURL, activeChat.id, user.uid)

                return downloadURL
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    return (

        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={pickImage}>
                <Text>UPLOAD IMAGE</Text>
            </TouchableOpacity>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Button onPress={unMatch}>Confirm Unmatch?</Button>
                </Modal>
            </Portal>
            <View style={styles.chatBar}>
                {
                    partner && <View style={styles.partnerDisplay}>
                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Ionicons name="arrow-back-outline" size={32} />
                            <Image style={styles.profilePicture} source={{ uri: partner.profilePicture }} />
                        </TouchableOpacity>
                        <Text style={styles.displayName}>{partner.displayName}</Text>
                    </View>
                }
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
            <View style={{ marginVertical: 20 }}></View>
            <Footer />
        </SafeAreaView>
    )
}
export default ChatScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    },
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