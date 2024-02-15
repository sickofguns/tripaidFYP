import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

const LOLItineraryScreen = () => {
  const { user } = useAppContext();
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [location, setLocation] = useState("");

  const [itineraries, setItineraries] = useState([]);

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

  const handleViewContent = (item) => {
    navigation.navigate("LOL View Itinerary", { itinerary: item});
  };

  const handleHome = () => {
    navigation.navigate("LOL");
  };

  const handlePOI = () => {
    navigation.navigate("LOL POI");
  };

  const handleProfile = () => {
    navigation.navigate("LOL More");
  };

  const handlecreateiti = () => {
    navigation.navigate("LOL Create Itinerary"); // Navigate to SignUp screen on button press
  };

  const handleCreate = () => {
    navigation.navigate('LOL Create');
  };

  const handleSearch = () => {
    navigation.navigate("LOL Search User");
  };

  const fetchItineries = async () => {
    try {
      const itinerariesCollection = collection(db, "itineraries");

      const itinerariesQuery = query(
        itinerariesCollection,
        where("userId", "==", user.id)
      );

      const querySnapshot = await getDocs(itinerariesQuery);

      const formatted = [];
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const i = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: { uri: reviewData.thumbnail },
          title: reviewData.title,
          description: reviewData.description,
        };
        formatted.push(i);
      });

      setItineraries(formatted);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchItineries();
  }, []);

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
            <Text style={styles.mainText}>Your</Text>
            <Text style={[styles.mainText, { color: "#FB7E3C" }]}>
              Itinerary
            </Text>
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
          {/* Mapping through itineraryData array */}
          {itineraries.map((item, index) => (
          <View key={index} style={styles.line}>
            <View style={styles.itineraryContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subText}>{item.description}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image source={item.imageUrl} style={styles.image} />
                <TouchableOpacity
                  style={styles.arrowContainer}
                  onPress={() => handleViewContent(item)}
                >
                  <Text style={styles.viewContentText}>View Full Content</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#FB7E3C"
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        </ScrollView>

        {/* Create Itinerary Button */}
        <TouchableOpacity style={styles.createButton} onPress={handlecreateiti}>
          <Text style={styles.createButtonText}>Create Itinerary</Text>
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
      paddingHorizontal: 20,
      paddingTop: 20,
      flexDirection: 'row',
      
    },
    line: {
      width: 350,
      borderTopWidth: 3,
      borderTopColor: '#6C7A9C',
      marginTop: 5,
      marginBottom:5,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    textContainer: {
      marginBottom: 10,
      flexDirection: 'column',
      maxWidth: 350,
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
      maxHeight: "60%",
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
      marginBottom: 5,
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

export default LOLItineraryScreen;
