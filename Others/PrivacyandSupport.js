import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const PSScreen = () => {
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

    const handleContactUsPress = () => {
        navigation.navigate('Contact Us');
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
                    <Text style={styles.mainText}>Privacy & Support</Text>
    
                    <Text style={styles.mainHeader}>Privacy Policy:{'\n'}</Text>

                    <Text style={styles.text}>
                    <Text style={styles.titletext}>Data collection: {'\n'}</Text>
                    * Tripaid collects personal information like personal information and travel preferences.{'\n'}
                    * Location data is used to provide location-based recommendations.{'\n\n'}

                    <Text style={styles.titletext}>Purpose of Data Collection:{'\n'}</Text>
                    * Personal information is utilized to create personalized itineraries and profile-based recommendations{'\n'}
                    * Location data enhances the app's ability to suggest nearby attractions and services.{'\n\n'}

                    <Text style={styles.titletext}>Third-Party Sharing:{'\n'}</Text>
                    * Trip shares data with third-party service providers for bookings (e.g., hotels, transportation) but does not sell or share personal information for marketing purposes.{'\n\n'}

                    <Text style={styles.titletext}>Security Measures:{'\n'}</Text>
                    * User data is secured using encryption during transmission.{'\n'}
                    * Strict access controls and authentication protocols are in place.{'\n\n'}

                    <Text style={styles.titletext}>Data Retention:{'\n'}</Text>
                    *  Personal information is retained as long as the user has an active account. Users can request data removal by contacting support.{'\n\n'}
                     
                    </Text>

                    <Text style={styles.mainHeader}>Support:{'\n'}</Text>
                    
                    <Text style={styles.text}>
                    <Text style={styles.titletext}>Customer Support: {'\n'}</Text>
                    * For assistance, contact our customer support team{' '}
                    <Text style={styles.linkText} onPress={handleContactUsPress}>
                    HERE
                    </Text>{' '}
                    or call our helpline at +65 1234 5678. {'\n\n'}

                    <Text style={styles.titletext}>FAQs: {'\n'}</Text>
                    * Visit our FAQs section for answers to common questions about creating itineraries, using the app, and troubleshooting. {'\n\n'}

                    <Text style={styles.titletext}>Opt-Out Options: {'\n'}</Text>
                    * Customize privacy settings in the app to control data sharing preferences. {'\n\n'}

                    <Text style={styles.titletext}>Updates and Changes: {'\n'}</Text>
                    * Users will be notified of any changes to the privacy policy through app notifications. {'\n\n'}

                    <Text style={styles.titletext}>Cookies and Tracking: {'\n'}</Text>
                    * Trip uses cookies to enhance user experience. Manage cookie preferences in app settings. {'\n\n'}

                    <Text style={styles.titletext}>Compliance: {'\n'}</Text>
                    * Trip complies with relevant data protection laws, including local regulations in Singapore. Users can request access or correction of their data. {'\n\n'}

                    <Text style={styles.titletext}>Accessibility: {'\n'}</Text>
                    * Tripaid is committed to accessibility. Contact support for assistance with accessibility features. {'\n\n'}

                    </Text>



                    <TouchableOpacity onPress={handleBackPress}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center' }}>&copy; 2023 TripAid</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerImages}>
                    <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
                    <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
                    <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
                </View>
                <Text>&copy; 2023 TripAid</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
      },
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
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center', // Center horizontally
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
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginTop: -10,
    },
    titletext: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 24,
        color: '#333',
        marginTop: -10,
    },
    contentContainer: {
        paddingBottom: 60, // Adjust the padding to avoid overlap with the footer
    },
    mainHeader: {
        fontSize: 24,
        lineHeight: 24,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    backText: {
        fontSize: 13,
        color: '#757575',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
});

export default PSScreen;
