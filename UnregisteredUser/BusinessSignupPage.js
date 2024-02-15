import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";



const BOSignUpScreen = () => {
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
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation(); // Initialize the navigation object
  const [verify, setVerify] = useState(false);
  const [pending, setPending] = useState(true);
  const [ban, setBan] = useState(false);
  const [suspend, setSuspend] = useState(false);

  const [docRef, setDocRef] = useState(null); // State to store docRef  
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSignUp = async () => {
    // Reset all field errors
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setPhoneError(false);
    // Check if any field is empty
let hasEmptyField = false;
if (!username || !email || !password || !confirmPassword || !phone) {
  hasEmptyField = true;
}

if (hasEmptyField) {
    // Instead of setting the error state, show an alert
    Alert.alert("Alert", "Please fill in all required fields");
    return;
}

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setError("The password you entered don’t match");
      return;
    }

      // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.toLowerCase())) {
    setEmailError(true);
    setError("Please enter a valid email address");
    return;
  }

  // Validate phone number (only numbers)
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(phone)) {
    setPhoneError(true);
    setError("Phone number can only contain numbers");
    return;
  }

  try {
    // Perform signup logic
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent successfully");

    // Reset the error message after successful signup
    setError("");

    // Proceed with further actions (e.g., saving user data to Firestore)
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Phone Number:", phone);

    // Define the collection and document data for Firestore
    const usersDB = collection(db, "users");
    const data = {
      username,
      email,
      phone,
      password, // Consider whether you want to store the password in Firestore
      type: "business",
      verify,
      pending,
      signUpDate: Timestamp.now(),
      suspend,
      ban,
    };

    // Add user data to Firestore
    const docRef = await addDoc(usersDB, data);
    console.log("Document written with ID:", docRef.id);

    // Navigate to 'Business Registration' with the user ID
    navigation.navigate("Business Registration", { userId: docRef.id });
  } catch (error) {
    console.error("Error during signup:", error);
    setError("Error during signup. Please try again.");
  }
};

  const handleSignInPress = () => {
    navigation.navigate('Log In'); // Navigate to SignUp screen on button press
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.signupContainer}>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
          <TextInput
            style={[styles.input, usernameError && styles.errorInput]}
            placeholder="Business name"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

<TextInput
            style={[styles.input, emailError && styles.errorInput]}
            placeholder="Business email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

{emailError && (
      <Text style={styles.errorText}>
        Please enter a valid email address
      </Text>
    )}

<View style={[styles.passwordInput, passwordError && styles.errorInput]}>
            <TextInput
              style={[styles.passwordTextInput, { color: "#000" }]}
              placeholder="Enter Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
            />
<TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#ABAAAA"
              />
            </TouchableOpacity>
          </View>

          <TextInput
  style={[styles.input, confirmPasswordError && styles.errorInput]}
  placeholder="Confirm Password"
  onChangeText={(text) => setConfirmPassword(text)}
  value={confirmPassword}
  secureTextEntry={!showPassword}

  
/>

{password !== confirmPassword && (
        <Text style={styles.errorText}>
          The password you entered don’t match
        </Text>
      )}
          <TextInput
            style={[styles.input, phoneError && styles.errorInput]}
            placeholder="Phone Number"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />


{phoneError && (
      <Text style={styles.errorText}>
        Phone number can only contain numbers
      </Text>
    )}

          
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignInPress}>
              <View style={styles.accountContainer}>
                <Text style={styles.haccountText}>Already have an account?  </Text>
                <Text style={styles.signInText}>Sign In</Text>
              </View>
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
      width: 150,
      height: 150,
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


  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  signupTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
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
  //password container
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    width: 326,
  },
  passwordTextInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#ABAAAA',
  },
  eyeIcon: {
    padding: 10,
  },

  signupButton: {
    backgroundColor: '#FB7E3C',
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  showPasswordContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  },
  showPasswordText: {
    color: '#283372',
  },
  orSignUpWith: {
    alignItems: 'center',
    marginTop: 235,
  },
  orText: {
    color: '#283372',
    marginBottom: 15,
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

  haccountText: {
    fontSize: 13,
    color: '#434343',
    marginTop: 20,
  },
  signInText: {
    fontSize: 13,
    color: '#FB7E3C',
    marginTop: 20,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorInput: {
    borderColor: "red", // Set border color to red when there's an error
  },
});

export default BOSignUpScreen;
