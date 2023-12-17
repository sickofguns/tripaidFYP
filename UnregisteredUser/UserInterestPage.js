import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const UserInterestScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isFoodSelected, setIsFoodSelected] = useState(true); // Track Food selection state
    const [isAttractionsSelected, setIsAttractionsSelected] = useState(true); // Track Food selection state
    const [isTrailsSelected, setIsTrailsSelected] = useState(true); // Track Food selection state
    const [isLifestyleSelected, setIsLifestyleSelected] = useState(true); // Track Food selection state
    const [isFashionSelected, setIsFashionSelected] = useState(true); // Track Food selection state



    const handleContinuePress = () => {
      console.log('Selected Interests:', selectedInterests);
      navigation.navigate('Account Successfully Registered');
    };

    const handleInterestSelect = (interest, index) => {
      console.log('Selected Interest:', interest);
      const isSelected = selectedInterests.includes(interest);

      if (isSelected) {
        setSelectedInterests((prevSelected) => prevSelected.filter(item => item !== interest));
      } else {
        setSelectedInterests((prevSelected) => [...prevSelected, interest]);
      }
        // Update the respective interest's selection state
      switch (interest) {
        case 'Food':
          setIsFoodSelected(!isSelected);
          break;
        case 'Attractions':
          setIsAttractionsSelected(!isSelected);
          break;
        case 'Trails':
          setIsTrailsSelected(!isSelected);
          break;
        case 'Lifestyle':
          setIsLifestyleSelected(!isSelected);
          break;
        case 'Fashion':
          setIsFashionSelected(!isSelected);
          break;
        default:
          break;
      }
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.midContainer}>
                <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.selectText}>Explore with us</Text>
                <Text style={styles.OtherselectText}>Select your interest!</Text>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search your interest"
                            placeholderTextColor="#757575"
                        />
                </View>


                <TouchableOpacity
                  onPress={() => handleInterestSelect('Food')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isFoodSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >        
                <View>
                    <Image
                    source={require('../assets/food.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Food</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Attractions')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isAttractionsSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >     
                <View>
                    <Image
                    source={require('../assets/attractions.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Attractions</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Trails')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isTrailsSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >  
                <View>
                    <Image
                    source={require('../assets/trails.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Trails</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Lifestyle')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isLifestyleSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                >  
                <View>
                    <Image
                    source={require('../assets/lifestyle.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Lifestyle</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleInterestSelect('Fashion')}
                  style={[
                    styles.curvedContainer,
                    { backgroundColor: isFashionSelected ? '#0A2753' : 'transparent' }, // Adjust color based on selection
                  ]}
                > 
                <View>
                    <Image
                    source={require('../assets/fashion.jpg')}
                    style={styles.image}
                    />
                    <Text style={styles.textBehindImage}>Fashion</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                
            </View>
            <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
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
        marginBottom: 5,
      },
      OtherselectText: {
        color: '#0A2753',
        fontSize: 18,
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

    continueButton: {
      backgroundColor: '#030D45',
      borderRadius: 5,
      height: 50,
      width: 320,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default UserInterestScreen;