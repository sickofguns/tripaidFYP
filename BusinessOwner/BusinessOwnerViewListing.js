import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc, query, where, getDocs } from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";

const BOSpecificListingScreen = ({route}) => {
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [location, setLocation] = useState("");
  const { user } = useAppContext();
  const { listing } = route.params || {};
  console.log({ listing })
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
  const navigation = useNavigation(); // Initialize the navigation object

  const handleedit = () => {
    navigation.navigate("Business Owner Edit Listing", { listing }); // Navigate to SignUp screen on button press
  };

  const handledelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Reference to the Firestore collection
              const listingsCollection = collection(db, "listings");

              // Reference to the specific post document
              const listingRef = doc(listingsCollection, listing.id);

              // Delete the document
              await deleteDoc(listingRef);

              // Show success message
              Alert.alert(
                "Success",
                "Listing deleted successfully",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Navigate back after success message
                      navigation.goBack();
                    },
                  },
                ],
                { cancelable: false }
              );
            } catch (error) {
              console.error("Error deleting listing:", error);
              // Handle the error as needed
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [pfp, setpfp] = useState(null);

  const fetchProfilePicture = async () => {
    try {
      const socialsCollection = collection(db, "users");
      const socialQuery = query(socialsCollection, where("id", "==", user.id));
      const querySnapshot = await getDocs(socialQuery);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const pfpURL = userData.pfp || require("../assets/pfp.png"); // If pfp doesn't exist, provide a default value
  
        // Update state with the profile picture URL
        setpfp(pfpURL);
      } else {
        console.log("No matching user found in the socials collection.");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      // Handle the error as needed
    }
  };
  
  // Call the fetchProfilePicture function when the component mounts
  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="location-on" size={20} color="#FF5733" />
        <Text style={styles.headerText}> {currentLocation}</Text>
      </View>
      <View style={styles.midContainer}>
        <Image source={require("../assets/LOGO.png")} style={styles.logo} />

        {/* Account Information */}
        <View style={styles.accountInfo}>
          <View style={styles.accountTextContainer}>
            <Text style={styles.mainText}>View</Text>
            <Text style={[styles.mainText, { color: "#FB7E3C" }]}>Listing</Text>
          </View>
          {/* Profile Picture Icon */}
          {user.pfp ? (
              <Image
                style={styles.RightpfpContainer}
                source={{ uri: pfp }} // Use user.pfp if available
                />
            ) : (
              <Image
                style={styles.RightpfpContainer}
                source={require("../assets/pfp.png")} // Provide default image source
              />
            )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Image */}
            <Image source={listing.imageUrl} style={styles.image} />

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{listing.title}</Text>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Content */}
            <View style={styles.contentContainer}>
              <Text style={styles.subText}>{listing.description}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          {/* Create Itinerary Button */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => handleedit()}
          >
            <Text style={styles.createButtonText}>Edit Listing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => handledelete()}
          >
            <Text style={styles.createButtonText}>Delete Listing</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ marginBottom: 45 }}>&copy; 2024 TripAid</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
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
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
    marginTop: -25,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
  },

  midContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    flexDirection: "column",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FB7E3C",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 75,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: "center",
    marginBottom: 10,
  },
  footerText: {
    color: "#FFF",
    fontSize: 11,
  },
  middleCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  circle: {
    backgroundColor: "#FDCA60",
    width: 50,
    height: 50,
    borderRadius: 50, // Increased to make the circle more rounded
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "#093D89",
    fontSize: 50,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Aligns items to the left
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 30, // Increased height for better alignment
  },
  accountTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  RightpfpContainer: {
    width: 65,
    height: 65,
    borderRadius: 60,
    resizeMode: "cover",
    marginLeft: 130,
  },

  logoutButton: {
    backgroundColor: "#FB7E3C",
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itineraryContainer: {
    paddingHorizontal: 50,
    paddingTop: 20,
    flexDirection: "row",
    borderTopWidth: 3,
    borderTopColor: "#6C7A9C",
    marginTop: 5,
    marginBottom: 5,
  },
  textContainer: {
    marginBottom: 10,
    flexDirection: "column",
    maxWidth: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: "80%", // Adjust the maximum width as needed
  },
  subText: {
    fontSize: 14,
    color: "#6C7A9C",
    flexWrap: "wrap",
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -40,
  },
  image: {
    width: 328,
    height: 185,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: "center",
    // Other image styles
  },
  titleContainer: {
    padding: 10,
  },
  divider: {
    borderBottomWidth: 3,
    borderBottomColor: "#6C7A9C",
    marginHorizontal: 10,
    marginTop: 5,
  },
  contentContainer: {
    padding: 10,
  },
  viewContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  viewContentText: {
    fontSize: 16,
    color: "#6C7A9C",
    flexWrap: "wrap",
  },
  viewContentButton: {
    backgroundColor: "#FB7E3C",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  viewContentText: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 3,
  },
  arrowContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    flexDirection: "row",
  },
  createButton: {
    backgroundColor: "#030D45",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});

export default BOSpecificListingScreen;
