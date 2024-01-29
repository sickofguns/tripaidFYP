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
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore/lite";

const LOLNewPostScreen = () => {
  const { user } = useAppContext();

  const navigation = useNavigation(); // Initialize the navigation object
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [place, setPlace] = useState("");

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

  const handleHome = () => {
    navigation.navigate("LOL");
  };

  const handlePOI = () => {
    navigation.navigate("LOL POI");
  };

  const handleProfile = () => {
    navigation.navigate("LOL More");
  };

  const handleCU = () => {
    navigation.navigate("Contact Us");
  };

  const handleLogout = () => {
    navigation.navigate("Landing Page");
  };

  const handleCreate = () => {
    navigation.navigate("LOL Create");
  };

  const handlepublish = async () => {
    try {
      // Create a new post object with the required fields
      const newPost = {
        location: place,
        thumbnail: thumbnail,
        description: description,
        userId: user.id,
        created: new Date(),
        // Add other fields as needed
      };

      // Add the new post document to the "posts" collection
      const postsCollection = collection(db, "posts"); // Replace 'db' with your Firestore database reference
      await addDoc(postsCollection, newPost);

      // Show alert on successful publishing
      alert("Post published!");
      navigation.navigate("Normal User"); // Navigate to Normal User More screen after publishing
    } catch (error) {
      console.error("Error publishing post:", error);
      // Handle the error as needed
    }
  };

  const handleSearch = () => {
    navigation.navigate("LOL Search User");
  };

  const handleImageSelection = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setThumbnail(pickerResult.uri);
    }
  };

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="location-on" size={20} color="#FF5733" />
        <Text style={styles.headerText}>{currentLocation}</Text>
      </View>
      <View style={styles.midContainer}>
        <Image source={require("../assets/LOGO.png")} style={styles.logo} />

        {/* Account Information */}
        <View style={styles.accountInfo}>
          <View style={styles.accountTextContainer}>
            <Text style={styles.mainText}>Create</Text>
            <Text style={[styles.mainText, { color: "#FB7E3C" }]}>Post</Text>
          </View>
          {/* Profile Picture Icon */}
          <Image
            source={require("../assets/NU.jpg")}
            style={styles.RightpfpContainer}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Location</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={place} // Use location if set, otherwise use currentLocation
                onChangeText={(text) => setPlace(text)}
              />
            </View>
          </View>

          <View style={styles.thumbnailContainer}>
            <Text style={styles.thumbnailText}>Image</Text>
            <TouchableOpacity
              style={styles.thumbnailBox}
              onPress={handleImageSelection}
            >
              {thumbnail ? (
                <Image
                  source={{ uri: thumbnail }}
                  style={styles.thumbnailImage}
                />
              ) : (
                <>
                  <View style={styles.addIcon}>
                    <Text style={styles.imageplus}>+</Text>
                  </View>
                  <Text style={styles.addImageText}>Add image to post</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.Detailscontainer}>
            <Text style={styles.titleText}>Caption</Text>
            <TextInput
              style={styles.detailinput}
              multiline
              numberOfLines={5}
              placeholder="Write a caption..."
              value={description}
              onChangeText={handleDescriptionChange}
            />
          </View>
        </ScrollView>

        {/* Create Itinerary Button */}
        <TouchableOpacity style={styles.createButton} onPress={handlepublish}>
          <Text style={styles.createButtonText}>Publish Post</Text>
        </TouchableOpacity>

        <Text style={{ marginBottom: 45 }}>&copy; 2024 TripAid</Text>
      </View>
      <View style={styles.footer}>
        {/* Footer Container */}
        <View style={styles.footerContainer}>
          {/* Home */}
          <TouchableOpacity style={styles.footerItem} onPress={handleHome}>
            <MaterialIcons name="home" size={32} color="#FFF" />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>

          {/* Search user */}
          <TouchableOpacity style={styles.footerItem} onPress={handleSearch}>
            <MaterialIcons name="search" size={32} color="#FFF" />
            <Text style={styles.footerText}>Search</Text>
          </TouchableOpacity>

          {/* Middle Circle */}
          <TouchableOpacity style={styles.middleCircle} onPress={handleCreate}>
            <View style={styles.circle}>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>

          {/* POI */}
          <TouchableOpacity style={styles.footerItem} onPress={handlePOI}>
            <MaterialIcons name="place" size={32} color="#FFF" />
            <Text style={styles.footerText}>POI</Text>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity style={styles.footerItem} onPress={handleProfile}>
            <MaterialIcons name="person" size={32} color="#FFF" />
            <Text style={styles.footerText}>More</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: "80%", // Adjust the maximum width as needed
  },
  subText: {
    fontSize: 12,
    color: "#6C7A9C",
    flexWrap: "wrap",
    maxWidth: "80%", // Adjust the maximum width as needed
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -40,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 20,
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
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
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
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  thumbnailBox: {
    width: 350,
    height: 120,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailImage: {
    width: 119,
    height: 116,
    borderRadius: 28,
  },
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageplus: {
    color: "#093D89",
    fontSize: 40,
  },
  addImageText: {
    color: "#6C7A9C",
    fontSize: 14,
    marginTop: 5,
  },
  Detailscontainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  detailinput: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 8,
    padding: 10,
    width: 350,
    height: 130,
  },
});

export default LOLNewPostScreen;
