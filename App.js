import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import getUserData, { UserDataProvider } from './hooks/userData';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';
import Footer from './components/Footer';
// eas build -p android --profile preview

export default function App() {
  const { userData } = getUserData()
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <UserDataProvider>
            <KeyboardAvoidingView
              // keyboardVerticalOffset = {00}

              style={{ flex: 1 }} behavior="padding"
            >
              <StackNavigator />
            </KeyboardAvoidingView>
            <Footer/>
          </UserDataProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
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
