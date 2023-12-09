import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const BusinessCategoryScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object

    const handlePress = () => {
        navigation.navigate('Landing Page'); // Navigate to SignUp screen on button press
    };

    return (
        <View style={styles.container}>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                
                <Text style={styles.selectText}>Business Category</Text>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Category"
                            placeholderTextColor="#757575"
                        />
                </View>

                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/hospitality.jpg')}
                    style={styles.image}
                    />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.editIconContainer}>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        color="#FFF"
                        style={styles.editIcon}
                    />
                    </View>
                </TouchableOpacity>
                    <Text style={styles.textBehindImage}>Hospitality</Text>
                </View>

                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/fnb.jpg')}
                    style={styles.image}
                    />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.editIconContainer}>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        color="#FFF"
                        style={styles.editIcon}
                    />
                    </View>
                </TouchableOpacity>
                    <Text style={styles.textBehindImage}>Food & Beverage</Text>
                </View>

                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/snr.jpg')}
                    style={styles.image}
                    />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.editIconContainer}>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        color="#FFF"
                        style={styles.editIcon}
                    />
                    </View>
                </TouchableOpacity>
                    <Text style={styles.textBehindImage}>Sports & Recreation</Text>
                </View>

                <View style={styles.curvedContainer}>
                    <Image
                    source={require('./assets/retail.jpg')}
                    style={styles.image}
                    />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.editIconContainer}>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        color="#FFF"
                        style={styles.editIcon}
                    />
                    </View>
                </TouchableOpacity>
                    <Text style={styles.textBehindImage}>Retail</Text>
                </View>

                
            </View>
        </ScrollView>

            <View style={styles.footer}>
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

      editIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        padding: 4,
        marginRight: 10,
        marginBottom: 5,
      },
      editIcon: {
        // Style for the edit icon
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

export default BusinessCategoryScreen;