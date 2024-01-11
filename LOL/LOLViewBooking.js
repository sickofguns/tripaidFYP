import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TextInput } from 'react-native';

const LOLSpecificBookingScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const route = useRoute();
    const { bookingData } = route.params;


    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCancelBooking = () => {
        Alert.prompt(
          'Confirm Cancellation',
          'Please state your reason for cancelling:',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: (reason) => {
                if (reason) {
                  // Handle cancellation logic with the reason entered
                  console.log('Cancellation reason:', reason);
                  // Perform your cancellation actions here
      
                  // Show success message and navigate back
                  Alert.alert(
                    'Reservation Successfully Cancelled',
                    'Your booking has been cancelled.',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          // Navigate back
                          navigation.goBack(); // Assuming navigation is accessible here
                        },
                      },
                    ]
                  );
                } else {
                  // Prompt the user to enter a reason
                  Alert.alert('Reason is required', 'Please enter a reason to cancel.');
                }
              },
            },
          ],
          'plain-text' // Type of input (plain-text)
        );
      };


      const historyData = [
        {
          place: 'Hai Di Lao @ MBS',
          category: 'Food',
          time: '8:00 pm',
          date: '10-01-2024',
          bookingid: '001',
          request: 'nil',
          location: 'MBS',
        },
        {
          place: 'Adventure Cove',
          category: 'Attraction',
          time: '10:00 am',
          date: '11-01-2024',
          bookingid: '002',
          request: 'fast pass',
          location: 'Sentosa',
        },
        {
          place: 'Marina Bay Sands Singapore',
          category: 'Accommodation',
          time: '10:00 am',
          date: '10-01-2024',
          bookingid: '003',
          request: 'extra bed',
          location: 'MBS',
        },
        // Add more itinerary items as needed
      ];
    

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
                            <Text style={styles.mainText}>View</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Booking</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                        
                    </View>
                    <View style={styles.divider} />

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                    
                    {bookingData && (
                        <View>
                        {bookingData.category === 'Food' && (
                            <Text style={styles.categoryText}>Restaurant Reservation at {bookingData.place}</Text>
                        )}
                        {bookingData.category === 'Attraction' && (
                            <Text style={styles.categoryText}>Activity Reservation at {bookingData.place}</Text>
                        )}
                        {bookingData.category === 'Accommodation' && (
                            <Text style={styles.categoryText}>Accommodation Reservation at {bookingData.place}</Text>
                        )}
                        <Text style={styles.detailText}>Date: <Text style={styles.boldBlack}>{bookingData.date}</Text></Text>
                        <Text style={styles.detailText}>Time: <Text style={styles.boldBlack}>{bookingData.time}</Text></Text>
                        <Text style={styles.detailText}>Location: <Text style={styles.boldBlack}>{bookingData.location}</Text></Text>
                        <Text style={styles.detailText}>BookingID: <Text style={styles.boldBlack}>{bookingData.bookingid}</Text></Text>
                        <Text style={styles.detailText}>Details: <Text style={styles.boldBlack}>{bookingData.request}</Text></Text>
                        </View>
                    )}
                    </ScrollView>

                    {/* Create Itinerary Button */}
                <TouchableOpacity style={styles.createButton} onPress={handleCancelBooking}>
                <Text style={styles.createButtonText}>Cancel Booking</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleBackPress}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>

              
                <Text style={{ marginBottom: 45 }}>&copy; 2023 TripAid</Text>

          
        </View>
        
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    backText: {
        fontSize: 13,
        color: '#757575',
        marginTop: 10,
        marginBottom: 10,
    },
    categoryText: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#030D45',
        marginBottom: 5,
        marginTop: 25,
        flexWrap: 'wrap',
        paddingHorizontal: 15, // Adjust the horizontal padding
      },
      detailText: {
        color: '#FB7E3C',
        fontSize: 16,
        marginTop: 20,
        fontWeight: '700',
        paddingHorizontal: 15, // Adjust the horizontal padding
      },
      boldBlack: {
        fontWeight: '500',
        color: '#000',
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
        marginBottom: 20,
        height: 30, // Increased height for better alignment
    },
    accountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      subText: {
        fontSize: 14,
        color: '#6C7A9C',
        flexWrap: 'wrap',
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 328,
        height: 185,
        borderRadius: 30,
        marginTop: 10,
        alignSelf: 'center'
        // Other image styles
      },
      titleContainer: {
        padding: 10,
    },
    divider: {
        borderTopWidth: 3,
        borderBottomColor: '#6C7A9C',
        marginHorizontal: 10,
        marginTop: 5,
    },
    contentContainer: {
        padding: 10,
    },
    viewContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    viewContentText: {
            fontSize: 16,
            color: '#6C7A9C',
            flexWrap: 'wrap',
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
});

export default LOLSpecificBookingScreen;