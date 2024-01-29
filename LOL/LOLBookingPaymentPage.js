import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';


const LOLBookingPaymentScreen = () => {
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

    const [type, setType] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handlebooking = () => {
        console.log('paymentType:', type);
        console.log('cardnumber:', number)
        console.log('cardholdername:', name);
        console.log('expiry:', expiry);
        console.log('cvv:', cvv);
        
        navigation.navigate('LOL Booking Confirmation Page'); // Navigate to LOL More screen after publishing
      };

      const handlePaymentTypeSelection = (selectedType) => {
        setType(selectedType);
    };

    const renderPaymentOption = (option) => {
        const isSelected = type === option;
    
        return (
            <View style={styles.radioOption}>
                <TouchableOpacity
                    onPress={() => handlePaymentTypeSelection(option)}
                    style={[
                        styles.radioButton,
                        isSelected ? styles.radioButtonSelected : {},
                    ]}
                >
                    {isSelected && <View style={styles.dot} />}
                </TouchableOpacity>
                <Text style={styles.radioLabel}>{option}</Text>
            </View>
        );
    };
    
    
    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
            <Image source={require('../assets/LOGO.png')} style={styles.logo} />


                
              {/* Account Information */}
                    <View style={styles.accountInfo}>
                        <View style={styles.accountTextContainer}>
                        <Text style={styles.mainText}>
                        Payment{'\n'}Details
                        <Text style={{ color: '#FB7E3C' }}> Screen</Text>
                        </Text>

                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Payment Details */}
                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentText}>Payment Type</Text>

                    <View style={styles.paymentOptionsContainer}>
                        {renderPaymentOption('Mastercard')}
                        {renderPaymentOption('Visa')}
                        {renderPaymentOption('PayPal')}
                    </View>

                    <Text style={styles.paymentText}>Card Number</Text>

                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Card Number"
                        value={number}
                        onChangeText={(text) => setNumber(text)}
                    />

                    <Text style={styles.paymentText}>Cardholder Name</Text>

                    <TextInput
                        style={styles.inputContainer} // Define this style in your StyleSheet
                        placeholder="Cardholder Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                <View style={styles.inputContainerRow}>

                <View style={styles.inputContainerColumn}>

                    <Text style={styles.paymentText}>Expiry Date</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        value={expiry}
                        onChangeText={(text) => setExpiry(text)}
                    />
                </View>
                <View style={styles.inputContainerColumn}>

                    <Text style={styles.paymentText}>CVV</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="CVV"
                        value={cvv}
                        onChangeText={(text) => setCvv(text)}
                    />
                </View>
                </View>
                </View>

                </ScrollView>
                    




                {/* Create Itinerary Button */}
                <TouchableOpacity style={styles.createButton} onPress={handlebooking}>
                <Text style={styles.createButtonText}>Process Payment</Text>
                </TouchableOpacity>

              
                <Text style={{ marginBottom: 45 }}>&copy; 2024 TripAid</Text>

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
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      marginBottom: 10,
      marginTop: -25,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    
    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        flexDirection: 'column',
      },

      paymentContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
    },
    paymentText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        width: 160,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: '#030D45',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 10,
    },
    createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footerText: {
        marginBottom: 45,
        fontSize: 12,
        color: '#6A778B',
    },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FB7E3C',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 75,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      footerItem: {
        alignItems: 'center',
        marginBottom: 10,
      },
      footerText: {
        color: '#FFF',
        fontSize: 11,
      },
      middleCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      circle: {
        backgroundColor: '#FDCA60',
        width: 50,
        height: 50,
        borderRadius: 50, // Increased to make the circle more rounded
        alignItems: 'center',
        justifyContent: 'center',
      },
      plus: {
        color: '#093D89',
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: -5,
      },
      iconList: {
        alignItems: "flex-start",
        paddingHorizontal: 20,
        width: "100%", // Occupy full width
    },
    iconItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns items to the left
        marginBottom: 20,
        width: "100%", // Occupy full width
    },
    iconText: {
        marginLeft: 10,
        fontSize: 18,
        color: "#093D89",
        width: "80%", // Adjust text width for proper alignment
    },
    
    accountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Aligns items to the left
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 70, // Increased height for better alignment
      },
      accountTextContainer: {
        flexDirection: 'column',
        marginLeft: 10, // Adjust margin as needed
      },
      mainText: {
        color: '#0A2753', // Change the color to match your desired color
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      
    RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 130,
    },

    logoutButton: {
      backgroundColor: '#FB7E3C',
      borderRadius: 5,
      height: 50,
      width: 320,
      marginTop: 20,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    logoutButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itineraryContainer: {
        paddingHorizontal: 50,
        paddingTop: 20,
        flexDirection: 'row',
        borderTopWidth: 3,
        borderTopColor: '#6C7A9C',
        marginTop: 5,
        marginBottom:5,
      },
      textContainer: {
        marginBottom: 10,
        flexDirection: 'column',
        maxWidth: '100%',
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      subText: {
        fontSize: 12,
        color: '#6C7A9C',
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 120,
        height: 80,
        borderRadius: 8,
        marginRight: 20,
      },
      viewContentButton: {
        backgroundColor: '#FB7E3C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
      },
      viewContentText: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 3,
      },
      arrowContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        flexDirection: 'row',
      },
      createButton: {
        backgroundColor: '#030D45',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 10,
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      titleText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      picker: {
        width: '100%', // Occupy full width of the container
      },
      dropdownBox: {
        width: "100%",
        height: 35,
        borderRadius: 5,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: 16, // Update the font size to 18
    },

      dateContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      dateText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      dateInput: {
        width: '48%',
      },
      
      paxContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      paxText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      paxInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      paxInput: {
        width: '48%',
      },
      subTitle: {
        fontSize: 16,
        color: '#6C7A9C',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      roomsContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      roomsText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      roomsInputContainer: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
      },
      remarkContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      remarkText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      remarkInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        width: 350,
        height: 130,
      },
      paymentOptionsContainer: {
        flexDirection: 'row', // Display items horizontally
        justifyContent: 'space-evenly', // Adjust space between items
        marginBottom: 10, // Add margin if needed
    },
    inputContainer: {
        width: 350,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex', // No direct equivalent to "inline-flex" in React Native
        marginBottom: 10,
    },
    inputContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        justifyContent: 'flex-start',
        marginBottom: 150,
        width: '50%',
    },
    inputContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        justifyContent: 'flex-start',
        width: '100%',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000', // Customize the border color for unselected state
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: '#FB7E3C', // Customize the border color for selected state
    },
    radioLabel: {
        fontSize: 16,
        color: '#000',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FB7E3C', // Color of the dot
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -5 }, { translateY: -5 }], // Adjust position to center the dot
    },
});

export default LOLBookingPaymentScreen;