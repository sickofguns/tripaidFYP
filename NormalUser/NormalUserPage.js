import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';



const NormalUserScreen = () => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('Posts'); // Track the active tab

   // Assuming posts are fetched and stored in this array
   const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: require('../assets/advcove.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      location: 'Adventure Cove',
      caption: 'Fun day out with the family at Singapore Adventure Cove!',
      likes: 10,
      comments: [
          { user: 'Joey', text: 'This is very cool.' },
          { user: 'Leslie', text: 'How much? I want to go too!' },
          // ... other comments
      ],
  },
  {
    id: 2,
    imageUrl: require('../assets/advcove.jpg'),
    pfp: require('../assets/LOL.jpg'),
    username: 'Naomi Neo',
    timeposted: '2 hours ago',
    location: 'Adventure Cove',
    caption: 'Fun day out with the family at Singapore Adventure Cove!',
    likes: 10,
    comments: [
        { user: 'Joey', text: 'This is very cool.' },
        { user: 'Leslie', text: 'How much? I want to go too!' },
        // ... other comments
    ],
},
{
  id: 3,
  imageUrl: require('../assets/advcove.jpg'),
  pfp: require('../assets/LOL.jpg'),
  username: 'Naomi Neo',
  timeposted: '2 hours ago',
  location: 'Adventure Cove',
  caption: 'Fun day out with the family at Singapore Adventure Cove!',
  likes: 10,
  comments: [
      { user: 'Joey', text: 'This is very cool.' },
      { user: 'Leslie', text: 'How much? I want to go too!' },
      // ... other comments
  ],
},
    // ... more posts ...
]);

