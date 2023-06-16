import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { UserDataProvider } from './hooks/userData';
import StackNavigator from './StackNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserDataProvider>
          <StackNavigator />
        </UserDataProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
