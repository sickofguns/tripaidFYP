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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";

const NUAccomodationBookingScreen = () => {
  const { user } = useAppContext();
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [location, setLocation] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationLocations, setAccommodationLocations] = useState({});

  

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
      }z
    };

    fetchLocation();

    // Fetch accommodations from Firestore
    const fetchAccommodations = async () => {
      try {
        const accommodationsRef = collection(db, "users");
        const querySnapshot = await getDocs(accommodationsRef);

        const fetchedAccommodations = [];
        const fetchedAccommodationLocations = {};

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.category === "Accommodation") {
            fetchedAccommodations.push({ label: userData.username, value: userData.username });
            fetchedAccommodationLocations[userData.username] = userData.address;
          }
        });

        setAccommodations(fetchedAccommodations);
        setAccommodationLocations(fetchedAccommodationLocations);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    // Call the fetchAccommodations function
    fetchAccommodations();
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

  const handleSearch = () => {
    navigation.navigate('Normal User Search User');
  };

  const handleCreate = () => {
    navigation.navigate('Normal User Create');
  };

  // Update the place state based on the selected attraction
  const handleAttractionChange = (itemValue) => {
    setSelectedAccommodation(itemValue);
    setPlace(accommodationLocations[itemValue]);
  };

  const [selectedAccommodation, setSelectedAccommodation] = useState(
    "Select Accomodation"
  );

  const [place, setPlace] = useState("");

  const [checkindate, setCheckindate] = useState();
  const [checkoutdate, setCheckoutdate] = useState();
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState(null);
  const [rooms, setRooms] = useState("");
  const [remark, setRemark] = useState("");
  const [promo, setPromo] = useState("");

  const isValidPromo = (promo) => {
    // Your validation logic for promo code here
    // For example, a simple check for a non-empty string
    return /^$|^[0-9]+$/.test(promo); //numbers only / blanks
  };

  const handlebooking = async () => {
    if (!selectedAccommodation || !place || !checkindate || !checkoutdate || !adults || !rooms ) {
        // If any required field is empty, show an alert message and return early
        Alert.alert("Please fill in all the required fields.");
        return;
    }

// If promo is provided, validate it
if (promo && !isValidPromo(promo)) {
  // If the promo code is invalid, show an alert message and return early
  Alert.alert("Invalid promo code. Please try again.");
  return;
}
      try {
        console.log("Location:", place);
        console.log("Checkin:", checkindate);
        console.log("Checkout:", checkoutdate);
        console.log("No. of Adults:", adults);
        console.log("No. of Children:", children);
        console.log("Rooms", rooms);
        console.log("Promo:", promo);
        console.log("Remarks:", remark);

        const usersRef = collection(db, "users");
        const userQuerySnapshot = await getDocs(usersRef);

        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Check if the user is a business and if the businessname matches the selectedAccommodation
          if (userData.username === selectedAccommodation) {
              businessId = doc.id; // Retrieve the id of the business
          }
      });
        
        // Create a new post object with the required fields
        const bookData = {
          category: 'Accommodation',
          businessname: selectedAccommodation,
          businessId: businessId, // Add the businessId to the booking data
          location: place,
          checkin: checkindate,
          checkoutdate: checkoutdate,
          adults: adults,
          children: children|| "",
          rooms: rooms,
          promo: promo || "",
          remark: remark || "", // Set remark to an empty string if not provided
          create: new Date(),
          userId: user.id,
        };

        // Add the booking data to Firestore
        const bookingCollection = collection(db, "bookings");
        await addDoc(bookingCollection, bookData);

        // Navigate to the booking confirmation page
        navigation.navigate("Normal User Booking Confirmation Page");
    } catch (error) {
        console.error("Error publishing booking:", error);
        // Handle the error as needed
    }
};


  
  const onChangeCheckIn = (event, selectedDate) => {
    const currentDate = selectedDate || checkindate;
    setShowCheckInPicker(false);
    setCheckindate(currentDate);
  };

  const onChangeCheckOut = (event, selectedDate) => {
    const currentDate = selectedDate || checkoutdate;
    setShowCheckOutPicker(false);
    setCheckoutdate(currentDate);
  };

  const showCheckInDatepicker = () => {
    setShowCheckInPicker(true);
  };

  const showCheckOutDatepicker = () => {
    setShowCheckOutPicker(true);
  };

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
            <Text style={styles.mainText}>
              Accommodation{"\n"}Booking
              <Text style={{ color: "#FB7E3C" }}> Screen</Text>
            </Text>
          </View>
          {/* Profile Picture Icon */}
          <Image
            source={require("../assets/NU.jpg")}
            style={styles.RightpfpContainer}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Accommodation</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={selectedAccommodation}
                onValueChange={handleAttractionChange}
                style={styles.dropdownBox}
                itemStyle={{ fontSize: 16, width: 350 }}
              >
                <Picker.Item
                  label="Select Accommodation"
                  value="Accommodation"
                />
                {accommodations.map((accommodation) => (
                  <Picker.Item
                    label={accommodation.label}
                    value={accommodation.value}
                    key={accommodation.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Location</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{place}</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Date</Text>
            <View style={styles.dateInputContainer}>
              <View style={styles.dateInput}>
                <Text style={styles.subTitle}>Check In Date</Text>
                <TouchableOpacity onPress={showCheckInDatepicker}>
                  <Text style={styles.input}>
                    {checkindate
                      ? checkindate.toLocaleDateString()
                      : "Select Check-in"}
                  </Text>
                </TouchableOpacity>
                {showCheckInPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={checkindate || new Date()} // Set a default date if not selected
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeCheckIn}
                  />
                )}
              </View>
              <View style={styles.dateInput}>
                <Text style={styles.subTitle}>Check Out Date</Text>
                <TouchableOpacity onPress={showCheckOutDatepicker}>
                  <Text style={styles.input}>
                    {checkoutdate
                      ? checkoutdate.toLocaleDateString()
                      : "Select Check-out"}
                  </Text>
                </TouchableOpacity>
                {showCheckOutPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={checkoutdate || new Date()} // Set a default date if not selected
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeCheckOut}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={styles.paxContainer}>
            <Text style={styles.paxText}>Pax</Text>
            <View style={styles.paxInputContainer}>
              <View style={styles.paxInput}>
                <Text style={styles.subTitle}>No. of Adults</Text>
                <Picker
                  selectedValue={adults}
                  onValueChange={(itemValue) => setAdults(itemValue)}
                  style={styles.dropdownBox}
                  itemStyle={{ fontSize: 16 }}
                >
                  {[...Array(20)].map((_, index) => (
                    <Picker.Item
                      label={`${index}`}
                      value={`${index}`}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.paxInput}>
                <Text style={styles.subTitle}>No. of Children</Text>
                <Picker
                  selectedValue={children}
                  onValueChange={(itemValue) => setChildren(itemValue)}
                  style={styles.dropdownBox}
                  itemStyle={{ fontSize: 16 }}
                >
                  {[...Array(21)].map((_, index) => (
                    <Picker.Item
                      label={`${index}`}
                      value={`${index}`}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.roomsContainer}>
            <Text style={styles.roomsText}>No. of Rooms</Text>
            <View style={styles.roomsInputContainer}>
              <Picker
                selectedValue={rooms}
                onValueChange={(itemValue) => setRooms(itemValue)}
                style={styles.dropdownBox}
                itemStyle={{ fontSize: 16, width: 345 }}
              >
                {[...Array(10)].map((_, index) => (
                  <Picker.Item
                    label={`${index}`}
                    value={`${index}`}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.promoContainer}>
            <Text style={styles.promoText}>Promo</Text>
            <TextInput
              style={styles.promoInput}
              placeholder="Input Promo (if any else leave blank)"
              value={promo}
              onChangeText={(text) => setPromo(text)}
            />
          </View>

          <View style={styles.remarkContainer}>
            <Text style={styles.remarkText}>Remarks</Text>
            <TextInput
              style={styles.remarkInput}
              multiline
              numberOfLines={5}
              placeholder="Add remarks (if any)"
              value={remark}
              onChangeText={(text) => setRemark(text)}
            />
          </View>
        </ScrollView>

      


        {/* Create Itinerary Button */}
        <TouchableOpacity style={styles.createButton} onPress={handlebooking}>
          <Text style={styles.createButtonText}>Book</Text>
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
    marginBottom: 10,
    height: 70, // Increased height for better alignment
  },
  accountTextContainer: {
    flexDirection: "column",
    marginLeft: 10, // Adjust margin as needed
  },
  mainText: {
    color: "#0A2753", // Change the color to match your desired color
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
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
    width: 350, // Set the width to 350 pixels
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
    overflow: "hidden", // Hide the content that overflows from the container
  },
  picker: {
    width: "100%", // Occupy full width of the container
  },
  input: {
    padding: 10,
    width: 350,
  },
  dropdownBox: {
    width: "100%",
    height: 35,
    borderRadius: 5,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
    fontSize: 16, // Update the font size to 18
  },

  dateContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    width: "48%",
  },

  paxContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  paxText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  paxInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paxInput: {
    width: "48%",
  },
  subTitle: {
    fontSize: 16,
    color: "#6C7A9C",
    marginBottom: 5,
    fontWeight: "bold",
  },
  roomsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  roomsText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  roomsInputContainer: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
  },
  remarkContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  remarkText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  remarkInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
    width: 350,
    height: 130,
  },
  promoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  promoText: {
    fontSize: 18,
    color: "#0A2753",
    marginBottom: 5,
    fontWeight: "bold",
  },
  promoInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
    width: 350,
  },
});

export default NUAccomodationBookingScreen;
