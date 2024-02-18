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
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const ViewBOUserProfilePage = ({ route }) => {
  console.log(route.params); // Log the route params to the console
  const { userId, username } = route.params; // Destructure userId and username from route.params
  const navigation = useNavigation(); // Initialize the navigation object

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [listings, setListings] = useState([]);
  const [promos, setPromos] = useState([]);

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


  ///////////////////////////////////////////////////////////////////////////// listing
  const fetchListings = async () => {
    try {
        // Reference to the "listings" collection
        const listingsCollection = collection(db, "listings"); // Replace 'db' with your Firestore database reference
        const listingQuery = query(listingsCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(listingQuery);

        // Format fetched listings into the desired structure
        const formattedListings = [];
        querySnapshot.forEach((doc) => {
            const listingData = doc.data();
            const formattedListing = {
                id: doc.id, // Use the document ID as the post ID
                imageUrl: { uri: listingData.thumbnail },
                pfp: require("../assets/pfp.png"),
                username: listingData.username,
                timeposted: formatTimestamp(listingData.created),
                location: listingData.location,
                caption: listingData.description,
                likes: listingData.likes,
                title: listingData.title,
                comments: listingData.comments || [], // Use an empty array if comments field is missing
            };
            formattedListings.push(formattedListing);
        });

        // Update state with the formatted listings
        setListings(formattedListings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        // Handle the error as needed
    }
};

///////////////////////////////////////////////////////////////////////////// post/listing
const fetchPromos = async () => {
  try {
      // Reference to the "promos" collection
      const promosCollection = collection(db, "promos"); // Replace 'db' with your Firestore database reference
      const promoQuery = query(promosCollection, where("userId", "==", userId));

      const querySnapshot = await getDocs(promoQuery);

      // Format fetched promos into the desired structure
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
              category: promoData.category,
          };
          formattedPromos.push(formattedPromo);
      });

      // Update state with the formatted promos
      setPromos(formattedPromos);
  } catch (error) {
      console.error("Error fetching promos:", error);
      // Handle the error as needed
  }
};


///////////////////////////////////////////////////////////////////////////// review 
const [reviews, setReviews] = useState([]);

