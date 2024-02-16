import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import { collection, query, doc, getDocs, where } from "firebase/firestore/lite";
import { useRoute } from '@react-navigation/native';



const NUBookingHistoryScreen = () => {
  const { user } = useAppContext();
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

  const handleHome = () => {
    navigation.navigate("Normal User");
  };

  const handlePOI = () => {
    navigation.navigate("Normal User POI");
  };

  const handleProfile = () => {
    navigation.navigate("Normal User More");
  };

  const handleSearchMain = () => {
    navigation.navigate('Normal User Search User');
  }
  
  const handleCreate = () => {
    navigation.navigate('Normal User Create');
  };

  const handleViewContent = (item) => {
    return () => {
      navigation.navigate("Normal User View Booking",  { bookingData: item, documentId: item.documentId });
    };
  };

  const handleViewHistoryContent = (item) => {
    return () => {
      navigation.navigate("Normal User View History Booking",  { bookingData: item, documentId: item.documentId });

    };
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [filteredBookingData, setFilteredBookingData] = useState([]);
  const [filteredHistoryData, setFilteredHistoryData] = useState([]);

  const fetchBooking = async () => {
    try {
      // Reference to the "bookings" collection
      const bookingCollections = collection(db, "bookings");
      const bookingQuery = query(
        bookingCollections,
        where("userId", "==", user.id)
      );
  
      const querySnapshot = await getDocs(bookingQuery);
  
      // Format fetched bookings into the desired structure
      const currentBookings = [];
      const pastBookings = [];
      
      // Get the current date
      const getCurrentDateFormatted = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = months[currentDate.getMonth()];
        const currentDay = currentDate.getDate();
        return `${currentMonth} ${currentDay}, ${currentYear}`;
      };
  
      const currentDate = getCurrentDateFormatted();
      console.log("Current Date:", currentDate);
  
      querySnapshot.forEach((doc) => {
        const bookingData = doc.data();
        bookingData.documentId = doc.id; // Include the documentId in bookingData

        
        // Array of field names representing possible booking dates
        const dateFields = ["date", "checkin", "startdate"];
        let bookingDate = null;

        // Iterate through each field name to find a valid booking date
        for (const field of dateFields) {
          if (bookingData[field] && bookingData[field].seconds) {
              const seconds = bookingData[field].seconds;
              bookingDate = new Date(seconds * 1000); // Convert seconds to milliseconds
              console.log(`${field} Date:`, bookingDate);

              // Format booking date into "Month Day, Year" format
              const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              const bookingMonth = months[bookingDate.getMonth()];
              const bookingDay = bookingDate.getDate();
              const bookingYear = bookingDate.getFullYear();
              const formattedBookingDate = `${bookingMonth} ${bookingDay}, ${bookingYear}`;
              console.log("Formatted Booking Date:", formattedBookingDate);
              bookingData.formattedBookingDate = formattedBookingDate;

              break; // Exit loop if a valid booking date is found
          }
      }
  
      if (bookingDate) {
        if (bookingDate >= new Date()) {
            // If the booking date is today or in the future, add it to current bookings
            currentBookings.push(bookingData);
        } else {
            // If the booking date is in the past, add it to past bookings
            pastBookings.push(bookingData);
        }
        }
      });
  
      // Set the state variables for current bookings and past bookings
      setBookingData(currentBookings);
      setHistoryData(pastBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleSearch = () => {
    try {
      if (searchQuery.trim() === "") {
        setFilteredBookingData([]);
        setFilteredHistoryData([]);
        return;
      }
  
      const filteredBookings = bookingData.filter(
        (item) =>
          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.accommodation && item.accommodation.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  
      const filteredHistory = historyData.filter(
        (item) =>
          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.accommodation && item.accommodation.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  
      setFilteredBookingData(filteredBookings);
      setFilteredHistoryData(filteredHistory);
    } catch (error) {
      console.error("Error searching bookings:", error);
    }
  };
  


  const handleNewBooking = () => {
    navigation.navigate("Normal User Booking Page"); // Navigate to SignUp screen on button press
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
            <Text style={styles.mainText}>Booking</Text>
            <Text style={[styles.mainText, { color: "#FB7E3C" }]}>History</Text>
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

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialIcons
            name="search"
            size={20}
            color="#757575"
            style={styles.searchIcon}
          />
<TextInput
  style={styles.searchInput}
  placeholder="Search Bookings"
  placeholderTextColor="#757575"
  value={searchQuery}
  onChangeText={(text) => setSearchQuery(text)}
  onSubmitEditing={handleSearch} // Trigger search on Enter press
/>
        </View>

        <TextInput style={styles.secondaryText}>Current Bookings</TextInput>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mapping through filteredBookingData array */}
          {(searchQuery.trim() === "" ? bookingData : filteredBookingData)
            .length > 0 ? (
            (searchQuery.trim() === "" ? bookingData : filteredBookingData).map(
              (item, index) => (
                <View
                  key={index}
                  style={[
                    styles.itineraryContainer,
                    { backgroundColor: "#E5F4FF" },
                  ]}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.location}</Text>
                    <Text style={styles.subText}>BookingID: {item.documentId}</Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.arrowContainer}
                      onPress={handleViewContent(item)}
                    >
                      <Text style={styles.viewContentText}>View Booking</Text>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="#FB7E3C"
                        style={{ marginTop: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            )
          ) : (
            <Text style={styles.noDataText}>
              {searchQuery.trim() === ""
                ? "No bookings found"
                : "No bookings found"}
            </Text>
          )}
        </ScrollView>

        <TextInput style={styles.secondaryText}>
          Past Transactions/Bookings
        </TextInput>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mapping through filteredHistoryData array */}
          {(searchQuery.trim() === "" ? historyData : filteredHistoryData)
            .length > 0 ? (
            (searchQuery.trim() === "" ? historyData : filteredHistoryData).map(
              (item, index) => (
                <View
                  key={index}
                  style={[
                    styles.itineraryContainer,
                    { backgroundColor: "#FFF6ED" },
                  ]}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.location}</Text>
                    <Text style={styles.subText}>BookingID: {item.documentId}</Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.arrowContainer}
                      onPress={handleViewHistoryContent(item)}
                    >
                      <Text style={styles.viewContentText}>View Booking</Text>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="#FB7E3C"
                        style={{ marginTop: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            )
          ) : (
            <Text style={styles.noDataText}>
              {searchQuery.trim() === ""
                ? "No history found"
                : "No history found"}
            </Text>
          )}
        </ScrollView>

        {/* Business Category Button */}
        <TouchableOpacity style={styles.ReqButton} onPress={handleNewBooking}>
          <Text style={styles.ReqButtonText}>New Booking</Text>
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
          <TouchableOpacity
            style={styles.footerItem}
            onPress={handleSearchMain}
          >
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

  ReqButton: {
    backgroundColor: "#030D45",
    borderRadius: 5,
    height: 50,
    width: 320,
    marginBottom: 30,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  ReqButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  noDataText: {
    marginTop: 10,
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    marginBottom: 5,
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
  secondaryText: {
    fontSize: 18,
    color: "#FB7E3C",
    fontWeight: "500",
    marginTop: 5,
  },

  userListContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  userList: {
    flexGrow: 0,
  },
  noUserText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  rightColumn: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  columnItem: {
    marginBottom: 10,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  columnTextBold: {
    color: "#0A2753",
    fontSize: 24,
    fontWeight: "bold",
  },
  columnTextExtraLarge: {
    color: "#FB7E3C",
    fontSize: 28,
  },

  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flex: 1,
  },
  userIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flex: 1,
  },
  userIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },

  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flex: 1,
  },
  followButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#FB7E3C",
    color: "#FFF",
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
    width: "73%", // 70% width for the text details
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: "70%", // Adjust the maximum width as needed
  },
  subText: {
    fontSize: 8,
    color: "#6C7A9C",
    flexWrap: "wrap",
    maxWidth: "80%", // Adjust the maximum width as needed
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -40,
    width: "40%", // 30% width for the image
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
    marginBottom: 5,
  },
  arrowContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 10,
    flexDirection: "row",
  },
});

export default NUBookingHistoryScreen;
