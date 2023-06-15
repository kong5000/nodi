import { View, Text, Image,StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'

const ChatRow = ({ conversationDetails }) => {
    const [partnerInfo, setPartnerInfo] = useState(null)
    useEffect(() => {
        for (member in conversationDetails.memberInfo){
            if (member != auth.currentUser.uid){
                setPartnerInfo(conversationDetails.memberInfo[member])
            }
        }
    }, [conversationDetails])

    return (
        <View key={conversationDetails.id}>
            {partnerInfo && <Image 
            style={styles.tinyLogo}
            source={{uri: partnerInfo.profileUrl}} />}
            <Text>{conversationDetails.lastMessage}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
  });
export default ChatRow