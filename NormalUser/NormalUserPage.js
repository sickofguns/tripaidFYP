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
import * as Location from "expo-location";

import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";

const NormalUserScreen = () => {
  const [currentLocation, setCurrentLocation] = useState("Loading..."); // Initialize with a loading message
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Posts"); // Track the active tab
  const [rerenderFlag, setRerenderFlag] = useState(false);
  // Assuming posts are fetched and stored in this array
  //////////////////////////////////////////////////////////////////////////////////// post 
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trails, setTrails] = useState([]);

  const formatTimestamp = (timestamp) => {
    try {
      // Check if the timestamp is an object with seconds property
      if (timestamp && timestamp.seconds) {
        // Convert the seconds to milliseconds and create a Date object
        const dateObject = new Date(timestamp.seconds * 1000);
  
        // Format the date
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
  
        return dateObject.toLocaleDateString(undefined, options);
      } else {
        console.log("Invalid timestamp format:", timestamp);
        throw new Error('Invalid timestamp format');
      }
    } catch (error) {
      console.error("Error parsing timestamp:", error);
      return "Invalid Date";
    }
  };

  const fetchPosts = async () => {
    try {
      // Reference to the "posts" collection
      const postsCollection = collection(db, "posts"); // Replace 'db' with your Firestore database reference

      // Get all documents in the "posts" collection
      const querySnapshot = await getDocs(postsCollection);

      // Format fetched posts into the desired structure
      const formattedPosts = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const formattedPost = {
          id: doc.id, // Use the document ID as the post ID
          imageUrl: postData.thumbnail || require("../assets/error.jpg") ,
          pfp: require("../assets/pfp.png"),
          username: postData.username,
          timeposted: formatTimestamp(postData.created),
          location: postData.location,
          caption: postData.description,
          likes: postData.likes,
          comments: postData.comments || [], // Use an empty array if comments field is missing
        };
        formattedPosts.push(formattedPost);
      });

      // Update state with the formatted posts
      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle the error as needed
    }
  };
