import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const BusinessTypeScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const handlePress = () => {
        navigation.navigate('Landing Page'); // Navigate to SignUp screen on button press
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                <Image source={require('./assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.selectText}>Identify your business</Text>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search your business type"
                            placeholderTextColor="#757575"
                        />
                </View>

                <TouchableOpacity onPress={handlePress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/hospitality.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Hospitality</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/fnb.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Food & Beverage</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/snr.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Sports & Recreation</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/retail.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Retail</Text>
                </View>
                </TouchableOpacity>

                
            </View>
            <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('./assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('./assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('./assets/GBB.jpg')} style={styles.footerImageGBB} />
          </View>
          <Text>&copy; 2023 TripAid</Text>
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
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 20,
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
        marginTop: 10,
      },
      selectText: {
        color: '#0A2753',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
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
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '90%',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        fontSize: 15,
        color: '#757575',
        flex: 1,
    },    
});

export default BusinessTypeScreen;