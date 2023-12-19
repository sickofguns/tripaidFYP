import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const LOLMoreScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const handleHome = () => {
      navigation.navigate('LOL');
    };

    const handlePOI = () => {
      navigation.navigate('Interest');
    };

    const handleProfile = () => {
      navigation.navigate('LOL More');
    };

    const handleCU = () => {
      navigation.navigate('Contact Us');
    }

    const handleLogoutPress = () => {
      navigation.navigate('Landing Page')
    }

    const handleSearch = () => {
      navigation.navigate('LOL Search User');
    }
    
    const iconData = [
        { icon: "person", label: "Profile", onPress: () => navigation.navigate('LOL Profile') },
        { icon: "message", label: "Message" },
        { icon: "event", label: "Bookings" },
        { icon: "assignment", label: "Itinerary", onPress: () => navigation.navigate('LOL Itinerary') },
        { icon: "insights", label: "Insights" },
        { icon: "help", label: "Privacy & Support" },
        { icon: "business", label: "Business Affiliate Page" },
        { icon: "settings", label: "Settings" },
        { icon: "mail", label: "Contact Us", onPress: () => navigation.navigate('Contact Us') },
    ];


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
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Account</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/LOL.jpg')} style={styles.RightpfpContainer} />
                    </View>

                    {/* List of Icons */}
                    <View style={styles.iconList}>
                        {iconData.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.iconItem} onPress={item.onPress}>
                                <MaterialIcons name={item.icon} size={24} color="#093D89" />
                                <Text style={styles.iconText}>{item.label}</Text>
                                {/* Right Arrow Icon */}
                                <MaterialIcons name="chevron-right" size={24} color="#093D89" />
                            </TouchableOpacity>
                        ))}
                    </View>

              

            


                
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
                      <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
              
                    <Text >&copy; 2023 TripAid</Text>

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
  
  
});

export default LOLMoreScreen;