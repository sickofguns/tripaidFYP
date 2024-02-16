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
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, getDocs, doc, query, where} from "firebase/firestore/lite";

const UpgradetoLOLScreen = () => {
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
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleHome = () => {
    navigation.navigate("Normal User");
  };

  const handlePOI = () => {
    navigation.navigate("Normal User POI");
  };

  const handleProfile = () => {
    navigation.navigate("Normal User More");
  };

  const handleCU = () => {
    navigation.navigate("Contact Us");
  };

  const handleApply = async () => {
    try {
      // Add this line to log the user object
      console.log("User ID:", user.id);
  
      const usersDB = collection(db, "users");
  
      // Check if user object and uid are available
      if (!user || !user.id) {
        console.error("User ID is missing or undefined.");
      } else if (!description) {
        alert("Please fill in all required fields (About yourself) before applying.");
        return;
      }
  
      const userId = user.id;
      const docRef = doc(usersDB, userId);
  
      // Use the 'description' state variable instead of an undefined variable
      await updateDoc(docRef, {
        description: description,
        verify: false,
        pending: true,
        lol: true,
      });
  
      // Additional actions after updating the database, if needed
      openDealsModal();
    } catch (error) {
      console.error("Error updating database:", error);
      // Handle the error as needed
    }
  };
  

  const togglePolicy = () => {
    setPolicy(!policy);
  };

  const [policy, setPolicy] = useState(false);
  const [agreeerror, setAgreeError] = useState(false);
  const [showDealsModal, setShowDealsModal] = useState(false);

  const openDealsModal = () => {
    setShowDealsModal(true);
  };

  const closeDealsModal = () => {
    setShowDealsModal(false);
  };

  const handleAgree = () => {
    if (!policy) {
      setAgreeError("You must accept the terms and conditions.");
      return;
    }

    console.log("Policy: ", policy);
    closeDealsModal();
    navigation.navigate("Application Received");
    setAgreeError(true);
  };

  const handleSearch = () => {
    navigation.navigate("Normal User Search User");
  };

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (text) => {
    setDescription(text);
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
            <Text style={styles.mainText}>Apply to be an LOL</Text>
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
          {/* Added text */}
          <Text style={styles.shareText}>
            Welcome aboard! 🌟 As a Local Opinion Leader, {"\n"}your voice
            matters. Tell us about yourself and {"\n"}why your perspective is a
            game-changer in your community. Share your passions, local insights,{" "}
            {"\n"}and what makes you a leader of opinion. {"\n\n"}
            Let's make a difference together! 💬🌍 {"\n\n"}
            Best, {"\n"}
            TripAid Team.
          </Text>
          <Text style={styles.reviewText}>*Application will be reviewed.</Text>

          <View style={styles.Detailscontainer}>
            <Text style={styles.titleText}>About yourself</Text>
            <TextInput
              style={styles.detailinput}
              multiline
              numberOfLines={5}
              placeholder="Enter details/description"
              value={description}
              onChangeText={handleDescriptionChange}
            />
          </View>
        </ScrollView>

        {/* Create Itinerary Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleApply}>
          <Text style={styles.createButtonText}>Apply</Text>
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
          <TouchableOpacity style={styles.middleCircle}>
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

      {/* Deals Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDealsModal}
        onRequestClose={closeDealsModal} // Add this line
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="people" size={30} color="#FB7E3C" />
              <Text style={styles.modalHeaderText}>Wanna Become LOL?</Text>
              <Text style={styles.modaltext}>Terms and Conditions</Text>
            </View>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.policy}>
                By enrolling as a Local Opinion Leader (LOL), you willingly
                commit to actively engage in providing insightful feedback,
                reviews, and well-considered opinions pertaining to local
                services, businesses, or events. To qualify, adherence to
                specific criteria is essential, with a paramount emphasis on
                maintaining honesty and integrity throughout your contributions.
                Recognizing the importance of confidentiality, rigorous measures
                are in place to safeguard the anonymity of LOLs when expressing
                their viewpoints. In appreciation of your valuable input,
                incentives or rewards may be extended based on predetermined
                conditions set by the program administrators. Enrolled LOLs are
                expected to strictly adhere to a defined code of conduct,
                placing a premium on respectful communication and exercising
                prudence to avoid potential conflicts of interest. Violations of
                the prescribed terms, instances of inappropriate behavior, or
                prolonged periods of inactivity may result in the revocation of
                LOL status. The feedback shared by enrolled LOLs holds the
                potential for diverse applications, and any modifications to
                these terms will be promptly communicated to ensure
                transparency. Implicit in the act of enrolling in this program
                is the unequivocal acceptance of these terms and an unwavering
                commitment to compliance with all pertinent laws and regulations
                governing such endeavors. For any inquiries or concerns, our
                dedicated support team is ready to assist and address your
                queries. Your enrollment in this program not only signifies an
                endorsement of these terms but also serves as a pledge to
                contribute responsibly to the local community.
              </Text>
            </View>

            <TouchableOpacity
              onPress={togglePolicy}
              style={styles.rememberMeContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: policy ? "#ABAAAA" : "#F4F4F4",
                    borderWidth: policy ? 0 : 1,
                  },
                ]}
              >
                {policy && (
                  <MaterialIcons name="check" size={14} color="#FFF" />
                )}
              </View>
              <Text style={styles.agreeText}>
                I Accept the Terms & Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.DealsignUpButton}
              onPress={() => handleAgree({ onClose: closeDealsModal })}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>

            {agreeerror !== "" && (
              <Text style={styles.agreeerrorText}>{agreeerror}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeDealsModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    color: "#0A2753",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  RightpfpContainer: {
    width: 65,
    height: 65,
    borderRadius: 60,
    resizeMode: "cover",
    marginLeft: 85,
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
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    marginBottom: 15,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
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
  plus: {
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
    height: 200,
  },

  congratsText: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
    marginTop: 30,
  },
  shareText: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
    marginTop: 25,
  },
  reviewText: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#030D45",
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
  },
  modalHeaderText: {
    color: "#FB7E3C",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 8,
  },
  modaltext: {
    color: "#FB7E3C",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalInnerContainer: {
    width: 340,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 10,
    flexGrow: 1,
  },
  policy: {
    color: "#000",
    fontSize: 13,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    textAlign: "justify",
  },
  agreeerrorText: {
    color: "red",
    marginTop: 15,
  },
  DealsignUpButton: {
    backgroundColor: "#FB7E3C",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  rememberMeContainer: {
    // Styles for the Remember me container
    flexDirection: "row",
    alignItems: "center",
    marginRight: 100,
    marginTop: 10,
  },
  checkbox: {
    // Styles for the checkbox
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "#7A7A7A",
    marginLeft: 90,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rememberText: {
    // Styles for the Remember text
    fontSize: 16,
    color: "#7A7A7A",
    marginLeft: 10,
  },
  agreeText: {
    // Styles for the Remember text
    fontSize: 16,
    color: "#7A7A7A",
    marginLeft: 5,
  },
});

export default UpgradetoLOLScreen;
