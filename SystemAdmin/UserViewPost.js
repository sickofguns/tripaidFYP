import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const UserSpecificPostScreen = () => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');


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

    const route = useRoute();

      
      const posts = [
        {
            imageUrl: require('../assets/advcove.jpg'),
            caption: 'Fun day out with the family at Singapore Adventure Cove!',
            location: 'Adventure Cove',
            likes: 10,
            comments: [
                { user: 'Joey', text: 'This is very cool.' },
                { user: 'Leslie', text: 'How much? I want to go too!' },
                // ... other comments
            ],
        },
    ];

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
const [username, setUsername] = useState('Naomi Neo'); // Set the initial username

const handleAddComment = (index, newComment) => {
    const updatedComments = [...comments];
    const newCommentObj = { username: username, text: newComment };
    updatedComments[index] = [...updatedComments[index], newCommentObj];
    setComments(updatedComments);
  };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
            <Image source={require('../assets/LOGO.png')} style={styles.logo} />


                
              {/* Account Information */}
                    <View style={styles.accountInfo}>
                        <View style={styles.accountTextContainer}>
                            <Text style={styles.mainText}>View</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Post</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {posts.map((item, index) => (
                            <View key={index}>
                                {/* Divider Line */}
                                <View style={styles.divider} />

                                {/* Image */}
                                <Image source={item.imageUrl} style={styles.image} />

                                {/* Title */}
                                <View style={styles.titleContainer}>

                                <View style={styles.splitContainer}>
                                    <View style={styles.topContainer}>
                                        <View style={styles.likesContainer}>

                                            <MaterialIcons name="location-on" size={20} color="#000" />
                                            <Text style={styles.subtitle}>{item.location}</Text>
                                        </View>

                                    </View>

                                </View>

                                    <Text style={styles.caption}>{item.caption}</Text>
                                    
                                    </View>
                                 

                                {/* Divider Line */}
                                <View style={styles.divider} />

                                {/* Comment section */}
                                <View style={styles.commentSection}>
                                {/* All comments (existing + new) */}
                                {[...item.comments, ...comments[index]].map((comment, commentIndex) => (
                                    <View key={commentIndex}>
                                    <Text style={styles.commentText}>
                                        {comment.user || comment.username}: {comment.text}
                                    </Text>
                                    </View>
                                ))}

                                </View>
                                
                            </View>
                        ))}
                    </ScrollView>
              
                <Text style={{ marginBottom: 45 }}>&copy; 2023 TripAid</Text>

          
        </View>
        
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
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
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 10,
      marginTop: -25,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    
    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        flexDirection: 'column',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Aligns items to the left
        paddingHorizontal: 20,
        marginBottom: 20,
        height: 30, // Increased height for better alignment
    },
    accountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },
    RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 130,
    },

    logoutButton: {
      backgroundColor: '#FB7E3C',
      borderRadius: 5,
      height: 50,
      width: 320,
      marginTop: 20,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    logoutButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itineraryContainer: {
        paddingHorizontal: 50,
        paddingTop: 20,
        flexDirection: 'row',
        borderTopWidth: 3,
        borderTopColor: '#6C7A9C',
        marginTop: 5,
        marginBottom:5,
      },
      textContainer: {
        marginBottom: 10,
        flexDirection: 'column',
        maxWidth: '100%',
      },
      caption: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '100%', // Adjust the maximum width as needed
      },
      subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#030D45',
        flexWrap: 'wrap',
        maxWidth: '100%', // Adjust the maximum width as needed
      },
      subText: {
        fontSize: 14,
        color: '#6C7A9C',
        flexWrap: 'wrap',
        maxWidth: '100%', // Adjust the maximum width as needed
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 328,
        height: 185,
        borderRadius: 30,
        marginTop: 10,
        alignSelf: 'center'
        // Other image styles
      },
      titleContainer: {
        padding: 10,
    },
    divider: {
        borderBottomWidth: 3,
        borderBottomColor: '#6C7A9C',
        marginHorizontal: 10,
        marginTop: 5,
    },
    contentContainer: {
        padding: 10,
    },
    viewContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    viewContentText: {
            fontSize: 16,
            color: '#6C7A9C',
            flexWrap: 'wrap',
    },
      viewContentButton: {
        backgroundColor: '#FB7E3C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
      },
      viewContentText: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 3,
      },
      arrowContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        flexDirection: 'row',
      },
      createButton: {
        backgroundColor: '#030D45',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      likesContainer: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically
        marginBottom: 5,
    },
    topContainer: {
        flexDirection: 'column', // Align items horizontally
    },
    splitContainer: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between', // Add this line
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
        marginTop: 15,
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
});

export default UserSpecificPostScreen;