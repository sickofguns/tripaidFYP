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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";

const EventScreen = () => {
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

      const postQuery = query(
        postsCollection,
        where("category", "==", 'Events')
      );

      // Get all documents in the "posts" collection
      const querySnapshot = await getDocs(postQuery);

      // Initialize arrays to store posts sorted by current region and the rest of the posts
     const postsSortedByRegion = [];
     const postsSortedByRegion2 = [];
     const postsNotInRegion = [];
     
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const formattedPost = {
          id: doc.id, // Use the document ID as the post ID
          imageUrl: { uri: postData.thumbnail },
          userId: postData.userId,
          username: postData.username,
          timeposted: formatTimestamp(postData.created),
          location: postData.location,
          caption: postData.description,
          likes: postData.likes,
          comments: postData.comments || [], // Use an empty array if comments field is missing
        };
        // Check if currentRegion is defined and if the post's location matches the current region or includes it
      if (currentRegion && formattedPost.location === currentRegion) {
        postsSortedByRegion.push(formattedPost); // Add the post to the sorted array
      } else if (currentRegion && formattedPost.location.includes(currentRegion)) {
        postsSortedByRegion2.push(formattedPost); // Add the post to the sorted array 2
      } else {
        postsNotInRegion.push(formattedPost); // Add the post to the array of posts not in the region
      }
    });

    // Fetch profile pictures for the posts
    await Promise.all([
      fetchProfilePictures(postsSortedByRegion),
      fetchProfilePictures(postsSortedByRegion2),
      fetchProfilePictures(postsNotInRegion),
     ]);


    // Concatenate the sorted posts and the rest of the posts
    const allPosts = postsSortedByRegion.concat(postsSortedByRegion2, postsNotInRegion);
  
      // Update state with the formatted posts
      setPosts(allPosts);
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

      const reviewQuery = query(
        reviewsCollection,
        where("category", "==", 'Events')
      );

      // Get all documents in the "reviews" collection
      const querySnapshot = await getDocs(reviewQuery);

      // Initialize arrays to store posts sorted by current region and the rest of the posts
      const reviewsSortedByRegion = [];
      const reviewsSortedByRegion2 = [];
      const reviewNotInRegion = [];
      
      querySnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const formattedReview = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: { uri: reviewData.thumbnail },
          userId: reviewData.userId,
          username: reviewData.username,
          timeposted: formatTimestamp(reviewData.created),
          location: reviewData.location,
          business: reviewData.business,
          title: reviewData.title,
          description: reviewData.description,
          likes: reviewData.likes || 0,
        };
        if (currentRegion && formattedReview.location === currentRegion) {
          reviewsSortedByRegion.push(formattedReview);
      } else if (currentRegion && formattedReview.location.includes(currentRegion)) {
          reviewsSortedByRegion2.push(formattedReview);
      } else {
          reviewNotInRegion.push(formattedReview);
      }      
    });

   // In fetchReview function
   await Promise.all([
    fetchReviewProfilePictures(reviewsSortedByRegion),
    fetchReviewProfilePictures(reviewsSortedByRegion2),
    fetchReviewProfilePictures(reviewNotInRegion),
   ]);


    // Concatenate the sorted posts and the rest of the posts
    const allReviews = reviewsSortedByRegion.concat(reviewsSortedByRegion2, reviewNotInRegion); 

      // Update state with the formatted reviews
      setReviews(allReviews);
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

      const trailQuery = query(
        trailsCollection,
        where("category", "==", 'Events')
      );

      // Get all documents in the "reviews" collection
      const querySnapshot = await getDocs(trailQuery);

       // Initialize arrays to store posts sorted by current region and the rest of the posts
       const trailsSortedByRegion = [];
       const trailsSortedByRegion2 = [];
       const trailsNotInRegion = [];
 
      querySnapshot.forEach((doc) => {
        const trailData = doc.data();
        const formattedTrail = {
          id: doc.id, // Use the document ID as the review ID
          imageUrl: { uri: trailData.thumbnail },
          userId: trailData.userId,
          username: trailData.username,
          timeposted: formatTimestamp(trailData.created),
          location: trailData.location,
          title: trailData.title,
          description: trailData.description,
          likes: trailData.likes || 0,
        };
         // Check if the post's location matches the current region
         if (currentRegion && formattedTrail.location === currentRegion) {
          trailsSortedByRegion.push(formattedTrail);
      } else if (currentRegion && formattedTrail.location.includes(currentRegion)) {
          trailsSortedByRegion2.push(formattedTrail);
      } else {
          trailsNotInRegion.push(formattedTrail);
      }
    });

    // In fetchTrail function
    await Promise.all([
      fetchTrailProfilePictures(trailsSortedByRegion),
      fetchTrailProfilePictures(trailsSortedByRegion2),
      fetchTrailProfilePictures(trailsNotInRegion),
     ]);


    // Concatenate the sorted posts and the rest of the posts
    const allTrails = trailsSortedByRegion.concat(trailsSortedByRegion2, trailsNotInRegion); 

      // Update state with the formatted reviews
      setTrails(allTrails);
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

  //////////////////////////////////////////////////////////////////////////////////// pfp

  const fetchProfilePictures = async (posts) => {
    try {
        for (const post of posts) {
            const userId = post.userId;
            if (!userId) {
                console.error("User ID is missing in the post:", post);
                continue; // Skip processing this post and move to the next one
            }

            const userDocRef = doc(db, "users", userId); // Reference to the user document
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData && userData.pfp) {
                    post.pfp = { uri: userData.pfp }; // Assign the pfp to the post object
                } else {
 
                    // Assign a default pfp or handle it based on your requirements
                    post.pfp = require("../assets/pfp.png"); // Provide default pfp source
                }
            } else {
                // Handle the case where user document doesn't exist
                console.error(`User document with ID ${userId} does not exist.`);
                // Assign a default pfp or handle it based on your requirements
                post.pfp = require("../assets/pfp.png"); // Provide default pfp source
            }
        }
    } catch (error) {
        console.error("Error fetching profile pictures:", error);
        // Handle the error as needed
    }
};

  
  const fetchTrailProfilePictures = async (trails) => {
    try {
        for (const trail of trails) {
            const userId = trail.userId;
            if (!userId) {
                console.error("User ID is missing in the trail:", trail);
                continue; // Skip processing this trail and move to the next one
            }

            const userDocRef = doc(db, "users", userId); // Reference to the user document
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData && userData.pfp) {
                    trail.pfp = { uri: userData.pfp }; // Assign the pfp to the trail object
                } else {
 
                    // Assign a default pfp or handle it based on your requirements
                    trail.pfp = require("../assets/pfp.png"); // Provide default pfp source
                }
            } else {
                // Handle the case where user document doesn't exist
                console.error(`User document with ID ${userId} does not exist.`);
                // Assign a default pfp or handle it based on your requirements
                trail.pfp = require("../assets/pfp.png"); // Provide default pfp source
            }
        }
    } catch (error) {
        console.error("Error fetching trail profile pictures:", error);
        // Handle the error as needed
    }
};

