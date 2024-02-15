import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar, Modal, TouchableOpacity, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import * as Location from 'expo-location';
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  doc, 
  getDoc, 
} from "firebase/firestore/lite";

const LandingPageScreen = () => {
    // remove console.log("App executed");
  console.log("App executed");
  //location
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        let address = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
        
        // Extract relevant information (street name and country)
        const street = address[0]?.name || '';
        const country = address[0]?.country || '';
        
        // Set the location state with the obtained information
        setCurrentLocation(`${street}, ${country}`);
        
      } catch (error) {
        console.error('Error fetching location:', error.message);
        // Handle the error as needed
      }
    };

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once

  //////////////////////////////////////////////////////////////////////////////// user count
  const [nuCount, setNuCount] = useState(0);
  const [boCount, setBoCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
  
        const personalUsers = snapshot.docs.filter(doc => {
          const userRole = doc.data().type; // Adjust this based on your actual data structure
          return userRole === 'personal';
        });
  
        const businessUsers = snapshot.docs.filter(doc => {
          const userRole = doc.data().type; // Adjust this based on your actual data structure
          return userRole === 'business';
        });
  
        
  
        setNuCount(personalUsers.length);
        setBoCount(businessUsers.length);
        setTotalUserCount(personalUsers.length + businessUsers.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();

  
    // Clean up resources if needed
  }, []); // No need to include userData in the dependency array if it's not changing during the component's lifecycle
  
  ////////////////////////////////////////////////////////////////////////////////

  //deals modal
  const [showDealsModal, setShowDealsModal] = useState(false);

  //navigation
  const navigation = useNavigation(); // Initialize the navigation object

  const handleLOLPress = () => {
    navigation.navigate('Landing Page - LOL'); // Navigate to SignUp screen on button press
  };

  const handleBusinessPress = () => {
    navigation.navigate('Landing Page - Business'); // Navigate to SignUp screen on button press
  };

  const handleLogInPress = () => {
    navigation.navigate('Log In');
  }

  const handleSignUpPress = ({ onClose }) => {
    navigation.navigate('Account Type');
    onClose(); // Close the modal after navigating to SignUp
  }

  const openDealsModal = () => {
    setShowDealsModal(true);
  };

  const closeDealsModal = () => {
    setShowDealsModal(false);
  };

  const places = [
    {
      id: 1,
      image: require('../assets/gbbsea.jpg'),
      place: 'Gardens by the Bay',
      location: 'Marina Gardens Drive',
    },
    {
      id: 2,
      image: require('../assets/newton.jpg'),
      place: 'Newton Food Centre',
      location: 'Newton',
    },
    {
      id: 3,
      image: require('../assets/advcove.jpg'),
      place: 'Adventure Cove Waterpark',
      location: 'Sentosa Island',
    },
    {
      id: 4,
      image: require('../assets/buddha.jpg'),
      place: 'Buddha Tooth Relic Temple',
      location: 'South Bridge Road',
    },
    {
      id: 5,
      image: require('../assets/littleindia.jpg'),
      place: 'Little India',
      location: 'Little India',
    },
    {
      id: 6,
      image: require('../assets/HAJI.jpg'),
      place: 'Haji Lane',
      location: 'Haji Lane',
    },
    {
      id: 7,
      image: require('../assets/ASH.jpg'),
      place: 'Ann Siang Hill',
      location: 'Chinatown',
    },
    {
      id: 8,
      image: require('../assets/pond.jpg'),
      place: 'Lotus Pond at Art Science Museum',
      location: 'Bayfront',
    },
    {
      id: 9,
      image: require('../assets/fullerton.jpg'),
      place: 'The Fullerton Hotel',
      location: 'Fullerton Square',
    },
    {
      id: 10,
      image: require('../assets/HPV.jpg'),
      place: 'Haw Par Villa',
      location: 'Pasir Panjang',
    },
    {
      id: 11,
      image: require('../assets/NGS.jpg'),
      place: 'National Gallery Singapore',
      location: 'City Hall',
    },
    {
      id: 12,
      image: require('../assets/RobertsonQuay.jpg'),
      place: 'The Quayside at Robertson Quay',
      location: 'Robertson Quay',
    },
    {
      id: 13,
      image: require('../assets/typebo.jpg'),
      place: 'The Merlion',
      location: 'Merlion Park',
    },
    {
      id: 14,
      image: require('../assets/uss.jpg'),
      place: 'Universal Studios Singapore',
      location: 'Resorts World Sentosa',
    },
    {
      id: 15,
      image: require('../assets/zoo.jpg'),
      place: 'Singapore Zoo',
      location: 'Mandai Wildlife Reserve',
    },
    {
      id: 16,
      image: require('../assets/botanic.jpg'),
      place: 'Singapore Botanic Gardens',
      location: 'Cluny Road',
    },
    {
      id: 17,
      image: require('../assets/flyer.png'),
      place: 'Singapore Flyer',
      location: 'Raffles Avenue',
    },
    {
      id: 18,
      image: require('../assets/esplanade.jpg'),
      place: 'Esplanade Concert Hall',
      location: 'Esplanade Drive',
    },
    // Add more places as needed
  ];

  const [promotions, setPromotions] = useState([]); 
  const fetchPromos = async () => {
    try {
      // Reference to the "posts" collection
      const promoCollection = collection(db, "promos"); // Replace 'db' with your Firestore database reference
      
      const querySnapshot = await getDocs(promoCollection);

      // Format fetched reviews into the desired structure
      const formattedPromos = [];
      querySnapshot.forEach((doc) => {
        const promoData = doc.data();
        const formattedPromo = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: { uri: promoData.thumbnail },
          title: promoData.title,
          description: promoData.description,
          promocode: promoData.promotion,
          valid: formatTimestamp(promoData.valid),
          userId: promoData.userId,
          category: promoData.category,
        };
        formattedPromos.push(formattedPromo);
      });

      await fetchPromoProfilePictures(formattedPromos);

      // Update state with the formatted reviews
      setPromotions(formattedPromos);
    } catch (error) {
      console.error("Error fetching promo:", error);
      // Handle the error as needed
    }
  };

  const fetchPromoProfilePictures = async (promotions) => {
    try {
        for (const promo of promotions) {
            const userId = promo.userId;
            if (!userId) {
                console.error("User ID is missing in the promotion:", promo);
                continue; // Skip processing this promotion and move to the next one
            }

            const userDocRef = doc(db, "users", userId); // Reference to the user document
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData && userData.pfp) {
                    promo.pfp = { uri: userData.pfp }; // Assign the pfp to the promotion object
                } else {
                    console.error(`User document with ID ${userId} does not have a 'pfp' field.`);
                    // Assign a default pfp or handle it based on your requirements
                    promo.pfp = require("../assets/pfp.png"); // Provide default pfp source
                }
            } else {
                // Handle the case where user document doesn't exist
                console.error(`User document with ID ${userId} does not exist.`);
                // Assign a default pfp or handle it based on your requirements
                promo.pfp = require("../assets/pfp.png"); // Provide default pfp source
            }
        }
    } catch (error) {
        console.error("Error fetching promotion profile pictures:", error);
        // Handle the error as needed
    }
};

  useEffect(() => {
    fetchPromos();
  }, []);



  const formatTimestamp = (timestamp) => {
    try {
      // Check if the timestamp is an object with seconds property
      if (timestamp && timestamp.seconds) {
        // Convert the seconds to milliseconds and create a Date object
        const dateObject = new Date(timestamp.seconds * 1000);
  
        // Format the date
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
  
        return dateObject.toLocaleDateString(undefined, options);
      } else {
        console.log("Invalid timestamp format:", timestamp);
        throw new Error('Invalid timestamp format');
      }
    } catch (error) {
      console.error("Error parsing timestamp:", error);
      return "Invalid Date";
    }
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
          {places.map((place, index) => (
          <View style={styles.slide} key={index}>
            <View style={styles.middlespacerimage}>
              <View style={styles.bigimageContainer}>
                <Image source={place.image} style={styles.bigImage} />
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
                  <Text style={styles.gradientTextPrimary}>{place.place}</Text>
                  <Text style={styles.gradientTextSecondary}>{place.location}</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        ))}
        </Swiper>
        </View>

            <View style={styles.middlespacertext}>
              <Text style={styles.semiBold}>Join </Text>
              <Text style={styles.countText}>{totalUserCount}</Text>
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
        <Text>&copy; 2024 TripAid</Text>
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
              <Text style={styles.modaltext}>Sign Up to Redeem!</Text>
            </View>

            <ScrollView style={styles.fixedHeightContainer}>
            <View style={styles.scrollContainer}>

            {promotions.map((promo) => (
              <View style={styles.modalInnerContainer} key={promo.id}>
                <View style={styles.halfCircleLeft}></View>
                <View style={styles.halfCircleRight}></View>
                <Image source={promo.pfp} style={styles.dealsImage} />
                <View style={styles.dottedLine}></View>
                <Text style={styles.dealsTop}>{promo.title}</Text>
                <Text style={styles.dealsMid}>{promo.category}</Text>
                <Text style={styles.dealsBot}>Valid till: {promo.valid}{'\n'}*T&C applies</Text>
              </View>
            ))}
            
            </View>
            </ScrollView>

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
  scrollContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10, // Add some paddingBottom if needed
    width: 300,
  },
  fixedHeightContainer: {
    height: 490, // Adjust the height as needed
  },
  dealsImage: {
    width: 60,  // Adjust the width as needed
    height: 60, // Adjust the height as needed
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 25,
  },

  dottedLine: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'rgba(102, 102, 102, 0.2)',
    height: 85,
    width: 0,
    marginLeft: 110,
    marginTop: -75,
  },
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
  modaltext: {
    color: '#FB7E3C',
    fontSize: 16,
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
  modalInnerContainer: {
    width: 300,
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
  dealsTop: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 126,
    marginTop: -75,
    maxWidth: '50%',
    maxHeight: '30%',
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