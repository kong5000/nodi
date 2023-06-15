import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { SIZES, COLORS } from '../style'
import moment from 'moment';

const ChatRow = ({ conversationDetails }) => {
    const [partnerInfo, setPartnerInfo] = useState(null)
    const [date, setDate] = useState("")

    const formatDate = (date) => {
        const now = moment();
        const sentDate = moment(date);

        function isYesterday(date) {
            const yesterday = moment().subtract(1, 'day').startOf('day');
            const providedDate = moment(date).startOf('day');
            return providedDate.isSame(yesterday, 'day');
        }

        if (now.isSame(sentDate, 'day')) {
            return sentDate.format('h:mm A');
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return sentDate.format('YYYY-MM-DD');
        }
    }
    useEffect(() => {
        for (member in conversationDetails.memberInfo) {
            if (member != auth.currentUser.uid) {
                setPartnerInfo(conversationDetails.memberInfo[member])
            }
        }
        setDate(formatDate(conversationDetails.lastActive.toDate()))
        console.log(conversationDetails)
    }, [conversationDetails])

    return (
        <TouchableOpacity style={styles.chatRow} key={conversationDetails.id}>
            {partnerInfo && <Image
                style={styles.profilePicture}
                source={{ uri: partnerInfo.profileUrl }} />}
            <View>
                <Text style={styles.displayName}>{partnerInfo?.displayName}</Text>
                <Text>{conversationDetails.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{date}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    timestamp: {
        fontWeight: "400",
        position: "absolute",
        top: 0,
        right: 0,
        margin: 15
    },
    displayName: {
        fontWeight: "bold",
        fontSize: 17
    },
    chatRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.chatBackground,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 10,
        borderRadius: 10
    },
    profilePicture: {
        width: SIZES.profilePicture,
        height: SIZES.profilePicture,
        borderRadius: SIZES.profilePicture / 2,
        marginRight: 10
    },
});
export default ChatRow