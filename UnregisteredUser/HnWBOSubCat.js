import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore/lite";


const BOSubCategoryHnWScreen = ({ route }) => {
    const { userId } = route.params || {}
    const navigation = useNavigation(); // Initialize the navigation object

    const handlePress = (subcategory) => {
      const usersDB = collection(db, "users");
      const docRef = doc(usersDB, userId);
      updateDoc(docRef, {
        id: userId,
        subcategory: subcategory,
      }).then(() => {
        navigateToSubBusiness(subcategory);
      });
    };

    const navigateToSubBusiness = (subcategory) => {
      if (subcategory === 'Fitness Centers') {
        navigation.navigate('Account Successfully Registered', { userId });
      } else if (subcategory === 'Wellness and Spa') {
        navigation.navigate('Account Successfully Registered', { userId });
      } else if (subcategory === 'Massage') {
        navigation.navigate('Account Successfully Registered', { userId });
      }else if (subcategory === 'Pharmacies') {
        navigation.navigate('Account Successfully Registered', { userId });
      }else if (subcategory === 'Healthcare') {
        navigation.navigate('Account Successfully Registered', { userId });
      }
        };

    const subcategories = [
      { id: 1, onPress: () => handlePress('Fitness Centers'), image: require('../assets/fitness.jpg'), category: 'Fitness Centers' },
      { id: 2, onPress: () => handlePress('Wellness and Spa'), image: require('../assets/wellness.jpg'), category: 'Wellness and Spa' },
      { id: 3, onPress: () => handlePress('Massage'), image: require('../assets/massage.jpg'), category: 'Massage' },
      { id: 4, onPress: () => handlePress('Pharmacies'), image: require('../assets/pharmacy.jpg'), category: 'Pharmacies' },
      { id: 5, onPress: () => handlePress('Healthcare'), image: require('../assets/healthcare.jpg'), category: 'Healthcare' },
    ];

    const CategoryButtons = () => {
      const [searchText, setSearchText] = useState('');
      const filteredCategories = subcategories.filter(category => category.category.toLowerCase().includes(searchText.toLowerCase()));
    
    return (
        <View style={styles.container}>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                
                <Text style={styles.selectText}>Health & Wellness {'\n'} Sub-Business</Text>

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

                {/* Display filtered subcategories */}
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
});

export default BOSubCategoryHnWScreen;