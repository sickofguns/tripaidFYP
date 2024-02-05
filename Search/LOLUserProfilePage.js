import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  getDocs,
  query,
  where,
  arrayContains,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

const ViewLOLUserProfilePage = ({ route }) => {
  console.log(route.params); // Log the route params to the console
  const { userId, username } = route.params; // Destructure userId and username from route.params
  const navigation = useNavigation(); // Initialize the navigation object

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);

  /////////////////////////////////////////////////////////////////////////////
  const fetchPosts = async () => {
    try {
        // Reference to the "posts" collection
        const postsCollection = collection(db, "posts"); // Replace 'db' with your Firestore database reference
        const postQuery = query(postsCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(postQuery);

        // Format fetched posts into the desired structure
        const formattedPosts = [];
        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const formattedPost = {
                id: doc.id, // Use the document ID as the post ID
                imageUrl: require("../assets/error.jpg") || postData.thumbnail,
                pfp: require("../assets/pfp.png"),
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

/////////////////////////////////////////////////////////////////////////////
const fetchReviews = async () => {
    try {
        // Reference to the "reviews" collection (not "posts")
        const reviewCollection = collection(db, "reviews"); // Replace 'db' with your Firestore database reference
        const reviewQuery = query(reviewCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(reviewQuery);

        // Format fetched reviews into the desired structure
        const formattedReviews = [];
        querySnapshot.forEach((doc) => {
            const reviewData = doc.data();
            const formattedReview = {
                id: doc.id, // Use the document ID as the review ID
                imageUrl: require("../assets/error.jpg") || reviewData.thumbnail,
                pfp: require("../assets/pfp.png"),
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
}, [userId]);

/////////////////////////////////////////////////////////////////////////////
const getFollowerCount = async (userId) => {
    try {
        const followsCollection = collection(db, "follows");
        const followsQuery = query(
            followsCollection,
            where("following", "array-contains", userId)
        );

        const followsSnapshot = await getDocs(followsQuery);
        const followerCount = followsSnapshot.size; // Number of documents in the query result represents the follower count

        return formatNumber(followerCount); // Format the follower count using the formatNumber function
    } catch (error) {
        console.error("Error getting follower count:", error);
        return formatNumber(0); // Return formatted 0 in case of an error
    }
};

const getFollowingCount = async (userId) => {
    try {
        const followsCollection = collection(db, "follows");
        const followsQuery = query(
            followsCollection,
            where("userId", "==", userId)
        );

        const followsSnapshot = await getDocs(followsQuery);
        let followingCount = 0;

        if (followsSnapshot.size > 0) {
            const followingList =
                followsSnapshot.docs[0].data().following || [];
            followingCount = followingList.length; // Length of the following list represents the following count
        }

        return formatNumber(followingCount); // Format the following count using the formatNumber function
    } catch (error) {
        console.error("Error getting following count:", error);
        return formatNumber(0); // Return formatted 0 in case of an error
    }
};

useEffect(() => {
    fetchReviews();
    fetchPosts();
}, [userId]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const userIdToCheck = userId; // Use the actual user ID
            const followerCount = await getFollowerCount(userIdToCheck);
            const followingCount = await getFollowingCount(userIdToCheck);

            console.log("Follower Count:", followerCount);
            console.log("Following Count:", followingCount);

            // Update state with the counts
            setFollowers(followerCount);
            setFollowing(followingCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Call the async function
    fetchData();
}, [userId]); // Add userId as a dependency

// Function to format numbers over 10,000 as 10k or 10m
const formatNumber = (num) => {
    if (num >= 10000 && num < 1000000) {
        return (num / 1000).toFixed(0) + "k";
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "m";
    }
    return num;
};

/////////////////////////////////////////////////////////////////////////////
const [activeTab, setActiveTab] = useState("Posts"); // Track the active tab
   
    const [location, setLocation] = useState('');

    const [trails, setTrails] = useState([
      {
        id: 1,
        title: 'Best travel view? Take a look!',
        subtitle: 'This trail will guide you to the best hiking experience.',
        imageSource: require('../assets/typenu.jpg'),
      },
      {
        id: 2,
        title: 'Another Trail Title',
        subtitle: 'Description of another exciting trail.',
        imageSource: require('../assets/trails.jpg'),
      },
      {
        id: 3,
        title: 'Best travel view? Take a look!',
        subtitle: 'This trail will guide you to the best hiking experience.',
        imageSource: require('../assets/typenu.jpg'),
      },
      {
        id: 4,
        title: 'Another Trail Title',
        subtitle: 'Description of another exciting trail.',
        imageSource: require('../assets/trails.jpg'),
      },
      // Add more trails as needed
    ]);
  
    const handleViewPost = () => {
      navigation.navigate('User Post');
    };
  
    const handleViewReview = () => {
      navigation.navigate('User Review');
    };
  
    const handleViewTrail = () => {
      navigation.navigate('User Trail');
    };
  
  
  
  //each tab shows what content
      const renderContent = () => {
        if (activeTab === 'Posts') {
          return (
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <View key={post.id} style={styles.postItem}>
                  <TouchableOpacity onPress={handleViewPost}>
                  <Image style={styles.postImage} source={post.source} />
                  <View style={styles.postStats}>
                    {/* Additional post details */}
                    <View style={styles.postActions}>
                      <TouchableOpacity >
                        <MaterialIcons name="favorite-border" size={24} color="#333" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <MaterialIcons name="chat-bubble-outline" size={24} color="#333" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.likesComments}>
                      <Text>{post.likes} Likes</Text>
                      <Text>{post.comments} Comments</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        } else if (activeTab === 'Reviews') {
          return (
            <View style={styles.reviewsContainer}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewContent}>
                    <Image source={review.locationImage} style={styles.reviewImage} />
                    <View style={styles.reviewText}>
                      <Text style={styles.reviewTitle}>{review.title}</Text>
                      <Text style={styles.reviewSubtitle}>{review.subtitle}</Text>
  
                        <TouchableOpacity style={styles.arrowContainer} onPress={handleViewReview}>
                            <Text style={styles.viewContentText}>View More</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                        </TouchableOpacity>
                    </View>
                  </View>
                    <Text style={styles.locationLink}>Location: {review.locationName}</Text>
                </View>
  
              ))}
            </View>
          );
        } else if (activeTab === 'Trails') {
          return (
            <View style={styles.trailsContainer}>
              {trails.map((trail) => (
                <View key={trail.id} style={styles.trailsTopLine}> 
                  <View style={styles.trailsContent}>
                    <View style={styles.trailsColumn}>
                      <Text style={styles.trailsTitle}>{trail.title}</Text>
                      <Text style={styles.trailsSubtitle}>{trail.subtitle}</Text>
  
                        <TouchableOpacity style={styles.arrowContainer} onPress={handleViewTrail}>
                            <Text style={styles.viewContentText}>View More</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.trailsColumn}>
                      <Image source={trail.imageSource} style={styles.trailsImage} />
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
            <Image style={styles.profileImage} source={require('../assets/pfp.png')} />
          <View style={styles.followCountsinner}>
            <Text style={styles.followCountNumber}>{following}</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
        </View>
          <View style={styles.profileInfo}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{username} </Text>
              {/* Verified user icon */}
              <MaterialIcons name="verified" size={20} color="#030D45" />
            </View>
          </View>
        </View>
  
  
        {/* Toggle buttons */}
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab === 'Posts' && styles.activeButton]}
            onPress={() => setActiveTab('Posts')}
          >
            <Text style={styles.toggleButtonText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab === 'Reviews' && styles.activeButton]}
            onPress={() => setActiveTab('Reviews')}
          >
            <Text style={styles.toggleButtonText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab === 'Trails' && styles.activeButton]}
            onPress={() => setActiveTab('Trails')}
          >
            <Text style={styles.toggleButtonText}>Trails</Text>
          </TouchableOpacity>
        </View>
  
        {/* Render content based on the active tab */}
        {renderContent()}
  
          </ScrollView>
  
    );
  };
  
  const styles = StyleSheet.create({
    viewContentText: {
      color: '#000',
      fontWeight: 'bold',
      marginBottom: 5,
      
    },
    arrowContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    profileHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    followCounts: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    followText: {
      fontSize: 16,
      marginRight: 40,
      marginLeft: 40,
      color: '#030D45',
    },
    followCountsinner: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    followCountNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#030D45',
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
      fontWeight: 'bold',
      color: '#030D45',
      alignSelf: 'center',
      marginTop: 10,
    },
    bio: {
      color: '#555',
      marginTop: 5,
      color: '#6C7A9C',
      textAlign: 'center',    
    },
    actions: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'flex-end',
    },
    editProfileButton: {
      backgroundColor: '#030D45',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      marginRight: 10,
    },
    editProfileButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      justifyContent: 'flex-end',
    },
    postsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 5,
    },
    postItem: {
      width: '48%',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    postImage: {
      width: '100%',
      height: 200,
    },
    postStats: {
      padding: 10,
    },
    postActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    likesComments: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    toggleButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
    },
    toggleButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#030D45',
    },
    toggleButtonText: {
      fontWeight: 'bold',
      color: '#030D45',
    },
    activeButton: {
      backgroundColor: '#6C7A9C',
    },
  
    trailsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    trailsTopLine: {
      borderTopWidth: 1,
      borderTopColor: '#6C7A9C',
      marginBottom: 10,
    },
    trailsContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    trailsColumn: {
      flex: 1,
    },
    trailsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#030D45',
      marginBottom: 5,
    },
    trailsSubtitle: {
      color: '#6C7A9C',
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 10,
    },
    reviewContent: {
      flexDirection: 'row',
      alignItems: 'center',
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
      fontWeight: 'bold',
      color: '#030D45',
      marginBottom: 5,
    },
    reviewSubtitle: {
      color: '#6C7A9C',
      marginBottom: 5,
    },
    locationLink: {
      color: '#030D45',
      fontWeight: '600',
      marginTop: 5, // Add margin top for spacing
    },
    usernameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#030D45',
      marginTop: 10,
    },
  
    saveCancelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    saveButton: {
      backgroundColor: '#030D45',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      marginRight: 10,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#ddd',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
    },
    cancelButtonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
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
  
  });
  
export default ViewLOLUserProfilePage;
