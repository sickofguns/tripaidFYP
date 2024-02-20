import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore/lite";


const UserInterestScreen = ({route}) => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');
  const { userId } = route.params || {}
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
      const navigation = useNavigation(); // Initialize the navigation object
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isAccommodationSelected, setIsAccommodationSelected] = useState(false); // hospitality
    const [isFoodSelected, setIsFoodSelected] = useState(false); // fnb
    const [isAttractionsSelected, setIsAttractionsSelected] = useState(false); // snr
    const [isShoppingSelected, setIsShoppingSelected] = useState(false); // retail
    const [isLifestyleSelected, setIsLifestyleSelected] = useState(false); // wellness
    const [isTransportSelected, setIsTransportSelected] = useState(false); // transport
    const [isToursSelected, setIsToursSelected] = useState(false); // tours
    const [isEventsSelected, setIsEventsSelected] = useState(false); // events
    
    const handleContinuePress = () => {
      // Check if any interest is selected
      if (selectedInterests.length === 0) {
        // Display an alert prompting the user to select at least one interest
        Alert.alert(
          'Select Interest',
          'Please select at least one interest to continue.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return; // Exit the function early if no interest is selected
      }
    
      console.log('Selected Interests:', selectedInterests);
      const usersDB = collection(db, 'users');
      const docRef = doc(usersDB, userId);
      updateDoc(docRef, {
        interests: selectedInterests.join(", ")
      }).then(() => {
      navigation.navigate('Account Successfully Registered', { userId });
      })
    };
    

    const handleInterestSelect = (interest, index) => {
      const isSelected = selectedInterests.includes(interest);

      if (isSelected) {
        setSelectedInterests((prevSelected) => prevSelected.filter(item => item !== interest));
      } else {
        setSelectedInterests((prevSelected) => [...prevSelected, interest]);
      }
        // Update the respective interest's selection state
      switch (interest) {
        case 'Accommodation':
          setIsAccommodationSelected(!isSelected);
          break;
        case 'Food':
          setIsFoodSelected(!isSelected);
          break;
        case 'Attractions':
          setIsAttractionsSelected(!isSelected);
          break;
        case 'Shopping':
          setIsShoppingSelected(!isSelected);
          break;
        case 'Lifestyle':
          setIsLifestyleSelected(!isSelected);
          break;
        case 'Transport':
          setIsTransportSelected(!isSelected);
          break;
        case 'Tours':
          setIsToursSelected(!isSelected);
          break;
        case 'Events':
          setIsEventsSelected(!isSelected);
          break;
        default:
          break;
      }
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.selectText}>Explore with us</Text>
                <Text style={styles.OtherselectText}>Select your interest!</Text>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Accommodation')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isAccommodationSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >        
                <View>
                  <Image
                    source={require('../assets/hospitality.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Accommodation</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Food')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isFoodSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >        
                <View>
                    <Image
                    source={require('../assets/food.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Food</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Attractions')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isAttractionsSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >     
                <View>
                    <Image
                    source={require('../assets/attractions.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Attractions</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Shopping')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isShoppingSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >  
                <View>
                    <Image
                    source={require('../assets/retail.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Shopping</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Lifestyle')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isLifestyleSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >  
                <View>
                    <Image
                    source={require('../assets/hnw.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Lifestyle</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Transport')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isTransportSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                > 
                <View>
                    <Image
                    source={require('../assets/transport.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Transport</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Tours')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isToursSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                > 
                <View>
                    <Image
                    source={require('../assets/tour.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Tours</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Events')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isEventsSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                > 
                <View>
                    <Image
                    source={require('../assets/events.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Events</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

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
        </ScrollView>
        
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 20,
      paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    color: '#6A778B',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
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
    marginLeft: 17,
    marginRight: 17,
  },
  footerImageGBB: {
    width: 50,
    height: 47,
    resizeMode: 'cover',
  },
  midContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
  },
  selectText: {
    color: '#0A2753',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  OtherselectText: {
    color: '#0A2753',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  curvedContainer: {
    width: 300,
    height: 140,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6, // Adjust the opacity level here (0 to 1)
  },
  textBehindImage: {
    position: 'absolute',
    zIndex: -1,
    color: 'blue',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginTop: 50, // Adjust the positioning of the text as needed
  },
  continueButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    height: 50,
    width: 320,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserInterestScreen;