import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const NUMainBookingScreen = () => {
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [location, setLocation] = useState("");

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

  const handlePressAccommodation = () => {
    navigation.navigate("Normal User Booking Page - Accommodation"); // Navigate to SignUp screen on button press
  };
  const handlePressFNB = () => {
    navigation.navigate("Normal User Booking Page - Food & Beverage"); // Navigate to SignUp screen on button press
  };
  const handlePressAttraction = () => {
    navigation.navigate("Normal User Booking Page - Attraction"); // Navigate to SignUp screen on button press
  };
  const handlePressTransport = () => {
    navigation.navigate("Normal User Booking Page - Transport"); // Navigate to SignUp screen on button press
  };

  const handlePressLifestyle = () => {
    navigation.navigate("Normal User Booking Page - Lifestyle"); // Navigate to SignUp screen on button press
  };
  
  const handlePressTours = () => {
    navigation.navigate("Normal User Booking Page - Tours"); // Navigate to SignUp screen on button press
  };

  const handlePressEvents = () => {
    navigation.navigate("Normal User Booking Page - Events"); // Navigate to SignUp screen on button press
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>
        <View style={styles.midContainer}>
          <Image source={require("../assets/LOGO.png")} style={styles.logo} />

          <Text style={styles.selectText}>
            Choose {"\n"}
            Booking Category
          </Text>

          <TouchableOpacity onPress={handlePressAccommodation}>
            <View style={styles.curvedContainer}>
              <Image
                source={require("../assets/hospitality.jpg")}
                style={styles.image}
              />
              <Text style={styles.textBehindImage}>Accommodation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressFNB}>
            <View style={styles.curvedContainer}>
              <Image source={require("../assets/fnb.jpg")} style={styles.image} />
              <Text style={styles.textBehindImage}>Food & Beverage</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressAttraction}>
            <View style={styles.curvedContainer}>
              <Image
                source={require("../assets/attractions.jpg")}
                style={styles.image}
              />
              <Text style={styles.textBehindImage}>Attraction</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity onPress={handlePressLifestyle}>
          <View style={styles.curvedContainer}>
            <Image source={require("../assets/hnw.jpg")} style={styles.image} />
            <Text style={styles.textBehindImage}>Lifestyle</Text>
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={handlePressTransport}>
          <View style={styles.curvedContainer}>
            <Image source={require("../assets/transport.jpg")} style={styles.image} />
            <Text style={styles.textBehindImage}>Transport</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressTours}>
          <View style={styles.curvedContainer}>
            <Image source={require("../assets/tour.jpg")} style={styles.image} />
            <Text style={styles.textBehindImage}>Tours</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressEvents}>
          <View style={styles.curvedContainer}>
            <Image source={require("../assets/events.jpg")} style={styles.image} />
            <Text style={styles.textBehindImage}>Events</Text>
          </View>
        </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>&copy; 2024 TripAid</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
    paddingVertical: 20,
    paddingTop: 20,
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
    marginBottom: 20,
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
    marginTop: 10,
  },
  selectText: {
    color: "#0A2753",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: -20,
  },
  curvedContainer: {
    width: 300,
    height: 140,
    borderRadius: 30,
    overflow: "hidden",
    position: "relative",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.6, // Adjust the opacity level here (0 to 1)
  },
  textBehindImage: {
    position: "absolute",
    zIndex: -1,
    color: "blue",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginTop: 50, // Adjust the positioning of the text as needed
  },

  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 4,
    marginRight: 10,
    marginBottom: 5,
  },
  editIcon: {
    // Style for the edit icon
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "90%",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 15,
    color: "#757575",
    flex: 1,
  },
});

export default NUMainBookingScreen;
