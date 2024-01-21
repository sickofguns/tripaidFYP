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
import LOLUserProfilePage from './SystemAdmin/LOLUserProfilePage';
import NUUserProfilePage from './SystemAdmin/NUUserProfilePage';
import BOUserProfilePage from './SystemAdmin/BOUserProfilePage';
import UserSpecificPostScreen from './SystemAdmin/UserViewPost';
import UserSpecificReviewScreen from './SystemAdmin/UserViewReview';
import UserSpecificTrailScreen from './SystemAdmin/UserViewTrail';
//normal user
import NUMoreScreen from './NormalUser/NormalUserMore';
import NormalUserScreen from './NormalUser/NormalUserPage';
import NUProfilePage from './NormalUser/NUProfilePage';
import NUSearchUserScreen from './NormalUser/NUSearchPage';
import NUItineraryScreen from './NormalUser/NUItinerary';
import NUCreateItineraryScreen from './NormalUser/NUCreateItinerary';
import NUEditItineraryScreen from './NormalUser/NUEditItinerary';
import NUSpecificItineraryScreen from './NormalUser/NUViewItinerary';
import UpgradetoLOLScreen from './NormalUser/UpgradetoLOLScreen';
import ApplicationReceivedScreen from './NormalUser/ApplicationReceived';
import NUBookingHistoryScreen from './NormalUser/NUBookingHistoryPage';
import NUMainBookingScreen from './NormalUser/NUBookingMainPage';
import NUBookingPaymentScreen from './NormalUser/NUBookingPaymentPage';
import NUAccomodationBookingScreen from './NormalUser/NUBookingAccomodation';
import NUAttractionBookingScreen from './NormalUser/NUBookingAttraction';
import NUFnBBookingScreen from './NormalUser/NUBookingFnB';
import NUBookingConfirmationScreen from './NormalUser/NUBookingConfirmation';
import NUSpecificBookingScreen from './NormalUser/NUViewBooking';
import NUSpecificHistoryBookingScreen from './NormalUser/NUViewHistoryBooking';
import NUCreateMainScreen from './NormalUser/NUCreatePage';
import NUNewPostScreen from './NormalUser/NUCreatePost';
import NUCreateReviewScreen from './NormalUser/NUCreateReview';
import NUSpecificPostScreen from './NormalUser/NUViewPost';
import NUSpecificReviewScreen from './NormalUser/NUViewReview';
import NUEditReviewScreen from './NormalUser/NUEditReview';
//lol
import LOLMoreScreen from './LOL/LOLMore';
import LOLScreen from './LOL/LOLPage';
import LOLProfilePage from './LOL/LOLProfilePage';
import LOLSearchUserScreen from './LOL/LOLSearchPage';
import LOLItineraryScreen from './LOL/LOLItinerary';
import LOLCreateItineraryScreen from './LOL/LOLCreateItinerary';
import LOLAffilateBOScreen from './LOL/BOAffilatedRequest';
import BORequestsScreen from './LOL/BOAffilatedAcceptance';
import LOLSpecificItineraryScreen from './LOL/LOLViewItinerary';
import LOLEditItineraryScreen from './LOL/LOLEditItinerary';
import LOLBookingHistoryScreen from './LOL/LOLBookingHistoryPage';
import LOLMainBookingScreen from './LOL/LOLBookingMainPage';
import LOLAccomodationBookingScreen from './LOL/LOLBookingAccomodation';
import LOLFnBBookingScreen from './LOL/LOLBookingFnB';
import LOLAttractionBookingScreen from './LOL/LOLBookingAttraction';
import LOLBookingPaymentScreen from './LOL/LOLBookingPaymentPage';
import LOLBookingConfirmationScreen from './LOL/LOLBookingConfirmation';
import LOLSpecificBookingScreen from './LOL/LOLViewBooking';
import LOLSpecificHistoryBookingScreen from './LOL/LOLViewHistoryBooking';
import LOLInsightsScreen from './LOL/LOLInsightsPage';
import LOLCreateMainScreen from './LOL/LOLCreatePage';
import LOLNewPostScreen from './LOL/LOLCreatePost';
import LOLSpecificPostScreen from './LOL/LOLViewPost';
import LOLCreateTrailScreen from './LOL/LOLCreateTrails';
import LOLCreateReviewScreen from './LOL/LOLCreateReview';
import LOLSpecificReviewScreen from './LOL/LOLViewReview';
import LOLEditReviewScreen from './LOL/LOLEditReview';
import LOLSpecificTrailScreen from './LOL/LOLViewTrail';
import LOLEditTrailScreen from './LOL/LOLEditTrail';
//business owner
import BOScreen from './BusinessOwner/BusinessOwnerPage';
import BOMoreScreen from './BusinessOwner/BusinessOwnerPageMore';
import BOBookingScreen from './BusinessOwner/CustomerBookingsPage';
//others
import CUScreen from './Others/ContactUsPage';
import PSScreen from './Others/PrivacyandSupport';
import SettingsScreen from './Others/Settings';
//poi
import LOLPOIScreen from './LOL/LOLPOIPage';
import NUPOIScreen from './NormalUser/NUPOIPage';
import FoodScreen from './POI/FoodPage';
import AttractionsScreen from './POI/AttractionsPage';
import TrailsScreen from './POI/TrailsPage';
import LifestyleScreen from './POI/LifestylePage';
import FashionScreen from './POI/FashionPage';
//search
import ViewBOUserProfilePage from './Search/BOUserProfilePage';
import ViewLOLUserProfilePage from './Search/LOLUserProfilePage';
import ViewNUUserProfilePage from './Search/NUUserProfilePage';

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
        <Stack.Screen name="User Profile - LOL" component={LOLUserProfilePage} />
        <Stack.Screen name="User Profile - Normal User" component={NUUserProfilePage} />
        <Stack.Screen name="User Profile - Business" component={BOUserProfilePage} />
        <Stack.Screen name="User Post" component={UserSpecificPostScreen} />
        <Stack.Screen name="User Review" component={UserSpecificReviewScreen} />
        <Stack.Screen name="User Trail" component={UserSpecificTrailScreen} />

        <Stack.Screen name="Normal User" component={NormalUserScreen} />
        <Stack.Screen name="Normal User More" component={NUMoreScreen} />
        <Stack.Screen name="Normal User Profile" component={NUProfilePage} />
        <Stack.Screen name="Normal User Search User" component={NUSearchUserScreen} />
        <Stack.Screen name="Normal User Itinerary" component={NUItineraryScreen} />
        <Stack.Screen name="Normal User Create Itinerary" component={NUCreateItineraryScreen} />
        <Stack.Screen name="Normal User Edit Itinerary" component={NUEditItineraryScreen} />
        <Stack.Screen name="Normal User View Itinerary" component={NUSpecificItineraryScreen} />
        <Stack.Screen name="Upgrade to LOL" component={UpgradetoLOLScreen} />
        <Stack.Screen name="Application Received" component={ApplicationReceivedScreen} />
        <Stack.Screen name="Normal User Booking History" component={NUBookingHistoryScreen} />
        <Stack.Screen name="Normal User Booking Page" component={NUMainBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Accomodation" component={NUAccomodationBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Food & Beverage" component={NUFnBBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Attraction" component={NUAttractionBookingScreen} />
        <Stack.Screen name="Normal User Booking Payment Page" component={NUBookingPaymentScreen} />
        <Stack.Screen name="Normal User Booking Confirmation Page" component={NUBookingConfirmationScreen} />
        <Stack.Screen name="Normal User View Booking" component={NUSpecificBookingScreen} />
        <Stack.Screen name="Normal User View History Booking" component={NUSpecificHistoryBookingScreen} />
        <Stack.Screen name="Normal User Create" component={NUCreateMainScreen} />
        <Stack.Screen name="Normal User Create Post" component={NUNewPostScreen} />
        <Stack.Screen name="Normal User Create Review" component={NUCreateReviewScreen} />
        <Stack.Screen name="Normal User View Post" component={NUSpecificPostScreen} />
        <Stack.Screen name="Normal User View Review" component={NUSpecificReviewScreen} />
        <Stack.Screen name="Normal User Edit Review" component={NUEditReviewScreen} />

        <Stack.Screen name="LOL" component={LOLScreen} />
        <Stack.Screen name="LOL More" component={LOLMoreScreen} />
        <Stack.Screen name="LOL Profile" component={LOLProfilePage} />
        <Stack.Screen name="LOL Search User" component={LOLSearchUserScreen} />
        <Stack.Screen name="LOL Itinerary" component={LOLItineraryScreen} />
        <Stack.Screen name="LOL Create Itinerary" component={LOLCreateItineraryScreen} />
        <Stack.Screen name="Business Affiliate Page" component={LOLAffilateBOScreen} />
        <Stack.Screen name="Business Affiliate Request Page" component={BORequestsScreen} />
        <Stack.Screen name="LOL View Itinerary" component={LOLSpecificItineraryScreen} />        
        <Stack.Screen name="LOL Edit Itinerary" component={LOLEditItineraryScreen} />
        <Stack.Screen name="LOL Booking History" component={LOLBookingHistoryScreen} />
        <Stack.Screen name="LOL Booking Page" component={LOLMainBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Accomodation" component={LOLAccomodationBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Food & Beverage" component={LOLFnBBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Attraction" component={LOLAttractionBookingScreen} />
        <Stack.Screen name="LOL Booking Payment Page" component={LOLBookingPaymentScreen} />
        <Stack.Screen name="LOL Booking Confirmation Page" component={LOLBookingConfirmationScreen} />
        <Stack.Screen name="LOL View Booking" component={LOLSpecificBookingScreen} />
        <Stack.Screen name="LOL View History Booking" component={LOLSpecificHistoryBookingScreen} />
        <Stack.Screen name="LOL Insights" component={LOLInsightsScreen} />
        <Stack.Screen name="LOL Create" component={LOLCreateMainScreen} />
        <Stack.Screen name="LOL Create Post" component={LOLNewPostScreen} />
        <Stack.Screen name="LOL View Post" component={LOLSpecificPostScreen} />
        <Stack.Screen name="LOL Create Trail" component={LOLCreateTrailScreen} />
        <Stack.Screen name="LOL Create Review" component={LOLCreateReviewScreen} />
        <Stack.Screen name="LOL View Review" component={LOLSpecificReviewScreen} />
        <Stack.Screen name="LOL Edit Review" component={LOLEditReviewScreen} />
        <Stack.Screen name="LOL View Trail" component={LOLSpecificTrailScreen} />
        <Stack.Screen name="LOL Edit Trail" component={LOLEditTrailScreen} />

        <Stack.Screen name="Business Owner" component={BOScreen} />
        <Stack.Screen name="Business Owner More" component={BOMoreScreen} />
        <Stack.Screen name="Customer Bookings" component={BOBookingScreen} />

        <Stack.Screen name="Contact Us" component={CUScreen} />
        <Stack.Screen name="Privacy & Support" component={PSScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="LOL POI" component={LOLPOIScreen} />
        <Stack.Screen name="Normal User POI" component={NUPOIScreen} />
        <Stack.Screen name="POI - Food" component={FoodScreen} />
        <Stack.Screen name="POI - Attractions" component={AttractionsScreen} />
        <Stack.Screen name="POI - Trails" component={TrailsScreen} />
        <Stack.Screen name="POI - Lifestyle" component={LifestyleScreen} />
        <Stack.Screen name="POI - Fashion" component={FashionScreen} />

        <Stack.Screen name="View Business Profile" component={ViewBOUserProfilePage} />
        <Stack.Screen name="View LOL Profile" component={ViewLOLUserProfilePage} />
        <Stack.Screen name="View Normal User Profile" component={ViewNUUserProfilePage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
