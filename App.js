import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { UserDataProvider } from './hooks/userData';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';
import Footer from './components/Footer';
// eas build -p android --profile preview

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <UserDataProvider>
            <StackNavigator />
            <Footer />
          </UserDataProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