const fetchReviewProfilePictures = async (reviews) => {
    try {
        for (const review of reviews) {
            const userId = review.userId;
            if (!userId) {
                console.error("User ID is missing in the review:", review);
                continue; // Skip processing this review and move to the next one
            }

            const userDocRef = doc(db, "users", userId); // Reference to the user document
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData && userData.pfp) {
                    review.pfp = { uri: userData.pfp }; // Assign the pfp to the review object
                } else {
 
                    // Assign a default pfp or handle it based on your requirements
                    review.pfp = require("../assets/pfp.png"); // Provide default pfp source
                }
            } else {
                // Handle the case where user document doesn't exist
                console.error(`User document with ID ${userId} does not exist.`);
                // Assign a default pfp or handle it based on your requirements
                review.pfp = require("../assets/pfp.png"); // Provide default pfp source
            }
        }
    } catch (error) {
        console.error("Error fetching review profile pictures:", error);
        // Handle the error as needed
    }
};
//////////////////////////////////////////////////////////////////////////////////// promo
const [promotions, setPromotions] = useState([]); 
const fetchPromos = async () => {
  try {
    // Reference to the "posts" collection
    const promoCollection = collection(db, "promos"); // Replace 'db' with your Firestore database reference
    
    const promoQuery = query(
      promoCollection,
      where("category", "==", 'Events')
    );

    const querySnapshot = await getDocs(promoQuery);

    // Format fetched reviews into the desired structure
    const formattedPromos = [];
    querySnapshot.forEach((doc) => {
      const promoData = doc.data();
      const formattedPromo = {
        id: doc.id, // Use the document ID as the review ID
        imageUrl: { uri: promoData.thumbnail },
        title: promoData.title,
        description: promoData.description,
        promocode: promoData.promotion,
        valid: formatTimestamp(promoData.valid),
        userId: promoData.userId,
        category: promoData.category,
      };
      formattedPromos.push(formattedPromo);
    });

    await fetchPromoProfilePictures(formattedPromos);

    // Update state with the formatted reviews
    setPromotions(formattedPromos);
  } catch (error) {
    console.error("Error fetching promo:", error);
    // Handle the error as needed
  }
};

