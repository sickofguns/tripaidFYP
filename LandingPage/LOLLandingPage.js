import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
  updateDoc,
  doc, 
} from "firebase/firestore/lite";

const LOLLandingPageScreen = () => {
    // remove console.log("App executed");
  console.log("App executed");
  const { user } = useAppContext();

  //current location
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
    
  //navigation
  const navigation = useNavigation(); // Initialize the navigation object
  const { goBack } = useNavigation();
  const handleBackPress = () => {
    goBack();
  };

  //////////////////////////////////////////////////////////////////////////////// data lolopinions

const [lolOpinions, setLolOpinions] = useState([]);
const [pfp, setpfp] = useState(null);

const fetchLolOpinionsData = async () => {
  try {
    const usersCollection = collection(db, 'users');

    const userQuery = query(
      usersCollection,
      where('type', '==', 'personal'),
      where('lol', '==', true),
      where('verify', '==', true)
    );

    const userSnapshot = await getDocs(userQuery);

    // Map the documents to extract required data
    const lolOpinionsData = userSnapshot.docs.map((doc, index) => {
      return {
        id: index + 1, // Use index + 1 as the id
        username: doc.data().username,
        description: doc.data().description,
        usertype: 'Local Opinion Leader', // Default value
        pfpURL: doc.data().pfp,
      };
    });

    // Update the state with the fetched data
    setLolOpinions(lolOpinionsData);
  } catch (error) {
    console.error('Error fetching lolopinions data:', error);
  }
};


useEffect(() => {
  // Fetch lolopinions data when the component mounts
  fetchLolOpinionsData();
}, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Hear from our</Text>
            <View style={styles.subContent}>
              <Text style={styles.boldText}>Local Opinion</Text>
              <Text style={styles.boldText}>Leader</Text>
            </View>
          </View>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
        </View>


                {/* Use map function to render feedback items */}
                {lolOpinions.map((feedbackItem) => (
                  <View key={feedbackItem.id} style={styles.reviewContainer}>
                    <View style={styles.Revcontent}>
                    <Image
                      source={feedbackItem.pfpURL ? { uri: feedbackItem.pfpURL } : require("../assets/pfp.png")}
                      style={styles.LeftpfpContainer}
                    />
                        <Text style={styles.LeftUserName}>{feedbackItem.username}</Text>
                        <Text style={styles.LeftUserType}>{feedbackItem.usertype}</Text>
                      <Text style={styles.RightReviewContent}>{feedbackItem.description}</Text>
                    </View>
                  </View>
                ))}

            <TouchableOpacity onPress={handleBackPress}>
              <Text style={[styles.backText]}>Back</Text>
            </TouchableOpacity>



          </ScrollView>
 


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

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontSize: 13,
    color: '#757575',
    marginTop: 30,
    alignSelf: 'center',
},
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10, // Add some paddingBottom if needed
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
    marginBottom: -10,
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
  reviewContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 3,
    borderTopColor: '#6C7A9C',
  },
  LeftpfpContainer:{
    width: 70,
    height: 68,
    borderRadius: 34, // Half of the width/height for a perfect circle
    backgroundColor: 'lightgray', // You can change this to your desired color or remove it
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -230, // Adjust this according to your layout
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
    fontSize: 12,
    marginLeft: 120, // Adjust this according to your layout
    marginRight: 10, // Add some right margin to give space
    flexGrow: 1, // Takes remaining space
    textAlign: 'center', // Centers the text horizontally
    marginTop: -90,
  },
  Revcontent: {
    flexDirection: 'column', // Aligns items horizontally
    alignItems: 'center', // Aligns items vertically
    padding: 10,
    flexGrow: 1,
  },
});


export default LOLLandingPageScreen;