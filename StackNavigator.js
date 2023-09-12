import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationScreen from './screens/ConversationsScreen';
import useAuth from './hooks/useAuth';
import SettingsScreen from './screens/SettingsScreen';
import ChatScreen from './screens/ChatScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth()
    
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Conversations" component={ConversationScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </Stack.Group>
                </>
            ) : (
                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator