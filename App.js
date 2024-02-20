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
import AboutYourselfLOLScreen from './UnregisteredUser/AboutYourselfLOLScreen';
import BOSubCategoryEventsScreen from './UnregisteredUser/EventsBOSubCat';
import BOSubCategoryHnWScreen from './UnregisteredUser/HnWBOSubCat';
import BOSubCategoryToursScreen from './UnregisteredUser/ToursBOSubCat';
import BOSubCategoryTransportScreen from './UnregisteredUser/TransportBOSubCat';
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
import UserSpecificListingScreen from './SystemAdmin/UserViewListing';
import UserSpecificPromoScreen from './SystemAdmin/UserViewPromo';

import SubCategoryHNWScreen from './SystemAdmin/HnWSubCat';
import SubCategoryEventsScreen from './SystemAdmin/eventssubcat';
import SubCategoryToursScreen from './SystemAdmin/tourssubcat';
import SubCategoryTransportScreen from './SystemAdmin/transportsubcat';
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
import NUAccommodationBookingScreen from './NormalUser/NUBookingAccomodation';
import NUAttractionBookingScreen from './NormalUser/NUBookingAttraction';
import NUTransportBookingScreen from './NormalUser/NUBookingTransport';
import NULifestyleBookingScreen from './NormalUser/NUBookingLifestyle';
import NUToursBookingScreen from './NormalUser/NUBookingTours';
import NUEventsBookingScreen from './NormalUser/NUBookingEvents';



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
import LOLAccommodationBookingScreen from './LOL/LOLBookingAccomodation';
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
import LOLLifestyleBookingScreen from './LOL/LOLBookingLifestyle';
import LOLTransportBookingScreen from './LOL/LOLBookingTransport';
import LOLToursBookingScreen from './LOL/LOLBookingTours';
import LOLEventsBookingScreen from './LOL/LOLBookingEvents';


//business owner
import BOMoreScreen from './BusinessOwner/BusinessOwnerPageMore';
import BOListingScreen from './BusinessOwner/BusinessOwnerListing';
import BOScreen from './BusinessOwner/BusinessOwnerPage';
import BOProfilePage from './BusinessOwner/BusinessOwnerProfilePage';
import BOBookingScreen from './BusinessOwner/CustomerBookingsPage';
import BOCreateMainScreen from './BusinessOwner/BOCreatePage';
import BONewListingScreen from './BusinessOwner/BusinessOwnerCreateListing';
import BOEditListingScreen from './BusinessOwner/BusinessOwnerEditListing';
import BOSpecificListingScreen from './BusinessOwner/BusinessOwnerViewListing';
import BOCreatePromotion from './BusinessOwner/BusinessOwnerCreatePromotion';
import BOSpecificPromotionScreen from './BusinessOwner/BusinessOwnerViewPromotion';
import BOPromotionScreen from './BusinessOwner/BusinessOwnerPromotion';
import BOEditPromotionScreen from './BusinessOwner/BusinessOwnerEditPromotion';
import BOSpecificReviewScreen from './BusinessOwner/BusinessOwnerViewReview';
import BOLOLAffiliateScreen from './BusinessOwner/BusinessOwnerLOLAffiliatePage';
import BOLOLAffiliateRequestScreen from './BusinessOwner/BusinessOwnerLOLAffiliatePageRequest';
import BOShop from './BusinessOwner/BusinessOwnerShop';
import BOUpcoming from './BusinessOwner/BusinessOwnerUpcoming';
import BOSpecificUpcomingListingScreen from './BusinessOwner/BusinessOwnerViewUpcomingListing';
import BOSearchUserScreen from './BusinessOwner/BOSearchPage';
import BOInsightsScreen from './BusinessOwner/BOInsightsPage';
import BOSpecificBookingScreen from './BusinessOwner/BOViewBooking';
//others
import CUScreen from './Others/ContactUsPage';
import PSScreen from './Others/PrivacyandSupport';
import SettingsScreen from './Others/Settings';
import SocialScreen from './Socials/Socials';

//poi
import LOLPOIScreen from './LOL/LOLPOIPage';
import NUPOIScreen from './NormalUser/NUPOIPage';
import AccommodationScreen from './POI/AccomodationPage';
import FoodScreen from './POI/FoodPage';
import AttractionsScreen from './POI/AttractionsPage';
import RetailScreen from './POI/RetailPage';
import LifestyleScreen from './POI/LifestylePage';
import TransportScreen from './POI/TransportPage';
import TourScreen from './POI/TourPage';
import EventScreen from './POI/EventPage';
//search
import ViewBOUserProfilePage from './Search/BOUserProfilePage';
import ViewLOLUserProfilePage from './Search/LOLUserProfilePage';
import ViewNUUserProfilePage from './Search/NUUserProfilePage';

//app-provider
import { AppProvider } from './AppContext';

const Stack = createStackNavigator();


