import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//landingpage
import LandingPageScreen from './LandingPage';
import LoginPageScreen from './LoginPage';
import SignupPageScreen from './SignupPage';
//forget pw
import ForgetPasswordScreen from './ForgetPasswordPage';
import OTPScreen from './OTPPage';
import ChangePasswordScreen from './ChangePasswordPage';
import PasswordSuccessScreen from './PasswordSuccessPage';
//users
import SystemAdminScreen from './SystemAdminPage';
import BusinessOwnerScreen from './BusinessOwnerPage';
import LOLScreen from './LOLPage';
import NormalUserScreen from './NormalUserPage';
//unregistered user 
import DOBScreen from './DOBPage';
import AccountTypeScreen from './AccountTypePage';
//SA page
import BusinessCategoryScreen from './BusinessCategory';
import SearchPersonalScreen from './SearchPersonalAccount';
import SearchBusinessScreen from './SearchBusinessAccount';
import SearchLOLScreen from './SearchLOLAccount';
//BO page
import BusinessTypeScreen from './BusinessTypePage';
//NU/LOL interest page
import InterestScreen from './UserInterestPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing Page">
        <Stack.Screen name="Landing Page" component={LandingPageScreen} />
        <Stack.Screen name="Log In" component={LoginPageScreen} />
        <Stack.Screen name="Sign Up" component={SignupPageScreen} />

        <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Password Successfully Changed" component={PasswordSuccessScreen} />

        <Stack.Screen name="System Admin" component={SystemAdminScreen} />
        <Stack.Screen name="Business Category" component={BusinessCategoryScreen} />        
        <Stack.Screen name="Personal Accounts" component={SearchPersonalScreen} />        
        <Stack.Screen name="Business Accounts" component={SearchBusinessScreen} />        
        <Stack.Screen name="LOL Accounts" component={SearchLOLScreen} />        

        <Stack.Screen name="Business Owner" component={BusinessOwnerScreen} />

        <Stack.Screen name="LOL" component={LOLScreen} />

        <Stack.Screen name="Normal User" component={NormalUserScreen} />

        <Stack.Screen name="Registration" component={DOBScreen} />
        <Stack.Screen name="Account Type" component={AccountTypeScreen} />
        <Stack.Screen name="Business Type" component={BusinessTypeScreen} />
        <Stack.Screen name="Interest" component={InterestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
