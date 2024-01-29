import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";

const BOProfilePage = () => {
  const { user } = useAppContext();
  const navigation = useNavigation(); // Initialize the navigation object
  const [location, setLocation] = useState("");

  const [listings, setListings] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const fetchListings = async () => {
    try {
      // Reference to the "posts" collection
      const reviewCollection = collection(db, "listings"); // Replace 'db' with your Firestore database reference
      const reviewQuery = query(
        reviewCollection,
        where("userId", "==", user.id)
      );

      const querySnapshot = await getDocs(reviewQuery);

      // Format fetched reviews into the desired structure
      const formattedReviews = [];
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const formattedReview = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: require("../assets/typebo.jpg") || reviewData.thumbnail,
          pfp: require("../assets/LOL.jpg"),
          username: reviewData.username,
          timeposted: reviewData.crated,
          location: reviewData.location,
          business: reviewData.business,
          title: reviewData.title,
          description: reviewData.description,
          likes: reviewData.likes || 0,
        };
        formattedReviews.push(formattedReview);
      });

      // Update state with the formatted reviews
      setListings(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle the error as needed
    }
  };

  const fetchPromos = async () => {
    try {
      // Reference to the "posts" collection
      const reviewCollection = collection(db, "promos"); // Replace 'db' with your Firestore database reference
      const reviewQuery = query(
        reviewCollection,
        where("userId", "==", user.id)
      );

      const querySnapshot = await getDocs(reviewQuery);

      // Format fetched reviews into the desired structure
      const formattedReviews = [];
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const formattedReview = {
          id: doc.id, // Use the document ID as the review ID
          imageSource:
            require("../assets/iflystudent.jpg") || reviewData.thumbnail,
          title: reviewData.title,
          description: reviewData.description,
          promocode: reviewData.promo,
        };
        formattedReviews.push(formattedReview);
      });

      // Update state with the formatted reviews
      setPromotions(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchListings();
    fetchPromos();
  }, []);

  const handleViewReview = () => {
    navigation.navigate("Business Owner View Review");
  };

  const handleViewTrail = () => {
    navigation.navigate("LOL View Trail");
  };

  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewImage: require("../assets/iflyreview.png"),
      title: "Super fun experience!!!",
      Rating: "4.8/5",
    },
    {
      id: 2,
      reviewImage: require("../assets/iflyreview2.jpg"),
      title: "Would Visit Again",
      Rating: "4.5/5",
    },
    {
      id: 3,
      reviewImage: require("../assets/iflyreview3.jpg"),
      title: "Not the best time :(",
      Rating: "2/5",
    },
    // Add more review objects as needed
  ]);

  const [followers, setFollowers] = useState(10000); // Replace followers with useState
  const [following, setFollowing] = useState(287); // Replace following with useState
  const [activeTab, setActiveTab] = useState("Listings"); // Track the active tab

  // Function to format numbers over 10,000 as 10k or 10m
  const formatNumber = (num) => {
    if (num >= 10000 && num < 1000000) {
      return (num / 1000).toFixed(0) + "k";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "m";
    }
    return num;
  };

  // Update followers and following states
  useEffect(() => {
    const formattedFollowers = formatNumber(followers);
    const formattedFollowing = formatNumber(following);

    setFollowers(formattedFollowers);
    setFollowing(formattedFollowing);
  }, [followers, following]);

  //each tab shows what content
  const renderContent = () => {
    if (activeTab === "Listings") {
      return (
        <View style={styles.listingsContainer}>
          {listings.map((listing) => (
            <View key={listing.id} style={styles.listingItem}>
              <Image style={styles.listingImage} source={listing.imageUrl} />
              <View style={styles.listingStats}>
                {/* Additional listing details */}
                <View style={styles.listingActions}></View>
                <Text style={styles.titleContainer}>{listing.title}</Text>
                <View style={styles.descriptionContainer}>
                  <Text>{listing.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === "Reviews") {
      return (
        <View style={styles.reviewsContainer}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewContent}>
                <Image source={review.reviewImage} style={styles.reviewImage} />
                <View style={styles.reviewText}>
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                  <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={handleViewReview}
                  >
                    <Text style={styles.viewContentText}>View More</Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#FB7E3C"
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.locationLink}>Rating: {review.Rating}</Text>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === "Promotions") {
      return (
        <View style={styles.promotionsContainer}>
          {promotions.map((promotion) => (
            <View key={promotion.id} style={styles.promotionsTopLine}>
              <View style={styles.promotionsContent}>
                <View style={styles.promotionsColumn}>
                  <Text style={styles.promotionsTitle}>{promotion.title}</Text>
                  <Text style={styles.promotionsDescription}>
                    {promotion.description}
                  </Text>
                  <Text style={styles.promocode}>{promotion.promocode}</Text>
                </View>
                <View style={styles.promotionsColumn}>
                  <Image
                    source={promotion.imageSource}
                    style={styles.promotionsImage}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }
  };

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.followCounts}>
          <View style={styles.followCountsinner}>
            <Text style={styles.followCountNumber}>{followers}</Text>
            <Text style={styles.followText}>Followers</Text>
          </View>
          <Image
            style={styles.profileImage}
            source={require("../assets/ifly.jpg")}
          />
          <View style={styles.followCountsinner}>
            <Text style={styles.followCountNumber}>{following}</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{user.username} </Text>
            {/* Verified user icon */}
            <MaterialIcons name="verified" size={20} color="#030D45" />
          </View>
        </View>
      </View>

      {/* Toggle buttons */}
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Listings" && styles.activeButton,
          ]}
          onPress={() => setActiveTab("Listings")}
        >
          <Text style={styles.toggleButtonText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Promotions" && styles.activeButton,
          ]}
          onPress={() => setActiveTab("Promotions")}
        >
          <Text style={styles.toggleButtonText}>Promotions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Reviews" && styles.activeButton,
          ]}
          onPress={() => setActiveTab("Reviews")}
        >
          <Text style={styles.toggleButtonText}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Render content based on the active tab */}
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContentText: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  arrowContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  followCounts: {
    flexDirection: "row",
    alignItems: "center",
  },
  followText: {
    fontSize: 16,
    marginRight: 40,
    marginLeft: 40,
    color: "#030D45",
  },
  followCountsinner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  followCountNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    alignSelf: "center",
    marginTop: 10,
  },
  bio: {
    color: "#555",
    marginTop: 5,
    color: "#6C7A9C",
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  editProfileButton: {
    backgroundColor: "#030D45",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  editProfileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
  listingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  listingItem: {
    width: "48%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listingImage: {
    width: "100%",
    height: 200,
  },
  listingStats: {
    padding: 10,
  },
  listingActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleContainer: {
    fontSize: 15,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  toggleButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#030D45",
  },
  toggleButtonText: {
    fontWeight: "bold",
    color: "#030D45",
  },
  activeButton: {
    backgroundColor: "#6C7A9C",
  },

  promotionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  promotionsTopLine: {
    borderTopWidth: 1,
    borderTopColor: "#6C7A9C",
    marginBottom: 10,
  },
  promotionsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  promotionsColumn: {
    flex: 1,
  },
  promotionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
  },
  promotionsSubtitle: {
    color: "#6C7A9C",
    marginBottom: 10,
  },
  promotionsImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  reviewsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reviewItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  reviewText: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
  },
  locationLink: {
    color: "#030D45",
    fontWeight: "600",
    marginTop: 5, // Add margin top for spacing
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    marginTop: 10,
  },

  saveCancelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#030D45",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
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
  promocode: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: "80%", // Adjust the maximum width as needed
    marginVertical: 28,
  },
});

export default BOProfilePage;