const [reviews, setReviews] = useState([
  {
      id: 1,
      imageUrl: require('../assets/typebo.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      location: 'Marina Bay',
      business: 'Merlion',
      title: 'Scenic Paradise',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 2,
      imageUrl: require('../assets/typebo.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      location: 'Marina Bay',
      business: 'Merlion',
      title: 'Scenic Paradise',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 3,
      imageUrl: require('../assets/typebo.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      location: 'Marina Bay',
      business: 'Merlion',
      title: 'Scenic Paradise',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 4,
      imageUrl: require('../assets/typebo.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      location: 'Marina Bay',
      business: 'Merlion',
      title: 'Scenic Paradise',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
  // Add more review objects as needed
]);

const [trails, setTrails] = useState([
  {
      id: 1,
      imageUrl: require('../assets/typenu.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      title: 'Best travel view? Take a look!',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 2,
      imageUrl: require('../assets/typenu.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      title: 'Best travel view? Take a look!',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 3,
      imageUrl: require('../assets/typenu.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      title: 'Best travel view? Take a look!',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 4,
      imageUrl: require('../assets/typenu.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      title: 'Best travel view? Take a look!',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
    {
      id: 5,
      imageUrl: require('../assets/typenu.jpg'),
      pfp: require('../assets/LOL.jpg'),
      username: 'Naomi Neo',
      timeposted: '2 hours ago',
      title: 'Best travel view? Take a look!',
      description: "Nestled at the heart of Singapore's iconic Marina Bay stands a symbol that captures the spirit and grandeur of the Lion City – the majestic Merlion. A mythical creature with the head of a lion and the body of a fish, the Singapore Merlion is not just a tourist attraction; it is a cultural icon that embodies the rich history, strength, and maritime heritage of this vibrant city-state.",
      likes: 10,
    },
  // Add more review objects as needed
]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        let address = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
        
        // Extract relevant information (street name and country)
        const street = address[0]?.name || '';
        const country = address[0]?.country || '';
        
        // Set the location state with the obtained information
        setCurrentLocation(`${street}, ${country}`);
        
      } catch (error) {
        console.error('Error fetching location:', error.message);
        // Handle the error as needed
      }
    };

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once
    const navigation = useNavigation(); // Initialize the navigation object

    const handleHome = () => {
      navigation.navigate('Normal User');
    };

    const handlePOI = () => {
      navigation.navigate('Normal User POI');
    };

    const handleProfile = () => {
      navigation.navigate('Normal User More');
    };

    const handleSearch = () => {
      navigation.navigate('Normal User Search User');
    };

    const handleCreate = () => {
      navigation.navigate('Normal User Create');
    };

    const promos = [
      {
        id: 1,
        image: require('../assets/Hiltonlandingpage.jpg'),
        deals: '$10 OFF',
        type: 'Booking',
        valid: 'Valid for 1 Year',
      },
      {
        id: 2,
        image: require('../assets/GBB.jpg'),
        deals: '25% OFF',
        type: 'Booking',
        valid: 'Valid for 6 Months',
      },
      {
        id: 3,
        image: require('../assets/JUMBO.jpg'),
        deals: '1 Free Crab',
        type: 'Dine-in',
        valid: 'Valid for 1 Month',
      },
      {
        id: 4,
        image: require('../assets/btvbag.jpg'),
        deals: 'BOGO',
        type: 'Bags only',
        valid: 'Valid for 1 Month',
      },
    ];
//each tab shows what content
const renderContent = () => {
  if (activeTab === 'Posts') {
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
                    <MaterialIcons name="location-on" size={14} color="#000" />
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
                  name={likedPosts[index] ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={likedPosts[index] ? 'red' : '#333'}
                />
                <Text style={styles.interactionText}>Like</Text>
              </TouchableOpacity>
  
              {/* Comment section */}
              <View style={styles.commentSection}>
                {/* Existing comments */}
                {comments[index].map((comment, commentIndex) => (
                  <View key={commentIndex}>
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
                      handleAddComment(index, newComment);
                      setNewComment(''); // Clear the input after adding the comment
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
  } else if (activeTab === 'Reviews') {
    return (
      <View style={styles.postsContainer}>
        {reviews.map((review, index) => (
                    <View key={review.id} style={styles.instagramPostContainer}>
                <Image style={styles.postImage} source={review.imageUrl}/>
                <View style={styles.postContent}>
                    <View style={styles.userInfo}>
                        <Image style={styles.userAvatar} source={review.pfp}/>
                        <View>
                            <Text style={styles.userName}>{review.username}</Text>
                            <Text style={styles.postTime}>{review.timeposted}</Text>
                            <View style={styles.header}>
                              <MaterialIcons name="location-on" size={14} color="#000" />
                              <Text style={styles.postLocation}> {review.location}</Text>
                            </View>
                            <View style={styles.header}>
                              <MaterialIcons name="business" size={14} color="#000" />
                              <Text style={styles.postLocation}> {review.business}</Text>
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
                        name={likedPosts[index] ? 'favorite' : 'favorite-border'}
                        size={24}
                        color={likedPosts[index] ? 'red' : '#333'}
                      />
                      <Text style={styles.interactionText}>Like</Text>
                    </TouchableOpacity>

                  </View>
                  </View>
                ))}
      </View>
    );
  } else if (activeTab === 'Trails') {
    return (
      <View style={styles.postsContainer}>
        {trails.map((trail, index) => (
                    <View key={trail.id} style={styles.instagramPostContainer}>
                <Image style={styles.postImage} source={trail.imageUrl}/>
                <View style={styles.postContent}>
                    <View style={styles.userInfo}>
                        <Image style={styles.userAvatar} source={trail.pfp}/>
                        <View>
                            <Text style={styles.userName}>{trail.username}</Text>
                            <Text style={styles.postTime}>{trail.timeposted}</Text>
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
                        name={likedPosts[index] ? 'favorite' : 'favorite-border'}
                        size={24}
                        color={likedPosts[index] ? 'red' : '#333'}
                      />
                      <Text style={styles.interactionText}>Like</Text>
                    </TouchableOpacity>

                  </View>
                  </View>
                ))}
      </View>
    );
  } else if (activeTab === 'Promos') {
    return (
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <MaterialIcons name="whatshot" size={30} color="#FB7E3C" />
            <Text style={styles.modalHeaderText}>Exclusive Deals</Text>
          </View>
  
          <ScrollView >
            <View style={styles.scrollContainerPromo}>
              {promos.map((promo) => (
                <View style={styles.modalInnerContainer} key={promo.id}>
                  <View style={styles.halfCircleLeft}></View>
                  <View style={styles.halfCircleRight}></View>
                  <Image source={promo.image} style={styles.dealsImage} />
                  <View style={styles.dottedLine}></View>
                  <Text style={styles.dealsTop}>{promo.deals}</Text>
                  <Text style={styles.dealsMid}>{promo.type}</Text>
                  <Text style={styles.dealsBot}>{promo.valid}</Text>

                  {/* Redeem Button */}
                  <TouchableOpacity
                        style={styles.redeemButton}
                        onPress={() => handleRedeem(promo.id, promo.deals)}
                        disabled={redeemedStates[promo.id]} // Disable the button if it's already redeemed
                      >
                        <Text style={styles.redeemButtonText}>
                          {redeemedStates[promo.id] ? 'Redeemed' : 'Collect'}
                        </Text>
                      </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
    );
  }
};

const [redeemedStates, setRedeemedStates] = useState(false);

    const handleRedeem = (promoId, dealName) => {
      if (!redeemedStates[promoId]) {
        Alert.alert('Collection Success', `You have successfully collected ${dealName}.`);
  
        // Your redeem logic goes here
  
        // Update the state to mark this promo as redeemed
        setRedeemedStates((prevStates) => ({
          ...prevStates,
          [promoId]: true,
        }));
      }
    };

  const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));

  const handleLike = (index) => {
      const updatedLikes = [...likedPosts];
      updatedLikes[index] = !updatedLikes[index];
      setLikedPosts(updatedLikes);
  };


// Define state to hold the comments for each post
const [comments, setComments] = useState(Array(posts.length).fill([]));
const [newComment, setNewComment] = useState('');

// Assuming username is stored in state
const [username, setUsername] = useState('Catherine13'); // Set the initial username

const handleAddComment = (index, newComment) => {
  const updatedComments = [...comments];
  const newCommentObj = { username: username, text: newComment };
  updatedComments[index] = [...updatedComments[index], newCommentObj];
  setComments(updatedComments);
};

    return (
        <View style={styles.container}>
          <View style={styles.logoheader}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <Image source={require('../assets/LOGO.png')} style={styles.logo} />
          </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>

              <Text style={styles.mainText}>Explore Page</Text>
              <Text style={styles.OtherselectText}>What do you want to explore?</Text>

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
          <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'Promos' && styles.activeButton]}
          onPress={() => setActiveTab('Promos')}
        >
          <Text style={styles.toggleButtonText}>Promotions</Text>
        </TouchableOpacity>
        </View>

      {/* Render content based on the active tab */}
      {renderContent()}



                

              <View style={styles.footerImages}>
                <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
                <View style={styles.spacerfooter} />
                <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
                <View style={styles.spacerfooter} />
                <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
              </View>
              <Text style={{marginBottom: 20}}>&copy; 2023 TripAid</Text>   

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
    color: '#0A2753',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
    color: '#0066FF',
    fontWeight: 'bold',
  },
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: 15,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 20,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 14,
      color: '#6A778B',
    },
    logoheader: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 5,
      marginTop: 2,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    footerImages: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    footerImageHilton: {
      width: 53.84,
      height: 20,
      resizeMode: 'cover',
    },
    footerImageSIA: {
      width: 195.03,
      height: 20,
      resizeMode: 'cover',
      marginLeft: 17,
      marginRight: 17,
    },
    footerImageGBB: {
      width: 50,
      height: 47,
      resizeMode: 'cover',
    },

    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 5,
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

      mainText: {
        color: '#093D89',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    instagramPostContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      marginBottom: 20,
      width: '100%',
  },
  postImage: {
      width: 'auto',
      height: 200,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
  },
  postContent: {
      padding: 10,
  },
  postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  postDescription: {
      fontSize: 14,
      color: '#555',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
},
postTime: {
    fontSize: 12,
    color: '#888',
},
postLocation: {
  
  fontSize: 12,
  color: '#888',
},
postInteractions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
},
interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
},
interactionText: {
    marginLeft: 5,
    color: '#333',
},
toggleButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
  backgroundColor: '#030D45',
},
toggleButton: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
},
activeButton: {
  borderBottomColor: '#FB7E3C',
  borderBottomWidth: 5, 
},
toggleButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFF',
},
scrollContainerPromo: {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingBottom: 10, // Add some paddingBottom if needed
  width: 300,
},
fixedHeightContainer: {
  height: 490, // Adjust the height as needed
},
dealsImage: {
  width: 60,  // Adjust the width as needed
  height: 60, // Adjust the height as needed
  resizeMode: 'cover',
  marginLeft: 30,
  marginTop: 25,
},
dottedLine: {
  borderStyle: 'dotted',
  borderWidth: 1,
  borderRadius: 1,
  borderColor: 'rgba(102, 102, 102, 0.2)',
  height: 85,
  width: 0,
  marginLeft: 110,
  marginTop: -75,
},
modalContent: {
  backgroundColor: '#030D45',
  borderRadius: 8,
  padding: 20,
  width: 355,
  alignItems: 'center',
},
modalHeader: {
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 15,
},
modalHeaderText: {
  color: '#FB7E3C',
  fontSize: 24,
  fontWeight: 'bold',
  marginLeft: 10,
  marginTop: 8,
},
modaltext: {
  color: '#FB7E3C',
  fontSize: 16,
  marginLeft: 10,
  marginTop: 8,
},
closeButton: {
  marginTop: 20,
},
closeButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
},
modalInnerContainer: {
  width: 300,
  height: 104,
  borderRadius: 8,
  backgroundColor: '#FFF',
  marginBottom: 20
},
halfCircleLeft: {
  position: 'absolute',
  left: -10,
  top: '50%',
  marginTop: -8, // half the height of the half circle
  width: 32,
  height: 20,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundColor: '#030D45',
  transform: [{ rotate: '90deg' }], // Rotate the half circle
},
halfCircleRight: {
  position: 'absolute',
  right: -10,
  top: '50%',
  marginTop: -8, // half the height of the half circle
  width: 32,
  height: 20,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundColor: '#030D45',
  transform: [{ rotate: '-90deg' }], // Rotate the half circle
},
dealsTop: {
  color: '#000',
  fontSize: 24,
  fontWeight: 'bold',
  marginLeft: 126,
  marginTop: -75,
},
dealsMid: {
  color: '#000',
  fontSize: 16,
  marginLeft: 126,
  marginTop: 4,
},
dealsBot: {
  color: 'rgba(0, 0, 0, 0.3)',
  fontSize: 10,
  marginLeft: 126,
  marginTop: 6,
},
redeemButton: {
  position: 'absolute',
  top: 70,
  right: 0,
  padding: 5,
  backgroundColor: '#FB7E3C',
  borderRadius: 10,
  marginTop: 5, // Adjust the spacing as needed
  marginRight: 5,
},
redeemButtonText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
},
});

export default NormalUserScreen;