import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore/lite";
import { db, storage } from "../firebaseConfig"; // need call Storage from Firebase
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; // need
import { useAppContext } from "../AppContext";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const SettingsScreen = () => {
    const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
    const [location, setLocation] = useState('');
    const [userData, setUserData] = useState(null);
    const { user } = useAppContext();

    useEffect(() => {
      console.log("User:", user);
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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');


  const [existingPassword, setExistingPassword] = useState('');

// Function to handle changing password
const handleChangePassword = async () => {
    // Validate existing password
    if (!userData || existingPassword.trim() !== userData.password.trim()) {
        Alert.alert('Error', 'Your existing password is incorrect');
        return;
    }

    // Proceed with changing password logic
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
    } else if (!password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in the new password');
    } else {
        try {
            // Update password in Firestore
            const userCollection = collection(db, "users");
            const userRef = doc(userCollection, user.id); // Assuming id is the document ID
            await updateDoc(userRef, { password });
            Alert.alert('Success', 'Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Failed to update password');
        }
    }
};

  const handleChangeEmail = async () => {

    // To change the email
    if(!email){
        Alert.alert('Error', 'Please fill in the new email.');
    } else {
        try {
            // Update email in Firestore
            const userCollection = collection(db, "users");
            const userRef = doc(userCollection, user.id);
            await updateDoc(userRef, { email });
            Alert.alert('Success', 'Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error);
            Alert.alert('Error', 'Failed to update email');
        }
    }
  };

  const handleChangePhone = async () => {

    // To change the phone
    if (!phone){
        Alert.alert('Error', 'Please fill in the new phone number.');
    } else {
        try {
            // Update phone number in Firestore
            const userCollection = collection(db, "users");
            const userRef = doc(userCollection, user.id);
            await updateDoc(userRef, { phone });
            Alert.alert('Success', 'Phone number updated successfully');
        } catch (error) {
            console.error('Error updating phone number:', error);
            Alert.alert('Error', 'Failed to update phone number');
        }
    }
  };

  const handleChangeBio = async () => {
    // To change the bio
    if (!bio){
        Alert.alert('Error', 'Please fill in the new bio.');
    } else {
        try {
            // Update bio in Firestore
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, { bio });
            Alert.alert('Success', 'Bio updated successfully');
        } catch (error) {
            console.error('Error updating bio:', error);
            Alert.alert('Error', 'Failed to update bio');
        }
    }
  };

    const navigation = useNavigation(); // Initialize the navigation object
    const { goBack } = useNavigation();

    const handleBackPress = () => {
        goBack();
    };


    const [pfp, setpfp] = useState(null); // State to hold profile picture URI

    // Function to handle profile picture change
    const handleChangeProfilePicture = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!pickerResult.cancelled) {
        setpfp(pickerResult.assets[0].uri);
      }
    };

    const handleUpdateProfilePicture = async () => {
        if (!pfp) {
            Alert.alert('Error', 'Please add a profile image.');
            return;
        }
    
        try {
            // Fetch the user document from Firestore
            const userCollection = collection(db, "users");
            const userRef = doc(userCollection, user.id);
            const userDoc = await getDoc(userRef);
    
            if (!userDoc.exists()) {
                Alert.alert('Error', 'User document does not exist.');
                return;
            }
    
            // Fetch the user's existing profile picture URL
            const existingPfp = userDoc.data().pfp;
    
            // If an existing profile picture exists, delete it from storage
            if (existingPfp) {
                const existingPfpRef = ref(storage, existingPfp);
                await deleteObject(existingPfpRef);
            }
    
            // Upload the new profile picture to storage
            const response = await fetch(pfp);
            const blob = await response.blob();
            const imageName = `pfp_${user.id}_${Date.now()}`;
            const storageRef = ref(storage, `images/${imageName}`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            // Update the user document with the new profile picture URL
            await updateDoc(userRef, { pfp: downloadURL });
    
            // Show alert on successful update
            Alert.alert('Success', 'Profile picture updated successfully');
    
            // Optionally log the download URL for debugging
            console.log('File available at', downloadURL);
        } catch (error) {
            console.error('Error updating Profile picture:', error);
            Alert.alert('Error', 'Failed to update Profile picture');
            // Handle the error as needed
        }
    };
    
    


  const handleForgotPassword = async () => {
    try {
      const auth = getAuth(); // Assuming you have initialized Firebase Auth
      await sendPasswordResetEmail(auth, email);
  
      // Display a success message to the user
      alert("A password reset email has been sent to your email address. Please check your inbox.");
  
      // Optionally, navigate the user to another screen after sending the reset email
      // navigation.navigate("PasswordResetSentScreen");
    } catch (error) {
      // Handle errors
      console.error("Error sending password reset email:", error.message);
      alert("Invalid Email or An error occurred while sending the password reset email. Please try again later.");
    }
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
                    <Text style={styles.mainText}>Settings</Text>

                    <Text style={styles.titletext}>Enter Email to Change Password: </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45' }]}
                        onPress={() => handleForgotPassword()}
                    >
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>

                    <Text style={styles.titletext}>Change Phone Number: </Text>

                    {/* Change Phone */}
                    <TextInput
                        style={styles.input}
                        placeholder="New Phone Number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45' }]}
                        onPress={() => handleChangePhone()}
                    >
                        <Text style={styles.buttonText}>Change Phone Number</Text>
                    </TouchableOpacity>


                   <View>
                    <Text style={styles.titletext}>Change Profile Picture: </Text>

                    {/* Display current profile picture if available or default picture */}
                    <TouchableOpacity
                        style={[styles.profileImageContainer, { marginBottom: 10 }]}
                        onPress={handleChangeProfilePicture}
                    >
                        <Image
                        source={pfp && typeof pfp === 'string' ? { uri: pfp } : require("../assets/pfp.png")}
                        style={styles.profileImage}
                        />

                    </TouchableOpacity>

                    {/* Button to trigger profile picture change */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45', marginTop: 10 }]}
                        onPress={handleUpdateProfilePicture}
                    >
                        <Text style={styles.buttonText}>Change Profile Picture</Text>
                    </TouchableOpacity>
                    </View>

{/* /////////////////////////////////////////////////////////////// */}


                    <TouchableOpacity onPress={handleBackPress}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center' }}>&copy; 2024 TripAid</Text>
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
    profileImageContainer: {
        marginRight: 20,
        alignSelf: 'center',
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      bioinput: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: '#FB7E3C', // Changed to the requested color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
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
        marginBottom: 5,
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
        marginTop: 10,
        marginBottom: 10,
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

export default SettingsScreen;