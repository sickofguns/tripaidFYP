import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const BOCategoryScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object
    const [location, setLocation] = useState('');

    const handlePressHospitality = () => {
        navigation.navigate('Business Registration SubCategory - Hospitality'); // Navigate to SignUp screen on button press
    };
    const handlePressFNB = () => {
      navigation.navigate('Business Registration SubCategory - Food & Beverage'); // Navigate to SignUp screen on button press
    };
    const handlePressSNR = () => {
      navigation.navigate('Business Registration SubCategory - Sports & Recreation'); // Navigate to SignUp screen on button press
    };
    const handlePressRetail = () => {
      navigation.navigate('Business Registration SubCategory - Retail'); // Navigate to SignUp screen on button press
    };

    const categories = [
      { id: 1, onPress: handlePressHospitality, image: require('../assets/hospitality.jpg'), category: 'Hospitality' },
      { id: 2, onPress: handlePressFNB, image: require('../assets/fnb.jpg'), category: 'Food & Beverage' },
      { id: 3, onPress: handlePressSNR, image: require('../assets/snr.jpg'), category: 'Sports & Recreation' },
      { id: 4, onPress: handlePressRetail, image: require('../assets/retail.jpg'), category: 'Retail' },
    ];

    const CategoryButtons = () => {
      const [searchText, setSearchText] = useState('');
      const filteredCategories = categories.filter(category => category.category.toLowerCase().includes(searchText.toLowerCase()));
    
    
    
    return (
        <View style={styles.container}>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                
                <Text style={styles.selectText}>Choose {'\n'}
                Business Category</Text>

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
          <Text>&copy; 2023 TripAid</Text>
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
      marginTop: -20,
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

export default BOCategoryScreen;