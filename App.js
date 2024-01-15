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
import NUSearchUserScreen from './NormalUser/NUSearchPage';
import NUItineraryScreen from './NormalUser/NUItinerary';
import NUCreateItineraryScreen from './NormalUser/NUCreateItinerary';
import UpgradetoLOLScreen from './NormalUser/UpgradetoLOLScreen';
import ApplicationReceivedScreen from './NormalUser/ApplicationReceived';
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
import LOLInboxMessageScreen from './LOL/LOLMessageInboxPage';
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
//poi
import POIScreen from './POI/POIPage';
import FoodScreen from './POI/FoodPage';
import AttractionsScreen from './POI/AttractionsPage';
import TrailsScreen from './POI/TrailsPage';
import LifestyleScreen from './POI/LifestylePage';
import FashionScreen from './POI/FashionPage';

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
        <Stack.Screen name="Normal User Search User" component={NUSearchUserScreen} />
        <Stack.Screen name="Normal User Itinerary" component={NUItineraryScreen} />
        <Stack.Screen name="Normal User Create Itinerary" component={NUCreateItineraryScreen} />
        <Stack.Screen name="Upgrade to LOL" component={UpgradetoLOLScreen} />
        <Stack.Screen name="Application Received" component={ApplicationReceivedScreen} />

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
        <Stack.Screen name="LOL Inbox" component={LOLInboxMessageScreen} />
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

        <Stack.Screen name="POI" component={POIScreen} />
        <Stack.Screen name="POI - Food" component={FoodScreen} />
        <Stack.Screen name="POI - Attractions" component={AttractionsScreen} />
        <Stack.Screen name="POI - Trails" component={TrailsScreen} />
        <Stack.Screen name="POI - Lifestyle" component={LifestyleScreen} />
        <Stack.Screen name="POI - Fashion" component={FashionScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
