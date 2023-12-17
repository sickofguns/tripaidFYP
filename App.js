import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//landingpage
import LandingPageScreen from './LandingPage/LandingPage';
import LOLLandingPageScreen from './LandingPage/LOLLandingPage';
import BOLandingPageScreen from './LandingPage/BOLandingPage';
//login
import LoginPageScreen from './LandingPage/LoginPage';
import ForgetPasswordScreen from './LandingPage/ForgetPasswordPage';
import ChangePasswordScreen from './LandingPage/ChangePasswordPage';
import OTPScreen from './LandingPage/OTPPage';
import PasswordSuccessScreen from './LandingPage/PasswordSuccessPage';
//unregistereduser //signup
import AccountTypeScreen from './UnregisteredUser/AccountTypePage';
import BusinessTypeScreen from './UnregisteredUser/BusinessTypePage';
import UserRegistrationScreen from './UnregisteredUser/UserRegistration';
import UserSignUpScreen from './UnregisteredUser/UserSignupPage';
import BOSignUpScreen from './UnregisteredUser/BusinessSignupPage';
import BORegistrationScreen from './UnregisteredUser/BusinessRegistration';
import UserInterestScreen from './UnregisteredUser/UserInterestPage';
import RegistrationSuccessScreen from './UnregisteredUser/RegistrationSuccessPage';
import BOCategoryScreen from './UnregisteredUser/BOCategory';
import BOSubCategoryHospitalityScreen from './UnregisteredUser/HospitalityBOSubCat';
import BOSubCategoryFnbScreen from './UnregisteredUser/FnBBOSubCat';
import BOSubCategoryRetailScreen from './UnregisteredUser/RetailBOSubCat';
import BOSubCategorySnRScreen from './UnregisteredUser/SnRBOSubCat';
//system admin
import SABusinessCategoryScreen from './SystemAdmin/SABusinessCategory';
import SearchBusinessScreen from './SystemAdmin/SearchBusinessAccount';
import SearchLOLScreen from './SystemAdmin/SearchLOLAccount';
import SearchPersonalScreen from './SystemAdmin/SearchPersonalAccount';
import SystemAdminScreen from './SystemAdmin/SystemAdminPage';
import SubCategoryHospitalityScreen from './SystemAdmin/HospitalitySubCat';
import SubCategoryFnbScreen from './SystemAdmin/FnBSubCat';
import SubCategoryRetailScreen from './SystemAdmin/RetailSubCat';
import SubCategorySnRScreen from './SystemAdmin/SnRSubCat';
//normal user
import NUMoreScreen from './NormalUser/NormalUserMore';
import NormalUserScreen from './NormalUser/NormalUserPage';
import NUProfilePage from './NormalUser/NUProfilePage';
//lol
import LOLMoreScreen from './LOL/LOLMore';
import LOLScreen from './LOL/LOLPage';
import LOLProfilePage from './LOL/LOLProfilePage';
//business owner
import BOScreen from './BusinessOwner/BusinessOwnerPage';
import BOMoreScreen from './BusinessOwner/BusinessOwnerPageMore';
//others
import CUScreen from './Others/ContactUsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing Page">
        <Stack.Screen name="Landing Page" component={LandingPageScreen} />
        <Stack.Screen name="Landing Page - LOL" component={LOLLandingPageScreen} />
        <Stack.Screen name="Landing Page - Business" component={BOLandingPageScreen} />

        <Stack.Screen name="Log In" component={LoginPageScreen} />
        <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Password Successfully Changed" component={PasswordSuccessScreen} />

        <Stack.Screen name="Account Type" component={AccountTypeScreen} />
        <Stack.Screen name="Business Type" component={BusinessTypeScreen} />
        <Stack.Screen name="User Registration" component={UserRegistrationScreen} />
        <Stack.Screen name="User Sign Up" component={UserSignUpScreen} />
        <Stack.Screen name="Business Sign Up" component={BOSignUpScreen} />
        <Stack.Screen name="Business Registration" component={BORegistrationScreen} />
        <Stack.Screen name="Interest" component={UserInterestScreen} />
        <Stack.Screen name="Account Successfully Registered" component={RegistrationSuccessScreen} />
        <Stack.Screen name="Business Registration Category" component={BOCategoryScreen} />
        <Stack.Screen name="Business Registration SubCategory - Hospitality" component={BOSubCategoryHospitalityScreen} />
        <Stack.Screen name="Business Registration SubCategory - Food & Beverage" component={BOSubCategoryFnbScreen} />
        <Stack.Screen name="Business Registration SubCategory - Sports & Recreation" component={BOSubCategorySnRScreen} />
        <Stack.Screen name="Business Registration SubCategory - Retail" component={BOSubCategoryRetailScreen} />

        <Stack.Screen name="Business Category" component={SABusinessCategoryScreen} />
        <Stack.Screen name="Business Accounts" component={SearchBusinessScreen} />
        <Stack.Screen name="LOL Accounts" component={SearchLOLScreen} />
        <Stack.Screen name="Personal Accounts" component={SearchPersonalScreen} />
        <Stack.Screen name="System Admin" component={SystemAdminScreen} />
        <Stack.Screen name="Hospitality Sub Category" component={SubCategoryHospitalityScreen} />
        <Stack.Screen name="Food & Beverage Sub Category" component={SubCategoryFnbScreen} />
        <Stack.Screen name="Sports & Recreation Sub Category" component={SubCategorySnRScreen} />
        <Stack.Screen name="Retail Sub Category" component={SubCategoryRetailScreen} />

        <Stack.Screen name="Normal User" component={NormalUserScreen} />
        <Stack.Screen name="Normal User More" component={NUMoreScreen} />
        <Stack.Screen name="Normal User Profile" component={NUProfilePage} />

        <Stack.Screen name="LOL" component={LOLScreen} />
        <Stack.Screen name="LOL More" component={LOLMoreScreen} />
        <Stack.Screen name="LOL Profile" component={LOLProfilePage} />


        <Stack.Screen name="Business Owner" component={BOScreen} />
        <Stack.Screen name="Business Owner More" component={BOMoreScreen} />

        <Stack.Screen name="Contact Us" component={CUScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
