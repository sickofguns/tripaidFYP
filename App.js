import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//landingpage
import LandingPageScreen from './zLanding Page/LandingPage';
import LoginPageScreen from './zLanding Page/LoginPage';
import SignupPageScreen from './zUnregistered User/SignupPage';
//forget pw
import ForgetPasswordScreen from './zLanding Page/ForgetPasswordPage';
import OTPScreen from './zLanding Page/OTPPage';
import ChangePasswordScreen from './zLanding Page/ChangePasswordPage';
import PasswordSuccessScreen from './zLanding Page/PasswordSuccessPage';
//users
import SystemAdminScreen from './zSystem Admin/SystemAdminPage';
import BusinessOwnerScreen from './zBusiness Owner/BusinessOwnerPage';
import LOLScreen from './zLOL/LOLPage';
import NormalUserScreen from './zNormal User/NormalUserPage';
//unregistered user 
import DOBScreen from './zUnregistered User/DOBPage';
import AccountTypeScreen from './zUnregistered User/AccountTypePage';
//SA page
import BusinessCategoryScreen from './zSystem Admin/SABusinessCategory';
import SearchPersonalScreen from './zSystem Admin/SearchPersonalAccount';
import SearchBusinessScreen from './zSystem Admin/SearchBusinessAccount';
import SearchLOLScreen from './zSystem Admin/SearchLOLAccount';
//BO page
import BusinessTypeScreen from './zUnregistered User/BusinessTypePage';
import BOMoreScreen from './zBusiness Owner/BusinessOwnerMore';
//NU/LOL interest page
import InterestScreen from './zUnregistered User/UserInterestPage';
import NUMoreScreen from './zNormal User/NormalUserMore';
import LOLMoreScreen from './zLOL/LOLMore';
//general
import CUScreen from './ContactUsPage';

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
        <Stack.Screen name="Business Owner More" component={BOMoreScreen} />

        <Stack.Screen name="LOL" component={LOLScreen} />
        <Stack.Screen name="LOL More" component={LOLMoreScreen} />

        <Stack.Screen name="Normal User" component={NormalUserScreen} />
        <Stack.Screen name="Normal User More" component={NUMoreScreen} />

        <Stack.Screen name="Registration" component={DOBScreen} />
        <Stack.Screen name="Account Type" component={AccountTypeScreen} />
        <Stack.Screen name="Business Type" component={BusinessTypeScreen} />
        <Stack.Screen name="Interest" component={InterestScreen} />

        <Stack.Screen name="Contact Us" component={CUScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
