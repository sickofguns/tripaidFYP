import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



const UpgradetoLOLScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);


    const handleHome = () => {
      navigation.navigate('Normal User');
    };

    const handlePOI = () => {
      navigation.navigate('POI');
    };

    const handleProfile = () => {
      navigation.navigate('Normal User More');
    };

    const handleCU = () => {
      navigation.navigate('Contact Us');
    }

    const handleApply = () => {
      navigation.navigate('Application Received')
    }

    const handlepublish = () => {
        console.log('Title:', title);
        console.log('Thumbnail:', thumbnail);
        console.log('Description:', description);
        
        // Show alert on publishing itinerary
        alert('Itinerary published!');
        navigation.navigate('Normal User Itinerary'); // Navigate to Normal User More screen after publishing
      };

    const handleSearch = () => {
      navigation.navigate('Normal User Search User')
    }
    
    const itineraryData = [
          {
            title: 'Summer Trip at the Beach',
            description: 'This itinerary will guide you to the best hiking experience.',
            imageUrl: require('../assets/beach.jpg'),
          },
        // Add more itinerary items as needed
      ];

      const handleImageSelection = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
      
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!pickerResult.cancelled) {
          setThumbnail(pickerResult.uri);
        }
      };


    const [description, setDescription] = useState('');
      
    const handleDescriptionChange = (text) => {
        setDescription(text);
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
                            <Text style={styles.mainText}>Apply to be an LOL</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/* Added text */}
            <Text style={styles.congratsText}>
                Congratulations on hitting 1000 followers!
            </Text>
            <Text style={styles.shareText}>
                Share with us why you think you should be an LOL.
            </Text>
            <Text style={styles.reviewText}>
                *Application will be reviewed.
            </Text>

            <View style={styles.Detailscontainer}>
                <Text style={styles.titleText}>About yourself</Text>
                <TextInput
                    style={styles.detailinput}
                    multiline
                    numberOfLines={5}
                    placeholder="Enter details/description"
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
            </View>


                </ScrollView>
                    




                {/* Create Itinerary Button */}
                <TouchableOpacity style={styles.createButton} onPress={handleApply}>
                <Text style={styles.createButtonText}>Apply</Text>
                </TouchableOpacity>

              
                <Text style={{ marginBottom: 45 }}>&copy; 2023 TripAid</Text>

            </View>
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
                <TouchableOpacity style={styles.middleCircle}>
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
        color: '#0A2753',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },
    RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 85,
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
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      subText: {
        fontSize: 12,
        color: '#6C7A9C',
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 120,
        height: 80,
        borderRadius: 8,
        marginRight: 20,
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
        borderRadius: 5,
        height: 50,
        width: 320,
        marginTop: 20,
        marginBottom: 15,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      titleText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      inputContainer: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
      },
      input: {
        padding: 10,
        width: 350,
      },
      thumbnailContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      thumbnailText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      thumbnailBox: {
        width: 350,
        height: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnailImage: {
        width: 119,
        height: 116,
        borderRadius: 28,
      },
      addIcon: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      plus: {
        color: '#093D89',
        fontSize: 40,
      },
      addImageText: {
        color: '#6C7A9C',
        fontSize: 14,
        marginTop: 5,
      },
      Detailscontainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      detailinput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        padding: 10,
        width: 350,
        height: 200,
      },

      congratsText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 30,
    },
    shareText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 25,
    },
    reviewText: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 30,
    },
});

export default UpgradetoLOLScreen;