import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore/lite";

const AboutYourselfLOLScreen = ({ route }) => {
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


      const [description, setDescription] = useState('');
      
      const handleDescriptionChange = (text) => {
        setDescription(text);
      };      
    

      const handleApply = () => {
        console.log('UserId:', userId);
        console.log('Description:', description);

        const usersDB = collection(db, "users");
        const docRef = doc(usersDB, userId);
        updateDoc(docRef, {
          id: userId, 
          description: description,
        }).then(() => {
          navigation.navigate('User Registration', { userId }); // Navigate to SignUp screen on button press
        })
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
                            <Text style={styles.mainText}>Apply to be an LOL</Text>
                        </View>
                    </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/* Added text */}
            <Text style={styles.shareText}> 
                Welcome aboard! 🌟 As a Local Opinion Leader, {'\n'}your voice matters. Tell us about yourself and {'\n'}why your 
                perspective is a game-changer in your community. Share your passions, local insights, {'\n'}and what makes 
                you a leader of opinion. {'\n\n'}

                Let's make a difference together! 💬🌍 {'\n\n'}

                Best, {'\n'}
                TripAid Team.
            </Text>
            <Text style={styles.reviewText}>
                *Application will be reviewed.
            </Text>

            <View style={styles.Detailscontainer}>
                <Text style={styles.titleText}>About yourself</Text>
                <TextInput
                    style={styles.detailinput}
                    multiline
                    numberOfLines={5}
                    placeholder="Enter details/description"
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
            </View>


                </ScrollView>
                    




                {/* Create Itinerary Button */}
                <TouchableOpacity style={styles.createButton} onPress={handleApply}>
                <Text style={styles.createButtonText}>Apply</Text>
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
        color: '#0A2753',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },
    RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 85,
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
        borderRadius: 5,
        height: 50,
        width: 320,
        marginTop: 20,
        marginBottom: 15,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
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
      inputContainer: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
      },
      input: {
        padding: 10,
        width: 350,
      },
      thumbnailContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      thumbnailText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      thumbnailBox: {
        width: 350,
        height: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnailImage: {
        width: 119,
        height: 116,
        borderRadius: 28,
      },
      addIcon: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      plus: {
        color: '#093D89',
        fontSize: 40,
      },
      addImageText: {
        color: '#6C7A9C',
        fontSize: 14,
        marginTop: 5,
      },
      Detailscontainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      detailinput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        padding: 10,
        width: 350,
        height: 200,
      },

      congratsText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 30,
    },
    shareText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 25,
    },
    reviewText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 30,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#030D45',
      borderRadius: 10,
      padding: 20,
      width: 355,
      alignItems: 'center',
    },
    modalHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 15,
    },
    modalHeaderText: {
      color: '#FB7E3C',
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 8,
    },
    modaltext: {
      color: '#FB7E3C',
      fontSize: 16,
      marginLeft: 10,
      marginTop: 8,
    },
    closeButton: {
      marginTop: 20,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalInnerContainer: {
      width: 340,
      borderRadius: 8,
      backgroundColor: '#FFF',
      marginBottom: 10,
      flexGrow: 1,
    },
    policy: {
      color: '#000',
      fontSize: 13,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      textAlign: 'justify',
    },
    agreeerrorText: {
      color: 'red',
      marginTop: 15,
    },
    DealsignUpButton: {
      backgroundColor: '#FB7E3C',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    rememberMeContainer: {
      // Styles for the Remember me container
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 100,
      marginTop: 10,
    },
    checkbox: {
      // Styles for the checkbox
      width: 14,
      height: 14,
      borderWidth: 1,
      borderColor: '#7A7A7A',
      marginLeft: 90,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    rememberText: {
      // Styles for the Remember text
      fontSize: 16,
      color: '#7A7A7A',
      marginLeft: 10,
    },
    agreeText: {
      // Styles for the Remember text
      fontSize: 16,
      color: '#7A7A7A',
      marginLeft: 5,
    },
});

export default AboutYourselfLOLScreen;