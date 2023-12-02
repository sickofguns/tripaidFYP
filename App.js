import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Import your HomeScreen component
import SignUpScreen from './SignUpScreen'; // Your sign-up screen
import LogInScreen from './LogInScreen';
import QnAScreen from './QnAScreen';
//to the different pages based on each users
import SystemAdminScreen from './SystemAdminScreen'; // Import the SystemAdminScreen
import BusinessOwnerScreen from './BusinessOwnerScreen'; // Import the BusinessOwnerScreen
import LOLScreen from './LOLScreen'; // Import the LOLScreen
import NormalUserScreen from './NormalUserScreen'; // Import the NormalUserScreen
//system admin portion 
import InsightScreen from './InsightScreen'; // Create InsightScreen component
import BusinessCategoryScreen from './BusinessCategoryScreen'; // Create BusinessCategoryScreen component
import SearchUserScreen from './SearchUserScreen'; // Create SearchUserScreen component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={SignUpScreen} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="Q&A" component={QnAScreen} />
        <Stack.Screen name="System Admin" component={SystemAdminScreen} />
        <Stack.Screen name="Business Owner" component={BusinessOwnerScreen} />
        <Stack.Screen name="LOL" component={LOLScreen} />
        <Stack.Screen name="Normal User" component={NormalUserScreen} />
        <Stack.Screen name="Insight" component={InsightScreen} />
        <Stack.Screen name="Business Category" component={BusinessCategoryScreen} />
        <Stack.Screen name="Search User" component={SearchUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
