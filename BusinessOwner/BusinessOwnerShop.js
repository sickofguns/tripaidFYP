import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';



const BOShop = () => {
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

    const handleHome = () => {
      navigation.navigate('Business Owner');
    };

    const handlePOI = () => {
      navigation.navigate('POI');
    };

    const handleProfile = () => {
      navigation.navigate('Business Owner More');
    };

    const handleCreate = () => {
      navigation.navigate('Business Owner Create');
    }
    
    const handleUpcoming = () => {
        navigation.navigate('Business Owner All Listing');
    }

    const handlePromo = () => {
        navigation.navigate('Business Owner Promotion');
    }

    const handleShop = () => {
        navigation.navigate('Business Owner Shop');
      }
  
      const handleSearch = () => {
        navigation.navigate('Business Owner Search User');
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

              <Text style={styles.selectText}>Welcome Back!</Text>
                <Text style={styles.OtherselectText}>What would you want to do today?</Text>

             
                <TouchableOpacity onPress={() => handleUpcoming()} style={[styles.curvedContainer]}>        
                <View>
                    <Image
                    source={require('../assets/listing.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Current Listings</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePromo()} style={[styles.curvedContainer]}>       
                <View>
                    <Image
                    source={require('../assets/promo.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Current Promotions</Text>
                </View>
                </TouchableOpacity>

                
                <View style={styles.logofooter}>

              <View style={styles.footerImages}>
                <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
                <View style={styles.spacerfooter} />
                <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
                <View style={styles.spacerfooter} />
                <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
              </View>
              <Text style={{marginBottom: 20}}>&copy; 2024 TripAid</Text>   
              </View>
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

                {/* Shop */}
                <TouchableOpacity style={styles.footerItem} onPress={handleShop}>
                  <MaterialIcons name="shopping-bag" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Shop</Text>
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
    curvedContainer: {
        width: 300,
        height: 140,
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 30,
      },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.6, // Adjust the opacity level here (0 to 1)
      },
      textBehindImage: {
        position: 'absolute',
        zIndex: -1,
        color: 'blue',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        marginTop: 50, // Adjust the positioning of the text as needed
      },
    selectText: {
        color: '#0A2753',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
      },
      OtherselectText: {
        color: '#0A2753',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
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
logofooter: {
  alignItems: 'center',
  backgroundColor: '#ffffff',
  paddingVertical: 70,
},  
});

export default BOShop;