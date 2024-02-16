import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const PasswordSuccessScreen = () => {
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

  const navigation = useNavigation(); // Initialize the navigation object

  const handleProceed = () => {
    navigation.navigate('Log In'); // Navigate to SignUp screen on button press
  };

  return (
      <View style={styles.container}>
          <View style={styles.header}>
            <MaterialIcons name="location-on" size={20} color="#FF5733" />
            <Text style={styles.headerText}> {currentLocation}</Text>
          </View>
          <View style={styles.midContainer}>
              <Text style={styles.successmsgText}>Password Reset Successful</Text>

            <Text style={styles.secondaryText}> 
                You can now login with your 
                {'\n'}
                new password.
            </Text>

            <Image source={require('../assets/LOGO.png')} style={styles.logo} />

            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
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
    width: 150,
    height: 150,
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
    marginTop: 60,
  },
  successmsgText: {
    color: '#FB7E3C',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  secondaryText:{
    color: '#4B4B4B',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    
});

export default PasswordSuccessScreen;