import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const SABusinessCategoryScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object

    const handlePressHospitality = () => {
        navigation.navigate('Hospitality Sub Category'); // Navigate to SignUp screen on button press
    };
    const handlePressFNB = () => {
      navigation.navigate('Food & Beverage Sub Category'); // Navigate to SignUp screen on button press
    };
    const handlePressSNR = () => {
      navigation.navigate('Sports & Recreation Sub Category'); // Navigate to SignUp screen on button press
    };
    const handlePressRetail = () => {
      navigation.navigate('Retail Sub Category'); // Navigate to SignUp screen on button press
    };

    const handlePressHNW = () => {
      navigation.navigate('Health & Wellness Sub Category'); // Navigate to SignUp screen on button press
  };
  const handlePressTransport = () => {
    navigation.navigate('Transport Sub Category'); // Navigate to SignUp screen on button press
  };
  const handlePressTOURS = () => {
    navigation.navigate('Tours & Experiences Sub Category'); // Navigate to SignUp screen on button press
  };
  const handlePressEvents = () => {
    navigation.navigate('Events & Shows Sub Category'); // Navigate to SignUp screen on button press
  };

    const categories = [
      { id: 1, onPress: handlePressHospitality, image: require('../assets/hospitality.jpg'), category: 'Hospitality' },
      { id: 2, onPress: handlePressFNB, image: require('../assets/fnb.jpg'), category: 'Food & Beverage' },
      { id: 3, onPress: handlePressSNR, image: require('../assets/snr.jpg'), category: 'Sports & Recreation' },
      { id: 4, onPress: handlePressRetail, image: require('../assets/retail.jpg'), category: 'Retail' },
      { id: 5, onPress: handlePressHNW, image: require('../assets/hnw.jpg'), category: 'Health and Wellness' },
      { id: 6, onPress: handlePressTransport, image: require('../assets/transport.jpg'), category: 'Transport' },
      { id: 7, onPress: handlePressTOURS, image: require('../assets/tour.jpg'), category: 'Tours and Experiences' },
      { id: 8, onPress: handlePressEvents, image: require('../assets/events.jpg'), category: 'Events and Shows' },
    ];

    const CategoryButtons = () => {
      const [searchText, setSearchText] = useState('');
      const filteredCategories = categories.filter(category => category.category.toLowerCase().includes(searchText.toLowerCase()));
    

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
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                  />
                </View>

                {/* Display filtered categories */}
                {filteredCategories.map((item) => (
                  <TouchableOpacity key={item.id} onPress={item.onPress}>
                    <View style={styles.curvedContainer}>
                      <Image source={item.image} style={styles.image} />
                      <Text style={styles.textBehindImage}>{item.category}</Text>
                    </View>
                  </TouchableOpacity>
                ))}

                
            </View>
        </ScrollView>

            <View style={styles.footer}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
          <Text>&copy; 2024 TripAid</Text>
        </View>
        
    <StatusBar style="auto" />
    </View>
  );
};

return <CategoryButtons />;
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
    backText: {
      fontSize: 13,
      color: '#757575',
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
  },
});

export default SABusinessCategoryScreen;