export default function App() {
  return (
    <AppProvider>
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
        <Stack.Screen name="Business Registration SubCategory - Health & Wellness" component={BOSubCategoryHnWScreen} />
        <Stack.Screen name="Business Registration SubCategory - Transport" component={BOSubCategoryTransportScreen} />
        <Stack.Screen name="Business Registration SubCategory - Tours & Experiences" component={BOSubCategoryToursScreen} />
        <Stack.Screen name="Business Registration SubCategory - Events & Shows" component={BOSubCategoryEventsScreen} />
        <Stack.Screen name="About Yourself" component={AboutYourselfLOLScreen} />

        <Stack.Screen name="Business Category" component={SABusinessCategoryScreen} />
        <Stack.Screen name="Business Accounts" component={SearchBusinessScreen} />
        <Stack.Screen name="LOL Accounts" component={SearchLOLScreen} />
        <Stack.Screen name="Personal Accounts" component={SearchPersonalScreen} />
        <Stack.Screen name="System Admin" component={SystemAdminScreen} />
        <Stack.Screen name="Hospitality Sub Category" component={SubCategoryHospitalityScreen} />
        <Stack.Screen name="Food & Beverage Sub Category" component={SubCategoryFnbScreen} />
        <Stack.Screen name="Sports & Recreation Sub Category" component={SubCategorySnRScreen} />
        <Stack.Screen name="Retail Sub Category" component={SubCategoryRetailScreen} />
        <Stack.Screen name="Health & Wellness Sub Category" component={SubCategoryHNWScreen} />
        <Stack.Screen name="Transport Sub Category" component={SubCategoryTransportScreen} />
        <Stack.Screen name="Tours & Experiences Sub Category" component={SubCategoryToursScreen} />
        <Stack.Screen name="Events & Shows Sub Category" component={SubCategoryEventsScreen} />
        <Stack.Screen name="User Profile - LOL" component={LOLUserProfilePage} />
        <Stack.Screen name="User Profile - Normal User" component={NUUserProfilePage} />
        <Stack.Screen name="User Profile - Business" component={BOUserProfilePage} />
        <Stack.Screen name="User Post" component={UserSpecificPostScreen} />
        <Stack.Screen name="User Review" component={UserSpecificReviewScreen} />
        <Stack.Screen name="User Trail" component={UserSpecificTrailScreen} />
        <Stack.Screen name="User Listing" component={UserSpecificListingScreen} />
        <Stack.Screen name="User Promotion" component={UserSpecificPromoScreen} />

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
        <Stack.Screen name="Normal User Booking Page - Accommodation" component={NUAccommodationBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Food & Beverage" component={NUFnBBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Attraction" component={NUAttractionBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Transport" component={NUTransportBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Lifestyle" component={NULifestyleBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Tours" component={NUToursBookingScreen} />
        <Stack.Screen name="Normal User Booking Page - Events" component={NUEventsBookingScreen} />

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
        <Stack.Screen name="LOL Booking Page - Accommodation" component={LOLAccommodationBookingScreen} />
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
        <Stack.Screen name="LOL Booking Page - Lifestyle" component={LOLLifestyleBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Transport" component={LOLTransportBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Tours" component={LOLToursBookingScreen} />
        <Stack.Screen name="LOL Booking Page - Events" component={LOLEventsBookingScreen} />

      
      


        <Stack.Screen name="Business Owner" component={BOScreen} />
        <Stack.Screen name="Business Owner Create" component={BOCreateMainScreen} />
        <Stack.Screen name="Business Owner More" component={BOMoreScreen} />
        <Stack.Screen name="Business Owner All Listing" component={BOListingScreen} />
        <Stack.Screen name="Business Owner Profile" component={BOProfilePage} />
        <Stack.Screen name="Customer Bookings" component={BOBookingScreen} />
        <Stack.Screen name="Business Owner Listing" component={BONewListingScreen} />
        <Stack.Screen name="Business Owner Edit Listing" component={BOEditListingScreen} />
        <Stack.Screen name="Business Owner View Listing" component={BOSpecificListingScreen} />  
        <Stack.Screen name="Business Owner Create Promotion" component={BOCreatePromotion} />  
        <Stack.Screen name="Business Owner View Promotion" component={BOSpecificPromotionScreen} />  
        <Stack.Screen name="Business Owner View Booking" component={BOSpecificBookingScreen} />  
        <Stack.Screen name="Business Owner Promotion" component={BOPromotionScreen} /> 
        <Stack.Screen name="Business Owner Edit Promotion" component={BOEditPromotionScreen} /> 
        <Stack.Screen name="Business Owner View Review" component={BOSpecificReviewScreen} /> 
        <Stack.Screen name="LOL Affiliate" component={BOLOLAffiliateScreen} /> 
        <Stack.Screen name="LOL Affiliate Request" component={BOLOLAffiliateRequestScreen} /> 
        <Stack.Screen name="Business Owner Shop" component={BOShop} /> 
        <Stack.Screen name="Upcoming" component={BOUpcoming} /> 
        <Stack.Screen name="Upcoming Listing" component={BOSpecificUpcomingListingScreen} />
        <Stack.Screen name="Business Owner Search User" component={BOSearchUserScreen} /> 
        <Stack.Screen name="Business Owner Insights" component={BOInsightsScreen} /> 

        <Stack.Screen name="Contact Us" component={CUScreen} />
        <Stack.Screen name="Privacy & Support" component={PSScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Socials" component={SocialScreen} />


        <Stack.Screen name="LOL POI" component={LOLPOIScreen} />
        <Stack.Screen name="Normal User POI" component={NUPOIScreen} />
        <Stack.Screen name="POI - Accommodation" component={AccommodationScreen} />
        <Stack.Screen name="POI - Food" component={FoodScreen} />
        <Stack.Screen name="POI - Attractions" component={AttractionsScreen} />
        <Stack.Screen name="POI - Retail" component={RetailScreen} />
        <Stack.Screen name="POI - Lifestyle" component={LifestyleScreen} />
        <Stack.Screen name="POI - Transport" component={TransportScreen} />
        <Stack.Screen name="POI - Tours" component={TourScreen} />
        <Stack.Screen name="POI - Events" component={EventScreen} />

        <Stack.Screen name="View Business Profile" component={ViewBOUserProfilePage} />
        <Stack.Screen name="View LOL Profile" component={ViewLOLUserProfilePage} />
        <Stack.Screen name="View Normal User Profile" component={ViewNUUserProfilePage} />

      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
   
  );
}
