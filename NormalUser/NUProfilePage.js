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

const NUProfilePage = () => {
  const { user } = useAppContext();
  const navigation = useNavigation(); // Initialize the navigation object

  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const fetchPosts = async () => {
    try {
      // Reference to the "posts" collection
      const postsCollection = collection(db, "posts"); // Replace 'db' with your Firestore database reference
      const postQuery = query(postsCollection, where("userId", "==", user.id));

      const querySnapshot = await getDocs(postQuery);

      // Format fetched posts into the desired structure
      const formattedPosts = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const formattedPost = {
          id: doc.id, // Use the document ID as the post ID
          imageUrl: require("../assets/advcove.jpg") || postData.thumbnail,
          pfp: require("../assets/LOL.jpg"),
          username: postData.username,
          timeposted: postData.crated,
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

  const fetchReviews = async () => {
    try {
      // Reference to the "posts" collection
      const reviewCollection = collection(db, "reviews"); // Replace 'db' with your Firestore database reference
      const reviewQuery = query(reviewCollection, where("userId", "==", user.id));

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
      setReviews(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchPosts();
  }, []);

  const [followers, setFollowers] = useState(982); // Replace followers with useState
  const [following, setFollowing] = useState(1000); // Replace following with useState
  const [activeTab, setActiveTab] = useState("Posts"); // Track the active tab

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

  const handleViewPost = (post) => {
    navigation.navigate("Normal User View Post", { post });
  };

  const handleViewReview = (review) => {
    navigation.navigate("Normal User View Review", { review });
  };

  //each tab shows what content
  const renderContent = () => {
    if (activeTab === "Posts") {
      return (
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postItem}>
              <TouchableOpacity onPress={() => handleViewPost(post)}>
                <Image style={styles.postImage} source={post.imageUrl} />
                <View style={styles.postStats}>
                  {/* Additional post details */}
                  <View style={styles.postActions}>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="favorite-border"
                        size={24}
                        color="#333"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="chat-bubble-outline"
                        size={24}
                        color="#333"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.likesComments}>
                    <Text>{post.likes} Likes</Text>
                    <Text>{post.comments.length} Comments</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
                <Image
                  source={review.imageUrl}
                  style={styles.reviewImage}
                />
                <View style={styles.reviewText}>
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                  <Text style={styles.reviewSubtitle}>{review.description}</Text>

                  <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => handleViewReview(review)}
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
              <Text style={styles.locationLink}>
                Location: {review.locationName}
              </Text>
            </View>
          ))}
        </View>
      );
    }
  };

  const handleHome = () => {
    navigation.navigate("Normal User");
  };

  const handlePOI = () => {
    navigation.navigate("Interest");
  };

  const handleProfile = () => {
    navigation.navigate("Normal User More");
  };

  const handleSearch = () => {
    navigation.navigate("Normal User Search User");
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
            source={require("../assets/NU.jpg")}
          />
          <View style={styles.followCountsinner}>
            <Text style={styles.followCountNumber}>{following}</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>

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
      </View>

      {/* Render content based on the active tab */}
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  postItem: {
    width: "48%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postStats: {
    padding: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  likesComments: {
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

  trailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  trailsTopLine: {
    borderTopWidth: 1,
    borderTopColor: "#6C7A9C",
    marginBottom: 10,
  },
  trailsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  trailsColumn: {
    flex: 1,
  },
  trailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    marginBottom: 5,
  },
  trailsSubtitle: {
    color: "#6C7A9C",
    marginBottom: 10,
  },
  trailsImage: {
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
  reviewSubtitle: {
    color: "#6C7A9C",
    marginBottom: 5,
  },
  locationLink: {
    color: "#030D45",
    fontWeight: "600",
    marginTop: 5, // Add margin top for spacing
  },
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
});

export default NUProfilePage;