const fetchPromoProfilePictures = async (promotions) => {
  try {
      for (const promo of promotions) {
          const userId = promo.userId;
          if (!userId) {
              console.error("User ID is missing in the promotion:", promo);
              continue; // Skip processing this promotion and move to the next one
          }

          const userDocRef = doc(db, "users", userId); // Reference to the user document
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              if (userData && userData.pfp) {
                  promo.pfp = { uri: userData.pfp }; // Assign the pfp to the promotion object
              } else {

                  // Assign a default pfp or handle it based on your requirements
                  promo.pfp = require("../assets/pfp.png"); // Provide default pfp source
              }
          } else {
              // Handle the case where user document doesn't exist

              // Assign a default pfp or handle it based on your requirements
              promo.pfp = require("../assets/pfp.png"); // Provide default pfp source
          }
      }
  } catch (error) {
      console.error("Error fetching promotion profile pictures:", error);
      // Handle the error as needed
  }
};

useEffect(() => {
fetchPromos();
}, []);
  ////////////////////////////////////////////////////////////////////////////////////location
  const [currentRegion, setCurrentRegion] = useState(null);

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

        // Set the current location state with the obtained information
        setCurrentLocation(`${street}, ${country}`);

        // Calculate region based on latitude and longitude
        const latitude = locationData.coords.latitude;
        const longitude = locationData.coords.longitude;
        const region = calculateRegion(latitude, longitude);

        // Set the current region state with the obtained information
        setCurrentRegion(region);
      } catch (error) {
        console.error("Error fetching location:", error.message);
        // Handle the error as needed
      }
    };

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once

  // Function to calculate the region based on latitude and longitude
  const calculateRegion = (latitude, longitude) => {
    let region = "";
  
    if (
      latitude >= regionBoundaries.north.minLat &&
      latitude <= regionBoundaries.north.maxLat &&
      longitude >= regionBoundaries.north.minLng &&
      longitude <= regionBoundaries.north.maxLng
    ) {
      region = "North";
    } else if (
      latitude >= regionBoundaries.south.minLat &&
      latitude <= regionBoundaries.south.maxLat &&
      longitude >= regionBoundaries.south.minLng &&
      longitude <= regionBoundaries.south.maxLng
    ) {
      region = "South";
    } else if (
      latitude >= regionBoundaries.east.minLat &&
      latitude <= regionBoundaries.east.maxLat &&
      longitude >= regionBoundaries.east.minLng &&
      longitude <= regionBoundaries.east.maxLng
    ) {
      region = "East";
    } else if (
      latitude >= regionBoundaries.west.minLat &&
      latitude <= regionBoundaries.west.maxLat &&
      longitude >= regionBoundaries.west.minLng &&
      longitude <= regionBoundaries.west.maxLng
    ) {
      region = "West";
    } else if (
      latitude >= regionBoundaries.northeast.minLat &&
      latitude <= regionBoundaries.northeast.maxLat &&
      longitude >= regionBoundaries.northeast.minLng &&
      longitude <= regionBoundaries.northeast.maxLng
    ) {
      region = "Northeast";
    } else if (
      latitude >= regionBoundaries.northwest.minLat &&
      latitude <= regionBoundaries.northwest.maxLat &&
      longitude >= regionBoundaries.northwest.minLng &&
      longitude <= regionBoundaries.northwest.maxLng
    ) {
      region = "Northwest";
    } else if (
      latitude >= regionBoundaries.southeast.minLat &&
      latitude <= regionBoundaries.southeast.maxLat &&
      longitude >= regionBoundaries.southeast.minLng &&
      longitude <= regionBoundaries.southeast.maxLng
    ) {
      region = "Southeast";
    } else if (
      latitude >= regionBoundaries.southwest.minLat &&
      latitude <= regionBoundaries.southwest.maxLat &&
      longitude >= regionBoundaries.southwest.minLng &&
      longitude <= regionBoundaries.southwest.maxLng
    ) {
      region = "Southwest";
    } else if (
      latitude >= regionBoundaries.central.minLat &&
      latitude <= regionBoundaries.central.maxLat &&
      longitude >= regionBoundaries.central.minLng &&
      longitude <= regionBoundaries.central.maxLng
    ) {
      region = "Central";
    }
  
    console.log(region);
    return region;
  };
  
  const regionBoundaries = {
    north: {
      minLat: 1.4185,
      maxLat: 1.4702,
      minLng: 103.8399,
      maxLng: 103.8662,
    },
    south: {
      minLat: 1.2476,
      maxLat: 1.3362,
      minLng: 103.8209,
      maxLng: 103.8915,
    },
    east: {
      minLat: 1.3147,
      maxLat: 1.3512,
      minLng: 103.9300,
      maxLng: 103.9875,
    },
    west: {
      minLat: 1.2855,
      maxLat: 1.3906,
      minLng: 103.6965,
      maxLng: 103.7880,
    },
    northeast: {
      minLat: 1.3606,
      maxLat: 1.4191,
      minLng: 103.8701,
      maxLng: 103.9616,
    },
    northwest: {
      minLat: 1.3355,
      maxLat: 1.4191,
      minLng: 103.7485,
      maxLng: 103.8701,
    },
    southeast: {
      minLat: 1.2460,
      maxLat: 1.3217,
      minLng: 103.9221,
      maxLng: 103.9875,
    },
    southwest: {
      minLat: 1.2460,
      maxLat: 1.3351,
      minLng: 103.6965,
      maxLng: 103.8152,
    },
    central: {
      minLat: 1.2913,
      maxLat: 1.3502,
      minLng: 103.8152,
      maxLng: 103.8764,
    },
  }


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

  const handleViewTrail = (trail) => {
    navigation.navigate("User Trail", { trail });
  };

 
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
                  onPress={() => handleLike(posts, index)}
                >
                  <MaterialIcons
                    name={post.liked ? "favorite" : "favorite-border"}
                    size={24}
                    color={post.liked ? "red" : "#333"}
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
                  onPress={() => handleLike(reviews, index)}
                >
                  <MaterialIcons
                    name={review.liked ? "favorite" : "favorite-border"}
                    size={24}
                    color={review.liked ? "red" : "#333"}
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
              onPress={() => handleViewTrail(trail)}
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
                  onPress={() => handleLike(trails, index)}
                >
                  <MaterialIcons
                    name={trail.liked ? "favorite" : "favorite-border"}
                    size={24}
                    color={trail.liked ? "red" : "#333"}
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
                {promotions.map((promo) => (
                  <TouchableOpacity
                  key={promo.id}
                  onPress={() => handleViewPromo(promo)}
                  >
                  <View style={styles.modalInnerContainer} key={promo.id}>
                    <View style={styles.halfCircleLeft}></View>
                    <View style={styles.halfCircleRight}></View>
                    <Image source={promo.pfp} style={styles.dealsImage} />
                    <View style={styles.dottedLine}></View>
                    <Text style={styles.dealsTop}>{promo.title}</Text>
                    <Text style={styles.dealsMid}>{promo.category}</Text>
                    <Text style={styles.dealsBot}>Valid till: {promo.valid}{'\n'}*T&C applies</Text>
                  </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  const handleViewPromo = (promo) => {
    navigation.navigate('User Promotion', { promo });
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

  const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));
  const [likedReviews, setLikedReviews] = useState(Array(reviews.length).fill(false));
  const [likedTrails, setLikedTrails] = useState(Array(trails.length).fill(false));
  
  useEffect(() => {
    // Load liked state from AsyncStorage for each post when component mounts
    const loadLikedState = async () => {
      try {
        // Load liked state for posts
        for (const post of posts) {
          const storedLikes = await AsyncStorage.getItem(`post_${post.id}`);
          if (storedLikes !== null) {
            const parsedLikes = JSON.parse(storedLikes);
            setLikedPosts((prevLikedPosts) => ({
              ...prevLikedPosts,
              [post.id]: parsedLikes,
            }));
          }
        }
  
        // Load liked state for reviews
        for (const review of reviews) {
          const storedLikes = await AsyncStorage.getItem(`review_${review.id}`);
          if (storedLikes !== null) {
            const parsedLikes = JSON.parse(storedLikes);
            setLikedReviews((prevLikedReviews) => ({
              ...prevLikedReviews,
              [review.id]: parsedLikes,
            }));
          }
        }
  
        // Load liked state for trails
        for (const trail of trails) {
          const storedLikes = await AsyncStorage.getItem(`trail_${trail.id}`);
          if (storedLikes !== null) {
            const parsedLikes = JSON.parse(storedLikes);
            setLikedTrails((prevLikedTrails) => ({
              ...prevLikedTrails,
              [trail.id]: parsedLikes,
            }));
          }
        }
      } catch (error) {
        console.error("Error loading liked state:", error);
      }
    };
  
    // Load liked state whenever posts, reviews, or trails state changes
    loadLikedState();
  }, [posts, reviews, trails]);
  
  // Function to handle like/unlike for posts, reviews, or trails
  const handleLike = async (content, index) => {
    try {
      const updatedContent = [...content];
      updatedContent[index].liked = !updatedContent[index].liked;
  
      if (content === posts) {
        setPosts(updatedContent);
        await AsyncStorage.setItem(`post_${content[index].id}`, JSON.stringify(updatedContent[index].liked));
      } else if (content === reviews) {
        setReviews(updatedContent);
        await AsyncStorage.setItem(`review_${content[index].id}`, JSON.stringify(updatedContent[index].liked));
      } else if (content === trails) {
        setTrails(updatedContent);
        await AsyncStorage.setItem(`trail_${content[index].id}`, JSON.stringify(updatedContent[index].liked));
      }
  
      // Update like count in Firestore
      const contentRef = doc(collection(db, content === posts ? "posts" : content === reviews ? "reviews" : "trails"), content[index].id);
      const newLikeCount = updatedContent[index].liked ? content[index].likes + 1 : Math.max(content[index].likes - 1, 0);
      await updateDoc(contentRef, { likes: newLikeCount });
    } catch (error) {
      console.error("Error updating like:", error);
    }
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
        <Text style={styles.mainText}>Explore Event in SG!</Text>
              <Text style={styles.OtherselectText}>What do you want to explore?</Text>

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

         
          </View>
      </ScrollView>
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
          <Text style={{ marginBottom: 20, alignSelf:'center' }}>&copy; 2024 TripAid</Text>
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
    alignSelf:'center',
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
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 126,
    marginTop: -75,
    maxWidth: '50%',
    maxHeight: '30%',
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

export default EventScreen;
