import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const FashionScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

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
    
    
    // Assuming posts are fetched and stored in this array
    const [posts, setPosts] = useState([
      { id: 1, title: 'Post 1', description: 'Description for post 1' },
      { id: 2, title: 'Post 2', description: 'Description for post 2' },
      { id: 3, title: 'Post 3', description: 'Description for post 3' },
      { id: 4, title: 'Post 4', description: 'Description for post 4' },
      { id: 5, title: 'Post 5', description: 'Description for post 5' },
      { id: 6, title: 'Post 6', description: 'Description for post 6' },

      // ... more posts ...
  ]);

  const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));

  const handleLike = (index) => {
      const updatedLikes = [...likedPosts];
      updatedLikes[index] = !updatedLikes[index];
      setLikedPosts(updatedLikes);
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

              <Text style={styles.mainText}>Explore Fashion in SG!</Text>

              {/* Instagram Post Containers */}
              {posts.map((post, index) => (
                        <View key={post.id} style={styles.instagramPostContainer}>
                    <Image source={require('../assets/fashion.jpg')} style={styles.postImage} />
                    <View style={styles.postContent}>
                        <View style={styles.userInfo}>
                            <Image source={require('../assets/LOL.jpg')} style={styles.userAvatar} />
                            <View>
                                <Text style={styles.userName}>Naomi Neo</Text>
                                <Text style={styles.postTime}>Posted 2 hours ago</Text>
                                <View style={styles.header}>
                                  <MaterialIcons name="location-on" size={14} color="#000" />
                                  <Text style={styles.postLocation}>Sentosa Beach, Singapore</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.postTitle}>Beautiful Destination</Text>
                        <Text style={styles.postDescription}>
                            Stunning view of the beach at sunset. Fine City! Fun at Sentosa Beach.
                        </Text>
                        <View style={styles.postInteractions}>
                            <TouchableOpacity
                                style={styles.interactionButton}
                                onPress={() => handleLike(index)} // Pass index of the post to handleLike function
                            >
                                <MaterialIcons
                                    name={likedPosts[index] ? 'favorite' : 'favorite-border'}
                                    size={24}
                                    color={likedPosts[index] ? 'red' : '#333'}
                                />
                                <Text style={styles.interactionText}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.interactionButton}>
                                <MaterialIcons name="mode-comment" size={24} color="#333" />
                                <Text style={styles.interactionText}>Comment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                ))}

                
                


                

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
            
        
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
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
      alignItems: 'center',
      justifyContent: 'center',
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
        marginBottom: 30,
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
},
interactionText: {
    marginLeft: 5,
    color: '#333',
},
    
});

export default FashionScreen;