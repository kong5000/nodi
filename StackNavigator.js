import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import UploadScreen from './screens/UploadScreen';
import ConversationScreen from './screens/ConversationsScreen';
import useAuth from './hooks/useAuth';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
        {/* <Stack.Navigator screenOptions={{
            headerShown: false
        }}> */}
                            <Stack.Screen name="Home" component={HomeScreen} />

            {user ? (
                <>
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="Upload" component={UploadScreen} />
                    <Stack.Screen name="Conversations" component={ConversationScreen} />
                </>
            ) : (
                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator