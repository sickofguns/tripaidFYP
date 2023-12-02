import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Import your HomeScreen component
import SignUpScreen from './SignUpScreen'; // Your sign-up screen
import LogInScreen from './LogInScreen';
import QnAScreen from './QnAScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={SignUpScreen} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="Q&A" component={QnAScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