//////////////////////////////////////////////////////////////////////////////////// review
  const fetchReviews = async () => {
    try {
      // Reference to the "reviews" collection
      const reviewsCollection = collection(db, "reviews"); // Replace 'db' with your Firestore database reference

      // Get all documents in the "reviews" collection
      const querySnapshot = await getDocs(reviewsCollection);

      // Format fetched reviews into the desired structure
      const formattedReviews = [];
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const formattedReview = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: reviewData.thumbnail || require("../assets/error.jpg"),
          pfp: require("../assets/pfp.png"),
          username: reviewData.username,
          timeposted: formatTimestamp(reviewData.created),
          location: reviewData.location,
          business: reviewData.business,
          title: reviewData.title,
          description: reviewData.description,
          likes: reviewData.likes || 0,
        };
        formattedReviews.push(formattedReview);
      });

      // Update state with the formatted reviews
      setReviews(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle the error as needed
    }
  };
  //////////////////////////////////////////////////////////////////////////////////// trail
  const fetchTrail = async () => {
    try {
      // Reference to the "reviews" collection
      const trailsCollection = collection(db, "trails"); // Replace 'db' with your Firestore database reference

      // Get all documents in the "reviews" collection
      const querySnapshot = await getDocs(trailsCollection);

      // Format fetched reviews into the desired structure
      const formattedTrails = [];
      querySnapshot.forEach((doc) => {
        const trailData = doc.data();
        const formattedTrail = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: trailData.thumbnail || require("../assets/error.jpg"),
          pfp: require("../assets/pfp.png"),
          username: trailData.username,
          timeposted: formatTimestamp(trailData.created),
          location: trailData.location,
          title: trailData.title,
          description: trailData.description,
          likes: trailData.likes || 0,
        };
        formattedTrails.push(formattedTrail);
      });

      // Update state with the formatted reviews
      setTrails(formattedTrails);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchPosts();
    fetchTrail();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////location

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

  ////////////////////////////////////////////////////////////////////////////////////

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
    navigation.navigate("Normal User Search User");
  };

  const handleCreate = () => {
    navigation.navigate("Normal User Create");
  };

  const handleViewTrail = () => {
    navigation.navigate("User Trail");
  };

  //////////////////////////////////////////////////////////////////////////////////// promo
  const promos = [
    {
      id: 1,
      image: require("../assets/Hiltonlandingpage.jpg"),
      deals: "$10 OFF",
      type: "Booking",
      valid: "Valid for 1 Year",
    },
    {
      id: 2,
      image: require("../assets/GBB.jpg"),
      deals: "25% OFF",
      type: "Booking",
      valid: "Valid for 6 Months",
    },
    {
      id: 3,
      image: require("../assets/JUMBO.jpg"),
      deals: "1 Free Crab",
      type: "Dine-in",
      valid: "Valid for 1 Month",
    },
    {
      id: 4,
      image: require("../assets/btvbag.jpg"),
      deals: "BOGO",
      type: "Bags only",
      valid: "Valid for 1 Month",
    },
  ];
  ////////////////////////////////////////////////////////////////////////////////////content
  //each tab shows what content
  const renderContent = () => {
    if (activeTab === "Posts") {
      return (
        <View style={styles.postsContainer}>
          {posts.map((post, index) => (
            <View key={post.id} style={styles.instagramPostContainer}>
              <Image style={styles.postImage} source={post.imageUrl} />

              <View style={styles.postContent}>
                <View style={styles.userInfo}>
                  <Image style={styles.userAvatar} source={post.pfp} />
                  <View>
                    <Text style={styles.userName}>{post.username}</Text>
                    <Text style={styles.postTime}>{post.timeposted}</Text>
                    <View style={styles.header}>
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#000"
                      />
                      <Text style={styles.postLocation}>{post.location}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.postTitle}>{post.caption}</Text>

                {/* Likes */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(index)}
                >
                  <MaterialIcons
                    name={likedPosts[index] ? "favorite" : "favorite-border"}
                    size={24}
                    color={likedPosts[index] ? "red" : "#333"}
                  />
                  <Text style={styles.interactionText}>Like</Text>
                </TouchableOpacity>

                {/* Comment section */}
                <View style={styles.commentSection}>
                  {/* Existing comments */}
                  {post.comments.map((comment, commentIndex) => (
                    <View key={`${commentIndex}-${rerenderFlag}`}>
                      <Text style={styles.commentText}>
                        {comment.username}: {comment.text}
                      </Text>
                    </View>
                  ))}

                  {/* Input field for adding new comments */}
                  <View style={styles.commentInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Add a comment..."
                      onChangeText={(text) => setNewComment(text)}
                      value={newComment}
                    />
                    <TouchableOpacity
                      style={styles.commentButton}
                      onPress={() => {
                        handleAddComment(newComment, post);
                        setNewComment(""); // Clear the input after adding the comment
                      }}
                    >
                      <Text style={styles.commentButtonText}>Comment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === "Reviews") {
      return (
        <View style={styles.postsContainer}>
          {reviews.map((review, index) => (
            <View key={review.id} style={styles.instagramPostContainer}>
              <Image style={styles.postImage} source={review.imageUrl} />
              <View style={styles.postContent}>
                <View style={styles.userInfo}>
                  <Image style={styles.userAvatar} source={review.pfp} />
                  <View>
                    <Text style={styles.userName}>{review.username}</Text>
                    <Text style={styles.postTime}>{review.timeposted}</Text>
                    <View style={styles.header}>
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#000"
                      />
                      <Text style={styles.postLocation}>
                        {" "}
                        {review.location}
                      </Text>
                    </View>
                    <View style={styles.header}>
                      <MaterialIcons name="business" size={14} color="#000" />
                      <Text style={styles.postLocation}>
                        {" "}
                        {review.business}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.postTitle}>{review.title}</Text>
                <Text style={styles.postDescription}>{review.description}</Text>

                {/* Likes */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(index)}
                >
                  <MaterialIcons
                    name={likedPosts[index] ? "favorite" : "favorite-border"}
                    size={24}
                    color={likedPosts[index] ? "red" : "#333"}
                  />
                  <Text style={styles.interactionText}>Like</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === "Trails") {
      return (
        <View style={styles.postsContainer}>
          {trails.map((trail, index) => (
            <TouchableOpacity
              key={trail.id}
              style={styles.instagramPostContainer}
              onPress={handleViewTrail}
            >
              <Image style={styles.postImage} source={trail.imageUrl} />
              <View style={styles.postContent}>
                <View style={styles.userInfo}>
                  <Image style={styles.userAvatar} source={trail.pfp} />
                  <View>
                    <Text style={styles.userName}>{trail.username}</Text>
                    <Text style={styles.postTime}>{trail.timeposted}</Text>
                    <View style={styles.header}>
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#000"
                      />
                      <Text style={styles.postLocation}>{trail.location}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.postTitle}>{trail.title}</Text>
                <Text style={styles.postDescription}>{trail.description}</Text>

                {/* Likes */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(index)}
                >
                  <MaterialIcons
                    name={likedPosts[index] ? "favorite" : "favorite-border"}
                    size={24}
                    color={likedPosts[index] ? "red" : "#333"}
                  />
                  <Text style={styles.interactionText}>Like</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (activeTab === "Promos") {
      return (
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <MaterialIcons name="whatshot" size={30} color="#FB7E3C" />
            <Text style={styles.modalHeaderText}>Exclusive Deals</Text>
          </View>

          <ScrollView>
            <View style={styles.scrollContainerPromo}>
              {promos.map((promo) => (
                <View style={styles.modalInnerContainer} key={promo.id}>
                  <View style={styles.halfCircleLeft}></View>
                  <View style={styles.halfCircleRight}></View>
                  <Image source={promo.image} style={styles.dealsImage} />
                  <View style={styles.dottedLine}></View>
                  <Text style={styles.dealsTop}>{promo.deals}</Text>
                  <Text style={styles.dealsMid}>{promo.type}</Text>
                  <Text style={styles.dealsBot}>
                    {promo.valid}
                    {"\n"}*T&C applies
                  </Text>

                  {/* Collect Button */}
                  <TouchableOpacity
                    style={styles.redeemButton}
                    onPress={() => handleCollect(promo.id, promo.deals)}
                    disabled={redeemedStates[promo.id] === "redeemed"} // Disable if already redeemed
                  >
                    <Text style={styles.redeemButtonText}>
                      {redeemedStates[promo.id] === "collected"
                        ? "Redeem"
                        : "Collect"}
                    </Text>
                  </TouchableOpacity>

                  {/* Redeem Button (conditionally rendered) */}
                  {redeemedStates[promo.id] == "collected" && (
                    <TouchableOpacity
                      style={styles.redeemButton}
                      onPress={() => confirmRedeem(promo.id, promo.deals)}
                      disabled={redeemedStates[promo.id] === "redeemed"} // Disable if already redeemed
                    >
                      <Text style={styles.redeemButtonText}>
                        {redeemedStates[promo.id] === "redeemed"
                          ? "Redeemed"
                          : "Redeem"}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {redeemedStates[promo.id] == "redeemed" && (
                    <TouchableOpacity
                      style={styles.redeemButton}
                      onPress={() => confirmRedeem(promo.id, promo.deals)}
                      disabled={redeemedStates[promo.id] === "redeemed"} // Disable if already redeemed
                    >
                      <Text style={styles.redeemButtonText}>
                        {redeemedStates[promo.id] === "redeemed"
                          ? "Redeemed"
                          : "Redeemed"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      );
    }
  };

////////////////////////////////////////////////////////////////////////////////////

const usersCollection = collection(db, 'users');

const fetchUsersFromDatabase = async () => {
  try {
    const usersCollection = collection(db, "users");

    let userQuery;

    {
      userQuery = query(
        usersCollection,
        where('type', '==', 'personal'),
      );
    }

    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(({ id }) => id !== user.id);

    // Update the local state with isSuspend and isBan properties
    setUserList((prevUsers) =>
      prevUsers.map((prevUser) => {
        const matchedUser = users.find((user) => user.id === prevUser.id);
        return matchedUser || prevUser;
      })
    );

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const { user } = useAppContext();

// Rest of your component code
  const [redeemedStates, setRedeemedStates] = useState({});

  const handleCollect = async (promoId, dealName) => {
    // Your collect logic goes here
  
    // Check if the user object is available and has a valid ID
    if (user && user.id) {
      // Update the state to mark this promo as collected
      setRedeemedStates((prevStates) => ({
        ...prevStates,
        [promoId]: "collected",
      }));
  
      try {
        // Update user's data in the database
        const userDocRef = doc(usersCollection, user.id);
        await updateDoc(userDocRef, {
          collected: true,
          redeemed: false,
        });
  
        // Show success message
        Alert.alert(
          "Collection Success",
          `You have successfully collected ${dealName}.`
        );
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    } else {
      console.error('Error updating user data: User ID is missing.');
    }
  };
  
  const handleRedeem = async (promoId, dealName) => {
    // Your redeem logic goes here
  
    // Check if the user object is available and has a valid ID
    if (user && user.id) {
      // Update the state to mark this promo as redeemed
      setRedeemedStates((prevStates) => ({
        ...prevStates,
        [promoId]: "redeemed",
      }));
  
      try {
        // Update user's data in the database
        const userDocRef = doc(usersCollection, user.id);
        await updateDoc(userDocRef, {
          redeemed: true,
        });
  
        // Show success message
        Alert.alert(
          "Redemption Success",
          `You have successfully redeemed ${dealName}.`
        );
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    } else {
      console.error('Error updating user data: User ID is missing.');
    }
  };
  

  const confirmRedeem = (promoId, dealName) => {
    if (redeemedStates[promoId] === "collected") {
      Alert.alert(
        "Confirm Redeeming",
        `Are you sure you want to redeem ${dealName} today?`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => handleRedeem(promoId, dealName),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));

  const handleLike = (index) => {
    const updatedLikes = [...likedPosts];
    updatedLikes[index] = !updatedLikes[index];
    setLikedPosts(updatedLikes);
  };

  // Define state to hold the comments for each post
  const [newComment, setNewComment] = useState("");

  // Assuming username is stored in state
  const [username, setUsername] = useState(user.username); // Set the initial username

  const handleAddComment = async (newComment, currPost) => {
    const newCommentObj = {
      userId: user.id,
      username: username,
      text: newComment,
    };
    const postsCollection = collection(db, "posts");

    const post = doc(postsCollection, currPost.id);

    await updateDoc(post, {
      comments: [...currPost.comments, newCommentObj],
    });

    setRerenderFlag(!rerenderFlag)
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoheader}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>
        <Image source={require("../assets/LOGO.png")} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.midContainer}>
          <Text style={styles.mainText}>Explore Page</Text>
          <Text style={styles.OtherselectText}>
            What do you want to explore?
          </Text>

          {/* Toggle buttons */}
          <View style={styles.toggleButtons}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "Posts" && styles.activeButton,
              ]}
              onPress={() => setActiveTab("Posts")}
            >
              <Text style={styles.toggleButtonText}>Posts</Text>
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
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "Trails" && styles.activeButton,
              ]}
              onPress={() => setActiveTab("Trails")}
            >
              <Text style={styles.toggleButtonText}>Trails</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "Promos" && styles.activeButton,
              ]}
              onPress={() => setActiveTab("Promos")}
            >
              <Text style={styles.toggleButtonText}>Promotions</Text>
            </TouchableOpacity>
          </View>

          {/* Render content based on the active tab */}
          {renderContent()}

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
          <Text style={{ marginBottom: 20 }}>&copy; 2024 TripAid</Text>
        </View>
      </ScrollView>
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
  OtherselectText: {
    color: "#0A2753",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  commentSection: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  commentButton: {
    paddingHorizontal: 10,
  },
  commentButtonText: {
    color: "#0066FF",
    fontWeight: "bold",
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
    paddingVertical: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 14,
    color: "#6A778B",
  },
  logoheader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 5,
    marginTop: 2,
  },
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

  midContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
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

  mainText: {
    color: "#093D89",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  instagramPostContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20,
    width: "100%",
  },
  postImage: {
    width: "auto",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postContent: {
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#555",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#888",
  },
  postLocation: {
    fontSize: 12,
    color: "#888",
  },
  postInteractions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  interactionText: {
    marginLeft: 5,
    color: "#333",
  },
  toggleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#030D45",
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeButton: {
    borderBottomColor: "#FB7E3C",
    borderBottomWidth: 5,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  scrollContainerPromo: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10, // Add some paddingBottom if needed
    width: 300,
  },
  fixedHeightContainer: {
    height: 490, // Adjust the height as needed
  },
  dealsImage: {
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    resizeMode: "cover",
    marginLeft: 30,
    marginTop: 25,
  },
  dottedLine: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "rgba(102, 102, 102, 0.2)",
    height: 85,
    width: 0,
    marginLeft: 110,
    marginTop: -75,
  },
  modalContent: {
    backgroundColor: "#030D45",
    borderRadius: 8,
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
    width: 300,
    height: 104,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  halfCircleLeft: {
    position: "absolute",
    left: -10,
    top: "50%",
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#030D45",
    transform: [{ rotate: "90deg" }], // Rotate the half circle
  },
  halfCircleRight: {
    position: "absolute",
    right: -10,
    top: "50%",
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#030D45",
    transform: [{ rotate: "-90deg" }], // Rotate the half circle
  },
  dealsTop: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 126,
    marginTop: -75,
  },
  dealsMid: {
    color: "#000",
    fontSize: 16,
    marginLeft: 126,
    marginTop: 4,
  },
  dealsBot: {
    color: "rgba(0, 0, 0, 0.3)",
    fontSize: 10,
    marginLeft: 126,
    marginTop: 6,
  },
  redeemButton: {
    position: "absolute",
    top: 70,
    right: 0,
    padding: 5,
    backgroundColor: "#FB7E3C",
    borderRadius: 10,
    marginTop: 5, // Adjust the spacing as needed
    marginRight: 5,
  },
  redeemButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default NormalUserScreen;
