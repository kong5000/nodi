import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker'
import { collection, doc, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Bubble, GiftedChat, Time } from 'react-native-gifted-chat'
import { Button, Menu, Modal, Portal } from 'react-native-paper'
import CustomInputToolbar from '../components/CustomInputToolbar'
import StyleText from '../components/StyleText'
import { database, storage } from '../firebase'
import useAuth from '../hooks/useAuth'
import getUserData from '../hooks/userData'
import { acceptConversationRequest, addChatMessage, declineConversationRequest, deleteConversation, getMessages } from '../services/ConversationQueries'
import { BUTTON_STYLE, COLORS, FLEX_CENTERED, SIZES, TEXT_STYLES } from '../style'
const { width, height } = Dimensions.get('window');

const ChatScreen = () => {
    const navigation = useNavigation()
    const { activeChat, setActiveChat } = getUserData()
    const { user } = useAuth()
    const { userData } = getUserData()
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

    const acceptRequest = async () => {
        try {
            await acceptConversationRequest(activeChat.id)
        } catch (err) {
            console.log(err)
        }
    }

    const declineRequest = async () => {
        try {
            await declineConversationRequest(activeChat.id)
        } catch (err) {
            // @todo error handling
        }
    }

    useEffect(() => {
        const initializeMessages = async () => {
            try {
                let latest = await getMessages(activeChat.id, user.uid)
                if (latest.length >= 15) {
                    setEnableLoadEarlier(true)
                }
                setMessages(latest)
            } catch (err) {
                // @todo, handle messsage error
            }

        }
        initializeMessages()
    }, [])

    useEffect(() => {
        if (activeChat && user) {
            activeChat.members.forEach(memberId => {
                if (memberId !== user.uid) {
                    setPartner(activeChat.memberInfo[memberId])
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

    useLayoutEffect(() => {
        const conversationRef = doc(database, 'conversations', activeChat.id);

        const unsubscribe = onSnapshot(conversationRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                // The document exists, and you can access its data
                const data = docSnapshot.data();
                setActiveChat({ ...data, id: activeChat.id })
            } else {
                // @todo handle
                // The document does not exist
                console.log('Document does not exist');
            }
        })

        return unsubscribe;
    }, [])

    const onSend = useCallback(async (messages = []) => {
        if (activeChat.accepted) {
            const { text } = messages[0]
            await addChatMessage(text, null, activeChat.id, user.uid, userData)
        }
    }, [])

    const unMatch = async () => {
        await deleteConversation(activeChat.id)
    }

    return (

        <SafeAreaView style={styles.screen}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Button onPress={unMatch}>Confirm Unmatch?</Button>
                </Modal>
            </Portal>
            <View style={styles.chatBar}>
                {
                    partner && <View style={styles.partnerDisplay}>
                        <TouchableOpacity style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Ionicons name="arrow-back-outline" size={32} style={{
                                marginRight: '5%'
                            }} />
                            <Image style={styles.profilePicture} source={{ uri: partner.profilePicture }} />
                        </TouchableOpacity>
                        <StyleText
                            text={partner.displayName}
                            semiBold
                            fontSize={24}
                        />
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
                inverted={messages.length <= 1 ? false : true}
                loadEarlier={enableLoadEarlier}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 2,
                }}
                renderTime={props => <Time
                    timeTextStyle={{
                        right: { color: COLORS.halfGrey },
                        left: { color: COLORS.halfGrey },
                    }}
                    {...props} />}
                render
                renderInputToolbar={props => <CustomInputToolbar {...props} />}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: { color: 'black' },
                            }}
                            wrapperStyle={{
                                right: { backgroundColor: COLORS.lightBlue, },
                                left: { backgroundColor: COLORS.grey, },
                            }}
                        />
                    )
                }}
            />
            {!activeChat.accepted && <View style={{
                position: 'absolute',
                bottom: SIZES.footerHeight,
                height: "33%",
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <TouchableOpacity
                    onPress={() => acceptRequest()}
                >
                    <View style={{
                        ...BUTTON_STYLE.button,
                        backgroundColor: COLORS.mainTheme,
                        borderWidth: 0,
                        display: 'flex',
                        minWidth: "80%",
                        ...FLEX_CENTERED,
                    }}>
                        <StyleText
                            text="Accept"
                            fontSize={18}
                            semiBold
                            style={{
                                color: 'white'
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={declineRequest}
                >
                    <View style={{
                        ...BUTTON_STYLE.button,
                        minWidth: "80%",
                        ...FLEX_CENTERED,
                        borderColor: 'red'
                    }}>
                        <StyleText
                            text="Decline"
                            semiBold
                            style={{ color: 'red' }}
                            fontSize={18}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            }

            <View style={{ marginVertical: 20 }}></View>
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
        alignItems: 'center',
    },
    chatBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "4%"
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