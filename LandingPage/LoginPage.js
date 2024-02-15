import React, { useState, useEffect } from "react";
import {
  StatusBar,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, where, updateDoc, doc } from "firebase/firestore/lite";
import { useAppContext } from '../AppContext';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginPageScreen = () => {
  //location
  const { login } = useAppContext();
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        let address = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        // Extract relevant information (street name and country)
        const street = address[0]?.name || "";
        const country = address[0]?.country || "";

        // Set the location state with the obtained information
        setCurrentLocation(`${street}, ${country}`);
      } catch (error) {
        console.error("Error fetching location:", error.message);
        // Handle the error as needed
      }
    };

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once

  // State variables to manage the modal and input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  const [emailError, setEmailError] = useState(false); // State to control email error
  const [passwordError, setPasswordError] = useState(false); // State to control password error

  const handleLogin = async () => {
    try {
      // Existing login logic...
      
      // Check if the user is logging in as the system admin
      if (email.toLowerCase() === "firebasetripaidfyp@gmail.com") {
        // Check if the provided password is correct for the admin
        if (password === "123456ADMINFYPtripaid654321") {
          // Navigate to the System Admin screen
          navigation.navigate("System Admin");
          return;
        } else {
          // Display error message for incorrect password
          setPasswordError(true);
          return;
        }
      }
  
      const auth = getAuth(); // Assuming you have initialized Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the user's email is verified
      if (!user.emailVerified) {
        // Send email verification
        // Display a message to prompt the user to verify their email
        alert("A verification email has been sent to your email address. Please verify your email before logging in.");
        return;
      }
  
      // Replace this logic with the provided code for role-based navigation
      // Logic for handling login...
      console.log("Username:", email);
      console.log("Password:", password);
  
      // Replace this logic with your actual authentication logic
      // For demonstration purposes, let's assume roles are hardcoded after successful login
      //-----const userRole = 'system_admin'; // Replace this with logic to determine the user's role
      const usersCollection = collection(db, "users");
      // Query for the user based on either email or email
      const userQuery = query(
        usersCollection,
        where("email", "==", email)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      
      if (userQuerySnapshot.empty) {
        setErrorText("Invalid email"); // Show error if no matching user found
        setEmailError(true); // Set error state to true for invalid email or email
        return;
      }
  
      // Assuming there is only one user with a given email or email
      const userData = userQuerySnapshot.docs[0].data();
  
      login(userData)
      const userRole = userData.type;
      if (userRole === "business") {
        if (userData.verify && !userData.ban && !userData.suspend) {
          navigation.navigate("Business Owner");
        } else {
          if (userData.ban && userData.suspend) {
            // Display a message for suspended/banned business accounts
            alert("Account Suspended / Banned. Please contact system admin via email [firebasetripaidfyp@gmail.com] for more information. Thank you.");
          } else {
            // Display a message for unverified business accounts
            alert("Account needs to be verified before logging in. Please contact system admin via email [firebasetripaidfyp@gmail.com]. Thank you.");
          }
        }
      } else if (userRole === "personal" && userData.lol && userData.verify && !userData.ban && !userData.suspend) {
        navigation.navigate("LOL");
      } else if (userRole === "personal" && !userData.ban && !userData.suspend) {
        navigation.navigate("Normal User");
      } else if (email.toLowerCase() === "firebasetripaidfyp@gmail.com") {
        navigation.navigate("System Admin");
      } else {
        // Display a message for suspended/banned personal or LOL accounts
        alert("Account Suspended / Banned. Please contact system admin via email [firebasetripaidfyp@gmail.com] for more information. Thank you.");
      }
  
      console.log(userData.id);
    } catch (error) {
      // Handle authentication errors
      console.error("Authentication error:", error.message);
      if (error.code === "auth/invalid-credential") {
        // Display an error message for invalid credential (typically wrong password)
        setEmailError(true);
        setPasswordError(true);
      } else if (error.code === "auth/too-many-requests") {
        alert("Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
      } else {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };
  

  useEffect(() => {
    if (emailError || passwordError) {
      // Clear error states after 30 seconds
      const timer = setTimeout(() => {
        setEmailError(false);
        setPasswordError(false);
      }, 4000); // 40 seconds

      return () => clearTimeout(timer);
    }
  }, [emailError, passwordError]);

  const handleSignUpPress = () => {
    navigation.navigate("Account Type"); // Navigate to SignUp screen on button press
  };
  
  const handleResetPassword = () => {
    navigation.navigate("Forget Password"); // Navigate to SignUp screen on button press
  };

  const navigation = useNavigation(); // Initialize the navigation object
  //Signup press
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="location-on" size={20} color="#FF5733" />
        <Text style={styles.headerText}> {currentLocation}</Text>
      </View>
      <View style={styles.loginContainer}>
        <Image source={require("../assets/LOGO.png")} style={styles.logo} />
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: "#000",
                borderColor: passwordError || emailError ? "red" : "#C4C4C4",
              },
            ]}
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View
            style={[
              styles.passwordInput,
              {
                borderColor: passwordError || emailError ? "red" : "#C4C4C4",
              },
            ]}
          >
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
          {(emailError || passwordError) && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error" size={14} color="red" />
              <Text style={styles.errorText}>Wrong Email or Password</Text>
            </View>
          )}

          <View style={styles.bottomContainer}>
  
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={styles.forgetText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <TouchableOpacity onPress={handleSignUpPress}>
        <View style={styles.accountContainer}>
          <Text style={styles.dhaccountText}>Don’t have an account? </Text>
          <Text style={styles.signUpText}>Sign up</Text>
        </View>
      </TouchableOpacity>

      <StatusBar style="auto" />
      <View style={styles.footer}>
        <View style={styles.footerImages}>
          <Image
            source={require("../assets/HILTON.jpg")}
            style={styles.footerImageHilton}
          />
          <View style={styles.spacerfooter} />
          <Image
            source={require("../assets/SIA.jpg")}
            style={styles.footerImageSIA}
          />
          <View style={styles.spacerfooter} />
          <Image
            source={require("../assets/GBB.jpg")}
            style={styles.footerImageGBB}
          />
        </View>
        <Text>&copy; 2024 TripAid</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //whole page
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15,
  },
  //header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    color: "#6A778B",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  //footer
  footer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
  },
  footerImages: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerImageHilton: {
    width: 53.84,
    height: 20,
    resizeMode: "cover",
  },
  footerImageSIA: {
    width: 195.03,
    height: 20,
    resizeMode: "cover",
    marginLeft: 17,
    marginRight: 17,
  },
  footerImageGBB: {
    width: 50,
    height: 47,
    resizeMode: "cover",
  },
  //log in with google/fb/x
  orLoginWith: {
    alignItems: "center",
    marginTop: 0,
  },
  orText: {
    color: "#7A7A7A",
    marginBottom: 0,
  },
  socialImage: {
    width: 30, // Adjust width and height according to your design
    height: 30,
    marginHorizontal: 20,
  },
  socialIcons: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  //password container
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#C4C4C4",
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    height: 60,
    width: 326,
  },
  passwordTextInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#ABAAAA",
  },
  eyeIcon: {
    padding: 10,
  },
  line: {
    height: 3,
    width: 101,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 10,
  },
  loginLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  dhaccountText: {
    fontSize: 13,
    color: "#434343",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 13,
    color: "#FB7E3C",
    marginTop: 20,
    fontWeight: "bold",
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomContainer: {
    // Styles for the bottom container
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rememberMeContainer: {
    // Styles for the Remember me container
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40,
    marginTop: 10,
  },
  checkbox: {
    // Styles for the checkbox
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    // Styles for the Remember text
    fontSize: 13,
    color: "#7A7A7A",
    marginRight: 40,
  },
  forgetText: {
    // Styles for the Forget text
    fontSize: 13,
    color: "#7A7A7A",
    marginTop: 10,
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10, // Adjust this value for spacing from the top
  },
  inputContainer: {
    width: "80%",
    height: "30%",
    alignItems: "center",
    borderColor: "rgba(3, 13, 69, 0.1)",
  },
  input: {
    height: 60,
    width: 326,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1, // Sets the width of the outline
    borderColor: "#C4C4C4",
    backgroundColor: "#F7F7F7",
  },
  loginButton: {
    backgroundColor: "#030D45",
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginLeft: 5,
    fontSize: 11,
  },
});

export default LoginPageScreen;
