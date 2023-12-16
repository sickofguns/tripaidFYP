import React from 'react';
import { useState } from 'react';
import { StatusBar, Modal, TouchableOpacity, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';



const LandingPageScreen = () => {
    // remove console.log("App executed");
  console.log("App executed");

  const currentLocation = 'Orchard, Singapore';
  const [showDealsModal, setShowDealsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // match it back with the backend - total user count
  // Mock data for the total users and current date
  const count = 1999; // Replace this with your actual count
  const navigation = useNavigation(); // Initialize the navigation object

  const handleLOLPress = () => {
    navigation.navigate('Landing Page - LOL'); // Navigate to SignUp screen on button press
  };

  const handleBusinessPress = () => {
    navigation.navigate('Landing Page - Business'); // Navigate to SignUp screen on button press
  };
  const handleNormalPress = () => {
    openDealsModal
  };

  //Login press
  const handleLogInPress = () => {
    navigation.navigate('Log In');
  }

  const handleSignUpPress = ({ onClose }) => {
    navigation.navigate('Account Type');
    onClose(); // Close the modal after navigating to SignUp
  }

  const handlePOIPress = () => {
    navigation.navigate('Interest');
  }

  const openDealsModal = () => {
    setShowDealsModal(true);
  };

  const closeDealsModal = () => {
    setShowDealsModal(false);
  };

  const openReviewModal = () => {
    setShowReviewModal(true);
  };
  
  const closeReviewModal = () => {
    setShowReviewModal(false);
  };


  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>

        <View style={styles.newContainer}>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Hi there</Text>
            <View style={styles.subContent}>
              <Text style={styles.boldText}>Where do you</Text>
              <Text style={styles.boldText}>wanna go?</Text>
            </View>
          </View>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
        </View>


        <View style={styles.swiperContainer}>
        <Swiper showsButtons={false} 
        paginationStyle={{ bottom: -13 }}
        autoplay={true}
        autoplayTimeout={3} // Adjust the timeout (in seconds) as needed
        >
          <View style={styles.slide}>
            {/* Content for the first slide */}
            <View style={styles.middlespacerimage}>
              <View style={styles.bigimageContainer}>
                <Image source={require('../assets/gbbsea.jpg')} style={styles.bigImage} />
              </View>
              <LinearGradient
                colors={[
                  'rgba(17, 22, 23, 0.6)',
                  'rgba(21, 29, 32, 0.6)',
                  'rgba(67, 83, 89, 0.6)',
                  'rgba(243, 243, 243, 0.2)',
                  'rgba(255, 255, 255, 0.01)',
                ]}
                start={[0, 1]}
                end={[0, 0]}
                style={styles.linearGradient}
              >
                <View style={styles.gradientTextContainer}>
                  <Text style={styles.gradientTextPrimary}>Gardens by the Bay</Text>
                  <Text style={styles.gradientTextSecondary}>Marina Gardens Drive</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Second slide */}
          <View style={styles.slide}>
            {/* Content for the second slide */}
            <View style={styles.middlespacerimage}>
              <View style={styles.bigimageContainer}>
                <Image source={require('../assets/newton.jpg')} style={styles.bigImage} />
              </View>
              <LinearGradient
                colors={[
                  'rgba(17, 22, 23, 0.6)',
                  'rgba(21, 29, 32, 0.6)',
                  'rgba(67, 83, 89, 0.6)',
                  'rgba(243, 243, 243, 0.2)',
                  'rgba(255, 255, 255, 0.01)',
                ]}
                start={[0, 1]}
                end={[0, 0]}
                style={styles.linearGradient}
              >
                <View style={styles.gradientTextContainer}>
                  <Text style={styles.gradientTextPrimary}>Newton Food Centre</Text>
                  <Text style={styles.gradientTextSecondary}>Newton</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Third slide */}
          <View style={styles.slide}>
            {/* Content for the third slide */}
            <View style={styles.middlespacerimage}>
              <View style={styles.bigimageContainer}>
                <Image source={require('../assets/advcove.jpg')} style={styles.bigImage} />
              </View>
              <LinearGradient
                colors={[
                  'rgba(17, 22, 23, 0.6)',
                  'rgba(21, 29, 32, 0.6)',
                  'rgba(67, 83, 89, 0.6)',
                  'rgba(243, 243, 243, 0.2)',
                  'rgba(255, 255, 255, 0.01)',
                ]}
                start={[0, 1]}
                end={[0, 0]}
                style={styles.linearGradient}
              >
                <View style={styles.gradientTextContainer}>
                  <Text style={styles.gradientTextPrimary}>Adventure Cove Waterpark</Text>
                  <Text style={styles.gradientTextSecondary}>Sentosa Island</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </Swiper>
        </View>


            <View style={styles.middlespacertext}>
              <Text style={styles.semiBold}>Join </Text>
              <Text style={styles.countText}>{count}</Text>
              <Text style={styles.semiBold}> of us!</Text>
            </View>

            <View style={styles.midcolumn}>
            <TouchableOpacity onPress={handleLOLPress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('../assets/typelol.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Local Opinion Leader</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleBusinessPress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('../assets/typebo.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Business Owner</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={openDealsModal}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('../assets/typenu.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Personal</Text>
                </View>
                </TouchableOpacity>
                </View>

            

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogInPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={() => handleSignUpPress({ onClose: closeDealsModal })}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>

        </View>


      <View style={styles.footer}>
        <View style={styles.footerImages}>
          <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
          <View style={styles.spacerfooter} />
          <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
          <View style={styles.spacerfooter} />
          <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
        </View>
        <Text>&copy; 2023 TripAid</Text>
      </View>




      {/* Deals Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDealsModal}
        onRequestClose={closeDealsModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="whatshot" size={30} color="#FB7E3C" />
              <Text style={styles.modalHeaderText}>Exclusive Deals</Text>
            </View>
            <View style={styles.modalInnerContainer}>
              <View style={styles.halfCircleLeft}></View>
              <View style={styles.halfCircleRight}></View>
              <Image source={require('../assets/HILTON.jpg')} style={styles.dealsImageHilton} />
              <View style={styles.dottedLineHilton}></View>
              <Text style={styles.dealsTop}>$10 OFF</Text>
              <Text style={styles.dealsMid}>Booking</Text>
              <Text style={styles.dealsBot}>Valid until 01 February 2025</Text>
            </View>

            <View style={styles.modalInnerContainer}>
              <View style={styles.halfCircleLeft}></View>
              <View style={styles.halfCircleRight}></View>
              <Image source={require('../assets/GBB.jpg')} style={styles.dealsImageGBB} />
              <View style={styles.dottedLineGBB}></View>
              <Text style={styles.dealsTop}>25% OFF</Text>
              <Text style={styles.dealsMid}>Booking</Text>
              <Text style={styles.dealsBot}>Valid until 03 March 2025</Text>
            </View>

            <View style={styles.modalInnerContainer}>
              <View style={styles.halfCircleLeft}></View>
              <View style={styles.halfCircleRight}></View>
              <Image source={require('../assets/JUMBO.jpg')} style={styles.dealsImageJUMBO} />
              <View style={styles.dottedLineJUMBO}></View>
              <Text style={styles.dealsTop}>1 Free Crab</Text>
              <Text style={styles.dealsMid}>Dine-in</Text>
              <Text style={styles.dealsBot}>Valid until 11 September 2025</Text>
            </View>

            <View style={styles.modalInnerContainer}>
              <View style={styles.halfCircleLeft}></View>
              <View style={styles.halfCircleRight}></View>
              <Image source={require('../assets/BTV.jpg')} style={styles.dealsImageBTV} />
              <View style={styles.dottedLineBTV}></View>
              <Text style={styles.dealsTop}>Pay 1 Take 2</Text>
              <Text style={styles.dealsMid}>Bags only</Text>
              <Text style={styles.dealsBot}>Valid until 03 October 2025</Text>
            </View>

            <TouchableOpacity style={styles.DealsignUpButton} onPress={() => handleSignUpPress({ onClose: closeDealsModal })}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeDealsModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  newContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
    color: '#6A778B',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -12,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  text: {
    color: '#39414B',
    fontSize: 18,
  },
  subContent: {
    alignItems: 'flex-start',
    marginBottom: 33.5,
  },
  boldText: {
    color: '#0A2753',
    fontSize: 32,
    fontWeight: '800',
  },
  semiBold: {
    color: '#0A2753',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  footerImages: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerImageHilton: {
    width: 53.84,
    height: 20,
    resizeMode: 'cover',
  },
  footerImageSIA: {
    width: 195.03,
    height: 20,
    resizeMode: 'cover',
  },
  footerImageGBB: {
    width: 50,
    height: 47,
    resizeMode: 'cover',
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  
  spacerfooter: {
    width: 16.5,
  },
  middlespacerimage: {
    height: 33.5,
  },
  middlespacertext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midcolumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  countText: {
    color: '#FB7E3C',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  bigimageContainer: {
    width: 335,
    height: 180,
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigImage: {
    width: 335,
    height: 180,
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    width: 335,
    height: 83.26,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    bottom: -168,
    justifyContent: 'flex-end',
  },
  gradientTextContainer: {
    paddingHorizontal: 23,
    paddingBottom: 10,
  },
  gradientTextPrimary: {
    color: '#FFF',
    fontSize: 18,
  },
  gradientTextSecondary: {
    color: '#F3F3F3',
    fontSize: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 35,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#030D45',
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalHeaderText: {
    color: '#FB7E3C',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exclusiveDealContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalInnerContainer: {
    width: 342,
    height: 104,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  halfCircleLeft: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#030D45',
    transform: [{ rotate: '90deg' }], // Rotate the half circle
  },
  halfCircleRight: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#030D45',
    transform: [{ rotate: '-90deg' }], // Rotate the half circle
  },
  dealsImageHilton: {
    width: 60,
    height: 22.29,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 42,
  },
  dealsImageGBB: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 29,
  },
  dealsImageJUMBO: {
    width: 67,
    height: 41,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 38,
  },
  dealsImageBTV: {
    width: 70,
    height: 20.83,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 42,
  },
  dottedLineHilton: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -55,
  },
  dottedLineGBB: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -73,
  },
  dottedLineJUMBO: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -68,
  },
  dottedLineBTV: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -52,
  },
  dealsTop: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 126,
    marginTop: -75,
  },
  dealsMid: {
    color: '#000',
    fontSize: 16,
    marginLeft: 126,
    marginTop: 4,
  },
  dealsBot: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 10,
    marginLeft: 126,
    marginTop: 6,
  },
  modalReviewContent: {
    backgroundColor: '#FB7E3C',
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: 'center',
  },
  modalReviewHeaderText: {
    color: '#030D45',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
  },
  reviewContainer: {
    width: 334,
    height: 139,
    borderRadius: 10,
    borderColor: 'rgba(3, 13, 69, 0.1)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  LeftpfpContainer:{
    width: 70,
    height: 68,
    borderRadius: 34, // Half of the width/height for a perfect circle
    backgroundColor: 'lightgray', // You can change this to your desired color or remove it
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -230, // Adjust this according to your layout
    marginTop: 100, // Adjust this according to your layout
  },
  LeftUserName: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: -225,
    marginTop: 2,
    fontWeight: 'bold',
  },
  LeftUserType: {
    color: '#030D45',
    fontSize: 9,
    marginLeft: -225,
    marginTop: 2,
    fontStyle: 'italic',
  },
  RightReviewContent: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 100, // Adjust this according to your layout
    marginRight: 10, // Add some right margin to give space
    marginTop: -110,
    flex: 1, // Takes remaining space
    textAlign: 'center', // Centers the text horizontally
  },
  Revcontent: {
    flexDirection: 'column', // Aligns items horizontally
    alignItems: 'center', // Aligns items vertically
    padding: 10,
  },
  RightpfpContainer:{
    width: 70,
    height: 68,
    borderRadius: 34, // Half of the width/height for a perfect circle
    backgroundColor: 'lightgray', // You can change this to your desired color or remove it
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 230,
    marginTop: 100,
  },
  RightUserName: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 225,
    marginTop: 2,
    fontWeight: 'bold',
  },
  RightUserType: {
    color: '#030D45',
    fontSize: 9,
    marginLeft: 225,
    marginTop: 2,
    fontStyle: 'italic',
  },
  LeftReviewContent: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 10, // Adjust this according to your layout
    marginRight: 100, // Add some right margin to give space
    marginTop: -100,
    flex: 1, // Takes remaining space
    textAlign: 'center', // Centers the text horizontally
  },
  DealsignUpButton: {
    backgroundColor: '#FB7E3C',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperContainer: {
    height: 180, // Or specify a height that suits your design
    marginBottom: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },

  curvedContainer: {
    width: 280,
    height: 65,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6, // Adjust the opacity level here (0 to 1)
  },
  textBehindImage: {
    position: 'absolute',
    zIndex: 1,
    color: '#030D45',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginTop: 20, // Adjust the positioning of the text as needed
  },
});


export default LandingPageScreen;