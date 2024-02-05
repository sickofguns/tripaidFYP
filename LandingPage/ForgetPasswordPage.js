import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const ForgetPasswordScreen = () => {
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

    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');

    const navigation = useNavigation(); // Initialize the navigation object

    const handleSignInPress = () => {
        navigation.navigate('Log In'); // Navigate to SignUp screen on button press
    };

    const handleSignUpPress = () => {
        navigation.navigate('Sign Up'); // Navigate to SignUp screen on button press
    };

    const handleSend = () => {
        console.log('Email:', email);
    
        let isValidEmail = false;
    
        switch (email) {
            case 'sa':
                isValidEmail = true;
                break;
            case 'bo':
                isValidEmail = true;
                break;
            case 'lol':
                isValidEmail = true;
                break;
            case 'nu':
                 isValidEmail = true;
                break;
            default:
                setErrorText('Invalid email');
                break;
        }
    
        if (!isValidEmail) {
            setErrorText('Invalid email');
        } else {
            // Navigate to RegistrationSuccessScreen on successful signup
            navigation.navigate('OTP');
        }
        setTimeout(() => {
            setEmail(''); // Reset email state
            setErrorText(''); // Clear the error message
          }, 2000); // Change the duration (in milliseconds) as needed
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
                <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.forgetpwText}>Forget Password</Text>
                <Text style={styles.emailText}>Enter Email Address</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <Text style={[styles.errorText, { color: 'red' }]}>{errorText}</Text>

                <TouchableOpacity onPress={handleSignInPress}>
                        <Text style={styles.backText}>Back to sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>

                <View style={styles.orStyle}>
                    <View style={styles.loginLine}>
                    <View style={styles.line} />
                        <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                    </View>
                        <View style={styles.socialIcons}>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/google-social.png')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/fb-social.png')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/tiktok-social.jpg')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        </View>
                </View>

                <TouchableOpacity onPress={handleSignUpPress}>
                    <View style={styles.accountContainer}>
                        <Text style={styles.dhaccountText}>Don’t have an account?  </Text>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </View>
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
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 60,
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
    forgetpwText: {
        color: '#FB7E3C',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    emailText: {
        color: '#434343',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 60,
        width: 326,
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1, // Sets the width of the outline
        borderColor: '#C4C4C4',
        backgroundColor: '#F7F7F7',
    },
    sendButton: {
        backgroundColor: '#FB7E3C',
        borderRadius: 5,
        height: 50,
        width: 320,
        marginTop: 20,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        marginBottom: 50,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backText: {
        fontSize: 13,
        color: '#757575',
        marginTop: 10,
        marginBottom: 10,
    },
    //log in with google/fb/x
    orStyle: {
        alignItems: 'center',
        marginTop: 0,
    },
    orText: {
        color: '#7A7A7A',
        marginBottom: 0,
    },
    socialImage: {
        width: 30, // Adjust width and height according to your design
        height: 30,
        marginHorizontal: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    line: {
        height: 3,
        width: 101,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 45,
    },
    loginLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    dhaccountText: {
        fontSize: 13,
        color: '#434343',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 13,
        color: '#FB7E3C',
        marginTop: 20,
        fontWeight: 'bold',
    },
    accountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
        fontSize: 11,
    }
});

export default ForgetPasswordScreen;