import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const AccountTypeScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const handleBusinessPress = () => {
        navigation.navigate('Business Type'); // Navigate to SignUp screen on button press
    };
    const handleNormalPress = () => {
        navigation.navigate('Interest'); // Navigate to SignUp screen on button press
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
                <Image source={require('./assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.selectText}>Select Account Type</Text>

                <TouchableOpacity onPress={handleNormalPress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/typelol.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Local Opinion Leader</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleBusinessPress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/typebo.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Business Owner</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNormalPress}>
                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/typenu.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Personal</Text>
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
    
});

export default AccountTypeScreen;