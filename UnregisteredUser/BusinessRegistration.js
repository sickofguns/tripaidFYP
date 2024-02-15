import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore/lite";


const BORegistrationScreen = ({ route }) => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');
  const { userId } = route.params || {};

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
      const navigation = useNavigation();

    const [ACRA, setACRA] = useState('');
    const [address, setAddress] = useState('');

    const country = ['Local', 'International'];
    const hour = [
        "12 AM", "1230 AM", "1 AM", "130 AM", "2 AM", "230 AM", "3 AM", "330 AM", "4 AM", "430 AM", "5 AM", "530 AM",
        "6 AM", "630 AM", "7 AM", "730 AM", "8 AM", "830 AM", "9 AM", "930 AM", "10 AM", "1030 AM", "11 AM", "1130 AM",
        "12 PM", "1230 PM", "1 PM", "130 PM", "2 PM", "230 PM", "3 PM", "330 PM", "4 PM", "430 PM", "5 PM", "530 PM",
        "6 PM", "630 PM", "7 PM", "730 PM", "8 PM", "830 PM", "9 PM", "930 PM", "10 PM", "1030 PM", "11 PM", "1130 PM", 
        "24 Hours",
    ];
    const hostsize = [
        "Small (1-20 guests)", "Medium (20-50 guests)", "Large (50-100 guests)", "Extra Large (100+ guests)",
    ];

    const [selectedCountry, setSelectedCountry] = useState('Local or International');
    const [selectedHour, setSelectedHour] = useState('Operating Hours');
    const [selectedHostSize, setSelectedHostSize] = useState('No. of Pax');

    const [selectedOpenHour, setSelectedOpenHour] = useState('Opening');
    const [selectedCloseHour, setSelectedCloseHour] = useState('Closing');

    const isACRANumberValid = (acraNumber) => {
      // Regular expression patterns for validating ACRA number
      const acraPattern1 = /^[TSR]\d{2}[A-Z]{2}\d{4}[A-Z]$/;
      const acraPattern2 = /^\d{8}[A-Za-z]$/;
      const acraPattern3 = /^\d{9}[A-Za-z]$/;
  
      // Test if the ACRA number matches either of the patterns
      return acraPattern1.test(acraNumber) || acraPattern2.test(acraNumber) || acraPattern3.test(acraNumber);
  };
  
    const handleContinuePress = () => {

      if (!ACRA || !address || selectedCountry === 'Local or International' || selectedHour === 'Operating Hours' || selectedHostSize === 'No. of Pax') {
        // Show an alert to fill in required fields
        Alert.alert('Alert', 'Please fill in all required fields.');
        return;
    }


      // Validate the ACRA number before proceeding
    if (!isACRANumberValid(ACRA)) {
      // Show an error message to the user
      Alert.alert('Invalid ACRA Number', 'Please enter a valid ACRA number in the format TyyPQnnnnX.');
      return; // Exit the function early if the ACRA number is invalid
  }
        console.log('ACRA:', ACRA);
        console.log('Address:', address);
        console.log('Country:', selectedCountry);
        console.log('Operating Hours:', selectedHour);
        console.log('No. of Pax:', selectedHostSize);

        const usersDB = collection(db, "users");
        const docRef = doc(usersDB, userId);
        updateDoc(docRef, {
          id: userId,
          ACRA,
          address,
          country: selectedCountry, 
          operatingHours: selectedHour, 
          pax: selectedHostSize
        }).then(() => {
          navigation.navigate('Business Registration Category', { userId }); 
        })


    };

    const handleCancelPress = () => {
        navigation.navigate('Account Type');
    };

    useEffect(() => {
      if (selectedOpenHour !== 'Opening' && selectedCloseHour !== 'Closing') {
        // Combine and set the operating hours
        setSelectedHour(`${selectedOpenHour} - ${selectedCloseHour}`);
      } else {
        // Handle the case when either opening or closing hours are not selected
        setSelectedHour('Operating Hours');
      }
    }, [selectedOpenHour, selectedCloseHour]);
  
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="location-on" size={20} color="#FF5733" />
                <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.midContainer}>
                    <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                    <Text style={styles.enterDOBText}>Enter your ACRA number</Text>
                    <Text style={styles.additionalText}>Your business information will be protected</Text>
                    <View style={styles.dropdownContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="ACRA Number"
                            onChangeText={(text) => setACRA(text)}
                            value={ACRA}
                        />
                    </View>
                    <Text style={styles.enterDOBText}>Enter your address</Text>
                    <View style={styles.dropdownContaineraddress}>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />
                    </View>
            
                    <Text style={styles.enterDOBText}>
                    Business Operating Country</Text>

                    <View style={styles.dropdownContainer}>
                      {/* local/international Picker */}
                      <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                        style={styles.CountrydropdownBox}
                      >
                        <Picker.Item label="Local or International" value="Local or International" />
                        {country.map((country) => (
                          <Picker.Item label={country.toString()} value={country.toString()} key={country.toString()} />
                        ))}
                      </Picker>
                    </View>

                    <Text style={styles.enterDOBText}>
                    Operating Hours</Text>

                    <View style={styles.dropdownContainer}>
                        {/* Open Hour Picker */}
                        <Picker
                          selectedValue={selectedOpenHour}
                          onValueChange={(itemValue) => setSelectedOpenHour(itemValue)}
                          style={styles.HourdropdownBox}
                        >
                          <Picker.Item label="Opening" value="Opening" />
                          {hour.map((hour) => (
                            <Picker.Item label={hour.toString()} value={hour.toString()} key={hour.toString()} />
                          ))}
                        </Picker>

                        {/* Close Hour Picker */}
                        <Picker
                          selectedValue={selectedCloseHour}
                          onValueChange={(itemValue) => setSelectedCloseHour(itemValue)}
                          style={styles.HourdropdownBox}
                        >
                          <Picker.Item label="Closing" value="Closing" />
                          {hour.map((hour) => (
                            <Picker.Item label={hour.toString()} value={hour.toString()} key={hour.toString()} />
                          ))}
                        </Picker>
                    </View>

                    <Text style={styles.enterDOBText}>
                    Hosting Size</Text>

                    <View style={styles.dropdownContainer}>
                      {/* local/international Picker */}
                      <Picker
                        selectedValue={selectedHostSize}
                        onValueChange={(itemValue) => setSelectedHostSize(itemValue)}
                        style={styles.HostsizedropdownBox}
                      >
                        <Picker.Item label="No. of Pax" value="No. of Pax" />
                        {hostsize.map((hostsize) => (
                          <Picker.Item label={hostsize.toString()} value={hostsize.toString()} key={hostsize.toString()} />
                        ))}
                      </Picker>
                    </View>
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleCancelPress}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    
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
    enterDOBText: {
        color: '#FB7E3C',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        marginTop: -50,
    },
    additionalText: {
        color: '#847C7C',
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 30, // Adjust the margin as needed
        lineHeight: 17, // Controls line height
        marginTop: -40,
    },
    dropdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: 5,
      marginBottom: 65,
    },
    dropdownContaineraddress: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: -35,
      marginBottom: 65,
    },
    dropdownText: {
      color: '#6C6363',
      fontSize: 16,
      fontWeight: 'bold',
    },   
    continueButton: {
      backgroundColor: '#030D45',
      borderRadius: 5,
      height: 50,
      width: 320,
      marginTop: -30,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelText: {
      color: '#847C7C',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 15,
    },

    
    CategorydropdownBox: {
      width: '100%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      marginTop: -30,
      overflow: 'hidden', // Hide the content that overflows from the container
    },
    CountrydropdownBox: {
        width: '100%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -30,
        overflow: 'hidden', // Hide the content that overflows from the container
      },
      HourdropdownBox: {
        width: '49%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -30,
        marginLeft: 2,
        marginRight: 2,
        alignContent: 'space-between',
        overflow: 'hidden', // Hide the content that overflows from the container
      },
      HostsizedropdownBox: {
        width: '100%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -30,
        overflow: 'hidden', // Hide the content that overflows from the container
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
      scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 30, // Adjust the bottom padding as needed
    },
});

export default BORegistrationScreen;