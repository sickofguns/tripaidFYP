import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//homepage
import HomeScreen from './HomePage/HomeScreen'; // Import your HomeScreen component
import SignUpScreen from './HomePage/SignUpScreen'; // Your sign-up screen
import LogInScreen from './HomePage/LogInScreen';
import QnAScreen from './HomePage/QnAScreen';
//to the different pages based on each users
import SystemAdminScreen from './SystemAdmin/SystemAdminScreen'; // Import the SystemAdminScreen
import BusinessOwnerScreen from './BusinessOwner/BusinessOwnerScreen'; // Import the BusinessOwnerScreen
import LOLScreen from './LOL/LOLScreen'; // Import the LOLScreen
import NormalUserScreen from './NormalUser/NormalUserScreen'; // Import the NormalUserScreen
//unregistered user
import RegistrationScreen from './UnregisteredUser/RegistrationScreen';
//system admin 
import InsightScreen from './SystemAdmin/InsightScreen'; // Create InsightScreen component
import BusinessCategoryScreen from './SystemAdmin/BusinessCategoryScreen'; // Create BusinessCategoryScreen component
import SearchUserScreen from './SystemAdmin/SearchUserScreen'; // Create SearchUserScreen component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="Q&A" component={QnAScreen} />
        <Stack.Screen name="System Admin" component={SystemAdminScreen} />
        <Stack.Screen name="Business Owner" component={BusinessOwnerScreen} />
        <Stack.Screen name="LOL" component={LOLScreen} />
        <Stack.Screen name="Normal User" component={NormalUserScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Insight" component={InsightScreen} />
        <Stack.Screen name="Business Category" component={BusinessCategoryScreen} />
        <Stack.Screen name="Search User" component={SearchUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
