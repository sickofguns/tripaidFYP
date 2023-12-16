import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const RegistrationSuccessScreen = () => {
    const currentLocation = 'Orchard, Singapore';
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
                <Text style={styles.successmsgText}>You are all set!</Text>

                <View style={styles.square}>
                  <View style={styles.topLine}>
                    <View style={styles.circle}>
                      <MaterialIcons
                        name="flight"
                        size={55}
                        color="#FB7E3C"
                        style={{ transform: [{ rotate: '45deg' }], alignSelf: 'center' }} // Rotate the icon by 45 degrees
                      />
                    </View>
                  </View>

                    <Text style={styles.secondaryText}> 
                      <Text style={{ color: '#030D45' }}>Ready to explore</Text>
                      {'\n'}
                      <Text style={{ color: '#FB7E3C' }}>Singapore together</Text>
                      <Text style={{ color: '#030D45' }}>?</Text>
                    </Text>
                      <Image source={require('../assets/LOGO.png')} style={styles.logo} />


                </View>


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
          <Text>&copy; 2023 TripAid</Text>
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
      marginTop: 10,
      alignSelf: 'center', // Center the logo horizontally
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
        fontSize: 32,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
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
      square: {
        width: 356,
        height: 374,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#FB7E3C',
        alignItems: 'center', // Center the content horizontally in the square
        justifyContent: 'center', // Center the content vertically in the square
        marginBottom: 10, // Add margin bottom for spacing
        marginTop: 30,
    },
    topLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute', // Position this relative to the parent
        top: -40, // Adjust this value to position the top line
        zIndex: 1, // Bring this above other content
    },
    circle: {
        width: 90,
        height: 90,
        borderRadius: 80,
        borderColor: '#FB7E3C',
        borderWidth: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegistrationSuccessScreen;