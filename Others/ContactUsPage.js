import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const CUScreen = () => {
    const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
    const [location, setLocation] = useState('');

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
    const { goBack } = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Landing Page');
    };

    const handleBackPress = () => {
        goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="location-on" size={20} color="#FF5733" />
                <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.midContainer}>
                    <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                    <Text style={styles.mainText}>Contact Us</Text>
    
                    <Text style={styles.text}>
                        Thank you for joining! {'\n\n'}
                        We are a group of students developing a mobile app set to revolutionize the Singapore travel experience, offering curated routes, local insights, and a thriving traveler community. {'\n\n'}
                        This project endeavors to develop a mobile app that simplifies and enhances the Singapore travel experience, offering curated routes, local insights, a community forum, and integration with influential residents and social media platforms for a comprehensive and engaging adventure. {'\n\n'}
                        Team Members: {'\n'}
                        </Text>
                    <Text style={[{ fontSize: 18, color : '#333' }]}>
                        Amos{'\t\t'}| awjtai001@mymail.sim.edu.sg {'\n'}
                        Jaz{'\t\t\t'}| deg009@mymail.sim.edu.sg {'\n'}
                        Reiko{'\t\t'}| yyrlau001@mymail.sim.edu.sg {'\n'}
                        Wanyee{'\t'}| wyqwkhoo001@mymail.sim.edu.sg {'\n'}
                        Weishan{'\t'}| wskoh012@mymail.sim.edu.sg {'\n\n'}
                    </Text>

                    <TouchableOpacity onPress={handleBackPress}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>

                    <Text>&copy; 2024 TripAid</Text>   
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerImages}>
                    <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
                    <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
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
        width: 100,
        height: 100,
        resizeMode: 'contain',
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
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    mainText: {
        color: '#093D89',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    contentContainer: {
        paddingBottom: 60, // Adjust the padding to avoid overlap with the footer
    },
    backText: {
        fontSize: 13,
        color: '#757575',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default CUScreen;
