import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Location from 'expo-location';



const LOLInboxMessageScreen = () => {
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
      navigation.navigate('LOL');
    };

    const handlePOI = () => {
      navigation.navigate('POI');
    };

    const handleProfile = () => {
      navigation.navigate('LOL More');
    };

    const handleCU = () => {
      navigation.navigate('Contact Us');
    }

    const handleLogout = () => {
      navigation.navigate('Landing Page')
    }

    const handlecreate = () => {
      navigation.navigate('LOL Create Itinerary'); // Navigate to SignUp screen on button press
    };

    const handleSearchUser = () => {
      navigation.navigate('LOL Search User')
    }
    
    const [chats, setChats] = useState([
      { id: 1, sender: 'John', message: 'Hey, how are you?' },
      { id: 2, sender: 'Alice', message: 'Hi! I\'m good, thanks.' },
      { id: 3, sender: 'Bob', message: 'What are you up to today?' },
    ]);
  
    const [contacts, setContacts] = useState([
      { id: 101, name: 'Jane Doe', profilePicture: require('../assets/NU.jpg') },
      { id: 102, name: 'John Smith', profilePicture: require('../assets/NU.jpg') },
      { id: 103, name: 'Alice Johnson', profilePicture: require('../assets/NU.jpg') },
    ]);
  
    const [selectedContact, setSelectedContact] = useState(null);
    const [newMessage, setNewMessage] = useState('');
  
    const handleSendMessage = () => {
      if (!selectedContact) {
        // Handle case where no contact is selected
        return;
      }
  
      const newChat = {
        id: chats.length + 1,
        sender: 'Current User', // Replace with authenticated user's name
        message: newMessage,
      };
  
      setChats([...chats, newChat]);
      setNewMessage('');
    };
  
    const Chats = () => {
      const renderChatItem = ({ item }) => (
        <View style={styles.chatContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.senderText}>{item.sender}:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        </View>
      );
  
      return (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChatItem}
          contentContainerStyle={styles.scrollContainer}
          inverted={true}
        />
      );
    };
  
    const Contacts = () => {
      const renderContactItem = ({ item }) => (
        <TouchableOpacity
          style={[
            styles.contactContainer,
            selectedContact && selectedContact.id === item.id && { backgroundColor: '#DCF8C6' },
          ]}
          onPress={() => setSelectedContact(item)}
        >
          <Image source={item.profilePicture} style={styles.profilePicture} />
          <Text style={[styles.contactText, selectedContact && selectedContact.id === item.id && { color: '#0A2753' }]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    
      return (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderContactItem}
          contentContainerStyle={styles.scrollContainer} // <-- Change here
        />
      );
    };
    
  
    const initialLayout = { width: 0, height: 0 };
  
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'chats', title: 'Chats' },
      { key: 'contacts', title: 'Contacts' },
    ]);
  
    const renderScene = SceneMap({
      chats: Chats,
      contacts: Contacts,
    });

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
                            <Text style={styles.mainText}>Your</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Inbox</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>


           
            <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
        {selectedContact && (
          <TouchableOpacity style={styles.userProfile} onPress={() => {/* Handle user profile click */}}>
            <Image source={selectedContact.profilePicture} style={styles.profilePicture} />
            <Text style={styles.username}>{selectedContact.name}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#0A2753" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.midContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />

        {index === 0 && selectedContact && (
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder={`Message ${selectedContact.name}...`}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <MaterialIcons name="send" size={24} color="#0A2753" />
            </TouchableOpacity>
          </View>
        )}
        </View>                    



              
                <Text style={{ marginBottom: 45 }}>&copy; 2024 TripAid</Text>

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
                <TouchableOpacity style={styles.footerItem} onPress={handleSearchUser}>
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
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
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
      RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 130,
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
      selectText: {
        color: '#0A2753',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      chatContainer: {
        alignItems: 'flex-end',
        marginVertical: 8,
      },
      messageBubble: {
        backgroundColor: '#DCF8C6',
        padding: 8,
        borderRadius: 10,
        maxWidth: '80%',
      },
      senderText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
      },
      messageText: {
        fontSize: 16,
        color: '#333',
      },
      contactContainer: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        padding: 10,
        width: '100%',
      },
      contactText: {
        fontSize: 16,
        color: '#333',
      },
      messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderColor: '#DDD',
      },
      messageInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 8,
      },
      sendButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#0A2753',
      },
});

export default LOLInboxMessageScreen;
