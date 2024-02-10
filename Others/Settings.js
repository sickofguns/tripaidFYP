import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore/lite";
import { db, storage } from '../firebaseConfig'; // need for pfp storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // pfp storage
import { useAppContext } from "../AppContext";


const SettingsScreen = ({ route }) => {
    const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
    const [location, setLocation] = useState('');
    const [userData, setUserData] = useState(null);
    const { user } = route.params || {};

    useEffect(() => {
      console.log("Route params:", route.params);
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
  // pfp things
  const [pfp, setPfp] = useState(null);


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
            const userRef = doc(userCollection, id);
            await updateDoc(userRef, { phone });
            Alert.alert('Success', 'Phone number updated successfully');
        } catch (error) {
            console.error('Error updating phone number:', error);
            Alert.alert('Error', 'Failed to update phone number');
        }
    }
  };
  const handleChangePFP = async () => {
    try {
        if(!pfp) {
            alert("Please insert an Image!");
            return;
        }
            const response = await fetch(pfp);
            const blob = await response.blob();
            const pfpName = `pfp_${Date.now()}`;

            const storageRef = ref(storage, 'pfp/' + pfpName);
            uploadBytes(storageRef, blob).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    const newPfp = {
                        pfp: downloadURL,
                        userId: user.id,
                        username: user.username,
                        created: new Date()
                    };
                const pfpCollection = collection(db, "pfp");
                addDoc(pfpCollection, newPfp);

                alert("PFP Changed!");
                navigation.navigate("Normal User");
                });
            }).catch ((error) => {
                console.error("Error uploading pfp", error);
            });
        } catch (error) {
            console.error("Error uploading Pfp: ", error);
        }
    };
//  const handleChangeBio = async () => {
//    // To change the bio
//    if (!bio){
//        Alert.alert('Error', 'Please fill in the new bio.');
//    } else {
//        try {
//            // Update bio in Firestore
//            const userRef = doc(db, 'users', user.id);
//            await updateDoc(userRef, { bio });
//            Alert.alert('Success', 'Bio updated successfully');
//        } catch (error) {
//            console.error('Error updating bio:', error);
//            Alert.alert('Error', 'Failed to update bio');
//        }
//    }
//  };

    const navigation = useNavigation(); // Initialize the navigation object
    const { goBack } = useNavigation();

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
                    <Text style={styles.mainText}>Settings</Text>

                    <Text style={styles.titletext}>Change Password: </Text>

                    {/* Change Password */}
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Existing Password"
                        secureTextEntry
                        value={existingPassword}
                        onChangeText={(text) => setExistingPassword(text)}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45' }]}
                        onPress={() => handleChangePassword()}
                    >
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>

                    <Text style={styles.titletext}>Change Email: </Text>

                    {/* Change Email */}
                    <TextInput
                        style={styles.input}
                        placeholder="New Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45' }]}
                        onPress={() => handleChangeEmail(user)}
                    >
                        <Text style={styles.buttonText}>Change Email</Text>
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

                    <Text style={styles.titletext}>Change PFP: </Text>

                    {/* Change pfp */}
                    <TextInput
                        style={styles.bioinput}
                        placeholder="New Bio"
                        multiline
                        numberOfLines={5}
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#030D45' }]}
                        onPress={() => handleChangePFP()}
                    >
                        <Text style={styles.buttonText}>Change Bio</Text>
                    </TouchableOpacity>

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
    pfpContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    pfpText: {
       fontSize: 18,
       color: "#0A2753",
       marginBottom: 5,
       fontWeight: "bold",
    },
    pfpBox: {
        width: 350,
        height: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#E2E2E2",
        justifyContent: "center",
        alignItems: "center",
    },
    pfpImg: {
        width: 119,
        height: 116,
        borderRadius: 28,
    },
    addIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    addIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    addImageText: {
        color: "#6C7A9C",
        fontSize: 14,
        marginTop: 5,
    },
});

export default SettingsScreen;