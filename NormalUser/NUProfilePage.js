import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NUProfilePage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      source: require('../assets/newton.jpg'), // Assuming NU.jpg is in the assets folder
      likes: 150,
      comments: 20,
    },
    {
      id: 2,
      source: require('../assets/advcove.jpg'), // Assuming NU.jpg is in the assets folder
      likes: 100,
      comments: 10,
    },
    {
      id: 3,
      source: require('../assets/fashion.jpg'), // Assuming NU.jpg is in the assets folder
      likes: 15,
      comments: 3,
    },
    // Add more posts as needed
  ]);

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

  const reviews = [
    {
      id: 1,
      locationImage: require('../assets/typebo.jpg'),
      title: 'Scenic Paradise',
      subtitle: 'An enchanting place with breathtaking views.',
      websiteLink: 'https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/',
      locationName: 'Merlion',
    },
    {
      id: 2,
      locationImage: require('../assets/zoo.jpg'),
      title: 'Valley of Animals',
      subtitle: 'Experience tranquility amidst nature.',
      websiteLink: 'https://www.mandai.com/en/singapore-zoo.html',
      locationName: 'Zoo',
    },
    // Add more review objects as needed
  ];

    const [followers, setFollowers] = useState(982); // Replace followers with useState
    const [following, setFollowing] = useState(1000); // Replace following with useState
    const [activeTab, setActiveTab] = useState('Posts'); // Track the active tab
  
    // Function to format numbers over 10,000 as 10k or 10m
    const formatNumber = (num) => {
      if (num >= 10000 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'k';
      } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'm';
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
      if (activeTab === 'Posts') {
        return (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postItem}>
                <Image style={styles.postImage} source={post.source} />
                <View style={styles.postStats}>
                  {/* Additional post details */}
                  <View style={styles.postActions}>
                    <TouchableOpacity>
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
                  </View>
                </View>
                <TouchableOpacity onPress={() => openLocationWebsite(review.websiteLink)}>
                  <Text style={styles.locationLink}>{review.locationName}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      } 
    };


    const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [originalBio, setOriginalBio] = useState(""); // State to store the original bio

  useEffect(() => {
    setOriginalBio(bio); // Store the initial bio when the component mounts
  }, []);

  // Function to handle the bio update
  const handleBioUpdate = (shouldSave) => {
    if (shouldSave) {
      setIsEditing(false); // Exit edit mode after updating
      // Save the updated bio
      setOriginalBio(bio); // Update the original bio to the new bio
    } else {
      setIsEditing(false); // Exit edit mode on cancel
      // Revert the bio to the original state
      setBio(originalBio);
    }
  };

  // JSX for the bio section based on edit mode
  const renderBioSection = () => {
    if (isEditing) {
      return (
        <View style={styles.bioEditContainer}>
          <TextInput
            style={styles.bioEditTextInput}
            multiline
            placeholder="Edit your bio..."
            value={bio}
            onChangeText={setBio}
          />
          <View style={styles.saveCancelContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleBioUpdate(true)} // Save the updated bio
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleBioUpdate(false)} // Cancel the edit
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <Text style={styles.bio}>
          {bio}
        </Text>
      );
    }
  };



  const handleHome = () => {
    navigation.navigate('Normal User');
  };

  const handlePOI = () => {
    navigation.navigate('Interest');
  };

  const handleProfile = () => {
    navigation.navigate('Normal User More');
  };

  const handleSearch = () => {
    navigation.navigate('Normal User Search User')
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
      <View style={styles.followCounts}>

        <View style={styles.followCountsinner}>
          <Text style={styles.followCountNumber}>{followers}</Text>
          <Text style={styles.followText}>Followers</Text>
        </View>
          <Image style={styles.profileImage} source={require('../assets/NU.jpg')} />
        <View style={styles.followCountsinner}>
          <Text style={styles.followCountNumber}>{following}</Text>
          <Text style={styles.followText}>Following</Text>
        </View>
      </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>Catherine13</Text>
            {renderBioSection()} 
            <View style={styles.actions}>
              {!isEditing && ( // Show Edit Profile button only in view mode
                <TouchableOpacity
                  style={styles.editProfileButton}
                  onPress={() => setIsEditing(true)} // Enable edit mode
                >
                  <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              )}
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
        
      </View>

      {/* Render content based on the active tab */}
      {renderContent()}
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    color: '#0366d6',
    textDecorationLine: 'underline',
    marginTop: 5, // Add margin top for spacing
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
});

export default NUProfilePage;