const fetchReviews = async () => {
  try {
    // Reference to the "reviews" collection
    const reviewsCollection = collection(db, "reviews"); // Replace 'db' with your Firestore database reference
    const reviewsQuery = query(
      reviewsCollection,
      where("business", "==", username),
      where("businessUserId", "==", userId) // Replace 'your_category' with the actual category value
    );

    const querySnapshot = await getDocs(reviewsQuery);

    // Format fetched reviews into the desired structure
    const formattedReviews = [];
    querySnapshot.forEach((doc) => {
      const reviewData = doc.data();
      const formattedReview = {
        // Add other fields as needed based on your review data structure
        id: doc.id, // Use the document ID as the review ID
        imageUrl: { uri: reviewData.thumbnail },
        pfp: require("../assets/pfp.png"),
        username: reviewData.username,
        timeposted: formatTimestamp(reviewData.created),
        location: reviewData.location,
        business: reviewData.business,
        title: reviewData.title,
        description: reviewData.description,
        likes: reviewData.likes || 0,
        // Add more fields as needed
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
  fetchListings();
  fetchPromos();
  fetchReviews(); // Call the new function to fetch reviews
  fetchSocials();
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

/////////////////////////////////////////////////////////////////////////////////////////////////
const fetchSocials = async () => {
  try {
    const socialsCollection = collection(db, "users");
    const socialQuery = query(socialsCollection, where("id", "==", userId));
    const querySnapshot = await getDocs(socialQuery);

    const formattedSocials = [];
    querySnapshot.forEach((doc) => {
      const socialData = doc.data();
      const formattedSocial = {
        id: doc.id,
        facebook: socialData.facebook || '',
        instagram: socialData.instagram || '',
        youtube: socialData.youtube || '',
      };
      formattedSocials.push(formattedSocial);
    });

    console.log("Fetched socials:", formattedSocials); // Log the fetched socials
    setSocials(formattedSocials);
  } catch (error) {
    console.error("Error fetching socials:", error);
  }
};


/////////////////////////////////////////////////////////////////////////////
const [socials, setSocials] = useState({}); // Initialize socials state with an empty object
  
  const [location, setLocation] = useState('');

  const handleViewListing = (listing) => {
    navigation.navigate('User Listing', { listing });
  };

  const handleViewReview = (review) => {
    navigation.navigate('User Review', { review });
  };

  const handleViewPromo = (promo) => {
    navigation.navigate('User Promotion', { promo });
  };

  const [activeTab, setActiveTab] = useState('Listings'); // Track the active tab
  

//each tab shows what content
    const renderContent = () => {
        if (activeTab === "Listings") {
      return (
        <View style={styles.listingsContainer}>
          {listings.map((listing) => (
            <View key={listing.id} style={styles.listingItem}>
              <TouchableOpacity onPress={() => handleViewListing(listing)}>
              <Image style={styles.listingImage} source={listing.imageUrl} />
              <View style={styles.listingStats}>
                {/* Additional listing details */}
                <View style={styles.listingActions}></View>
                <Text style={styles.titleContainer}>{listing.title}</Text>
                <View style={styles.descriptionContainer}>
                  <Text>{listing.caption}</Text>
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
                  <Image source={review.imageUrl} style={styles.reviewImage} />
                  <View style={styles.reviewText}>
                    <Text style={styles.reviewTitle}>{review.title}</Text>
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
              </View>
            ))}
          </View>
        );
      } else if (activeTab === 'Promo') {
        return (
          <View style={styles.promosContainer}>
            {promos.map((promo) => (
              <View key={promo.id} style={styles.promosTopLine}> 
                <View style={styles.promosContent}>
                  <View style={styles.promosColumn}>
                    <Text style={styles.promosTitle}>{promo.title}</Text>
                    <Text style={styles.promosSubtitle}>{promo.description}</Text>
                    <Text style={styles.promocode}>Promo Code: {promo.promocode} {'\n'}Valid till: {promo.valid} </Text>


                      <TouchableOpacity style={styles.arrowContainer} onPress={() => handleViewPromo(promo)}>
                          <Text style={styles.viewContentText}>View More</Text>
                          <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.promosColumn}>
                    <Image source={promo.imageUrl} style={styles.promosImage} />
                  </View>
                </View>
              </View>
            ))}
          </View>   
        );
      }
    };

    const handleFacebookPress = () => {
      if (!socials || socials.length === 0 || !socials[0]?.facebook) {
        console.log("Facebook link not available");
        return; // Exit the function early if socials is empty or facebook link is not available
      }
      
      const facebookUrl = socials[0].facebook;
      // Check if the URL starts with http:// or https://, if not, prepend it
      const validUrl = /^(http|https):\/\//i.test(facebookUrl) ? facebookUrl : `https://${facebookUrl}`;
      Linking.openURL(validUrl);
    };
    
    
    
    const handleYouTubePress = () => {
      if (!socials || socials.length === 0 || !socials[0]?.youtube) {
        console.log("YouTube link not available");
        return; // Exit the function early if socials is empty or youtube link is not available
      }
      
      const youtubeUrl = socials[0].youtube;
      // Check if the URL starts with http:// or https://, if not, prepend it
      const validUrl = /^(http|https):\/\//i.test(youtubeUrl) ? youtubeUrl : `https://${youtubeUrl}`;
      Linking.openURL(validUrl);
    };
    
    const handleInstagramPress = () => {
      if (!socials || socials.length === 0 || !socials[0]?.instagram) {
        console.log("Instagram link not available");
        return; // Exit the function early if socials is empty or instagram link is not available
      }
      
      const instagramUrl = socials[0].instagram;
      // Check if the URL starts with http:// or https://, if not, prepend it
      const validUrl = /^(http|https):\/\//i.test(instagramUrl) ? instagramUrl : `https://${instagramUrl}`;
      Linking.openURL(validUrl);
    };
    
    const [pfp, setpfp] = useState(null); 

  const fetchProfilePicture = async () => {
    try {
      const socialsCollection = collection(db, "users");
      const socialQuery = query(socialsCollection, where("id", "==", userId));
      const querySnapshot = await getDocs(socialQuery);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const pfpURL = userData.pfp; // If pfp doesn't exist, provide a default value
  
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
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
      <View style={styles.followCounts}>

        <View style={styles.followCountsinner}>
          <Text style={styles.followCountNumber}>{followers}</Text>
          <Text style={styles.followText}>Followers</Text>
        </View>
        {pfp ? (
              <Image
                style={styles.profileImage}
                source={{ uri: pfp }} // Use user.pfp if available
                />
            ) : (
              <Image
                style={styles.profileImage}
                source={require("../assets/pfp.png")} // Provide default image source
              />
            )}
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
          {/* Social Media Icons */}
          <View style={styles.socialMediaIcons}>
            {/* Facebook */}
            <TouchableOpacity style={[styles.socialMediaIcon, { marginRight: 5 }]} onPress={handleFacebookPress}>
              <MaterialCommunityIcons name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            {/* YouTube */}
            <TouchableOpacity style={[styles.socialMediaIcon, { marginRight: 5 }]} onPress={handleYouTubePress}>
              <MaterialCommunityIcons name="youtube" size={32} color="red" />
            </TouchableOpacity>
            {/* Instagram */}
            <TouchableOpacity style={styles.socialMediaIcon} onPress={handleInstagramPress}>
              <MaterialCommunityIcons name="instagram" size={30} color="#e4405f" />
            </TouchableOpacity>
          </View>

        </View>
      </View>


      {/* Toggle buttons */}
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Listings' && styles.activeButton]}
          onPress={() => setActiveTab('Listings')}
        >
          <Text style={styles.toggleButtonText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Reviews' && styles.activeButton]}
          onPress={() => setActiveTab('Reviews')}
        >
          <Text style={styles.toggleButtonText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Promo' && styles.activeButton]}
          onPress={() => setActiveTab('Promo')}
        >
          <Text style={styles.toggleButtonText}>Promotions</Text>
        </TouchableOpacity>
      </View>

      {/* Render content based on the active tab */}
      {renderContent()}

        </ScrollView>

  );
};

const styles = StyleSheet.create({
  socialMediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaIcon: {
    marginTop: 10,
    marginHorizontal: 30, // Adjust the horizontal margin between icons
  },
  promocode: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#030D45",
    marginTop: 5,
    flexWrap: "wrap",
    maxWidth: "90%", // Adjust the maximum width as needed
    marginVertical: 5,
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
    maxHeight: '60%',
  },

  titleContainer: {
    fontSize: 15,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
  },

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
  promosContainer: {
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
  promostats: {
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

  promosContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  promosTopLine: {
    borderTopWidth: 1,
    borderTopColor: '#6C7A9C',
    marginBottom: 10,
  },
  promosContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  promosColumn: {
    flex: 1,
  },
  promosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#030D45',
    marginBottom: 5,
  },
  promosSubtitle: {
    color: '#6C7A9C',
    marginBottom: 10,
  },
  promosImage: {
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
followButton: {
    width: 200,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'flex',
    textAlign: 'center',
    marginTop: 20,
  },
  followButtonText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    color: 'white',
  },
});
  
export default ViewBOUserProfilePage;
