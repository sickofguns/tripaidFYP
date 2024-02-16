import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { db, storage } from "../firebaseConfig"; // need call Storage from Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // need
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";


const LOLEditReviewScreen = ({ route }) => {
  const { user } = useAppContext();
  const { review } = route.params || {};
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

   const [category, setCategory] = useState('');
    const [business, setBusiness] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState('');

    const handleHome = () => {
      navigation.navigate('LOL');
    };

    const handlePOI = () => {
      navigation.navigate('LOL POI');
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

    const fetchUSERNAMEByCategoryandID = async (category, id) => {
      try {
          // Reference to the "businesses" collection in Firebase
          const businessesCollection = collection(db, "users");
  
          // Query to filter by category, type, and business name
          const q = query(
              businessesCollection,
              where("category", "==", category),
              where("type", "==", "business"),
              where("id", "==", id)
          );
  
          // Get the documents that match the query
          const querySnapshot = await getDocs(q);
  
          // If there is a matching document, return the business name
          if (!querySnapshot.empty) {
              return querySnapshot.docs[0].data().username; // Assuming the username field holds the business name
          } else {
              // If no matching document is found, return undefined
              return undefined;
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
          // You can throw an error here or return undefined
          // depending on your error handling strategy
          return undefined;
      }
  };

  const handlepublish = () => {
    // Validate if the required fields are filled
    if (!place || place === 'Select a location' || !category || !business || business === 'No business found' || business === '' || !title || !thumbnail || !description) {
      alert("Please fill in all required fields (Category, Business, Location, Title, Thumbnail and Details) before publishing.");
      return;
    }
  
    // STORING IMAGE IN FIREBASE-STORAGE //
    const response = fetch(thumbnail);
    response.then(response => response.blob())
      .then(blob => {
        const imageName = `post_${Date.now()}`;
        const storageRef = ref(storage, 'images/' + imageName);
        return uploadBytes(storageRef, blob);
      })
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(downloadURL => {
        console.log('File available at', downloadURL);
  
        // Extract review details from the form
        const updatedReview = {
          category,
          business,
          title,
          location: place,
          thumbnail: downloadURL, // Use the downloadURL instead of the thumbnail
          description,
        };
  
        // Update the review in the database
        return updateDoc(doc(db, 'reviews', review.id), updatedReview);
      })
      .then(() => {
        // Show alert on successful publishing
        alert("Review updated!");
        navigation.navigate("LOL"); // Navigate to Normal User More screen after publishing
      })
      .catch(error => {
        console.error("Error updating review:", error);
        // Handle the error as needed
      });
  };

    const handleSearch = () => {
      navigation.navigate('LOL Search User')
    }

    const handleImageSelection = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setThumbnail(pickerResult.uri);
        }
    };
      
    const handleDescriptionChange = (text) => {
        setDescription(text);
    };

    const [type, setType] = useState('');

    const handleTypeSelection = (selectedType) => {
        setType(selectedType);
    };

    const renderDataPicker = () => {
      const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            switch (category) {
              case "Accomodation":
              case "Food":
              case "Attraction":
              case "Tours":
              case "Retail":
              case "Lifestyle":
              case "Transport":
              case "Events":
                const fetchedData = await fetchDataByCategory(category);
                setData(fetchedData);
                break;
              default:
                setData([]);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error as needed
          }
        };
    
        fetchData();
      }, [category]);
    
      return data.map((item, index) => (
        <Picker.Item key={index} label={item.businessName} value={item.businessuserId} />
      ));
    };
  
    const renderCategoryOption = (option) => {
      const isSelected = category === option;
  
      return (
        <View style={styles.radioOption} key={option}>
          <TouchableOpacity
            onPress={() => setCategory(option)}
            style={[
              styles.radioButton,
              isSelected ? styles.radioButtonSelected : {},
            ]}
          >
            {isSelected && <View style={styles.dot} />}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>{option}</Text>
        </View>
      );
    };
  
    const fetchDataByCategory = async (category) => {
      let data = [];
    
      try {
        // Reference to the "users" collection in Firebase
        const usersCollection = collection(db, "users");
    
        // Query to filter by category and type
        const q = query(
          usersCollection,
          where("category", "==", category),
          where("type", "==", "business")
        );
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Extract data from the documents
        querySnapshot.forEach((doc) => {
          const businessData = doc.data();
          data.push({
            businessName: businessData.username, // Assuming the username field holds the business name
            businessuserId: doc.id, // Use the document id as the user id for the business
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
        // You can throw an error here or return an empty array
        // depending on your error handling strategy
      }
    
      return data.length > 0 ? data : [{ businessName: "No business found", userId: "" }];
    };
    
    const locations = ['North', 'South', 'East', 'West', 'Central', 'North-East', 'North-West', 'South-East', 'South-West'];
    const [place, setPlace] = useState("");
    
    const [pfp, setpfp] = useState(null);

  const fetchProfilePicture = async () => {
    try {
      const socialsCollection = collection(db, "users");
      const socialQuery = query(socialsCollection, where("id", "==", user.id));
      const querySnapshot = await getDocs(socialQuery);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const pfpURL = userData.pfp || require("../assets/pfp.png"); // If pfp doesn't exist, provide a default value
  
        // Update state with the profile picture URL
        setpfp(pfpURL);
      } else {
        console.log("No matching user found in the socials collection.");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      // Handle the error as needed
    }
  };
  
  // Call the fetchProfilePicture function when the component mounts
  useEffect(() => {
    fetchProfilePicture();
  }, []);

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
                            <Text style={styles.mainText}>Edit</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Review</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        {user.pfp ? (
              <Image
                style={styles.RightpfpContainer}
                source={{ uri: pfp }} // Use user.pfp if available
                />
            ) : (
              <Image
                style={styles.RightpfpContainer}
                source={require("../assets/pfp.png")} // Provide default image source
              />
            )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Category</Text>

            <View style={styles.OptionsContainer}>
              {renderCategoryOption("Accomodation")}
              {renderCategoryOption("Food")}
              {renderCategoryOption("Retail")}
              {renderCategoryOption("Tours")}
            </View>
            <View style={styles.OptionsContainer}>
              {renderCategoryOption("Attraction")}
              {renderCategoryOption("Transport")}
              {renderCategoryOption("Lifestyle")}
              {renderCategoryOption("Events")}

            </View>

            <Text style={styles.titleText}>Business</Text>
            <Picker
              selectedValue={business}
              onValueChange={(itemValue) => setBusiness(itemValue)}
              style={[styles.picker, { height: 40 }]}
              itemStyle={{ fontSize: 18 }}
            >
              {renderDataPicker()}
            </Picker>

            <Text style={styles.titleText}>Location</Text>
              {/* Location Dropdown */}
              <Picker
                selectedValue={place}
                onValueChange={(itemValue, itemIndex) => setPlace(itemValue)}
                style={[styles.picker, { height: 40 }]}
                itemStyle={{ fontSize: 18 }}
              >
                <Picker.Item label="Select a location" value="" />
                {locations.map((loc, index) => (
                  <Picker.Item key={index} label={loc} value={loc} />
                ))}
              </Picker>

            <Text style={styles.titleText}>Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
          </View>

          <View style={styles.thumbnailContainer}>
            <Text style={styles.thumbnailText}>Thumbnail</Text>
            <TouchableOpacity
              style={styles.thumbnailBox}
              onPress={handleImageSelection}
            >
              {thumbnail ? (
                <Image
                  source={{ uri: thumbnail }}
                  style={styles.thumbnailImage}
                />
              ) : (
                <>
                  <View style={styles.addIcon}>
                    <Text style={styles.imageplus}>+</Text>
                  </View>
                  <Text style={styles.addImageText}>
                    Add image for thumbnail
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.Detailscontainer}>
            <Text style={styles.titleText}>Details/Descriptions</Text>
            <TextInput
              style={styles.detailinput}
              multiline
              numberOfLines={5}
              placeholder="Enter details/description"
              value={description}
              onChangeText={handleDescriptionChange}
            />
          </View>
        </ScrollView>
                    
                {/* Create Itinerary Button */}
                <TouchableOpacity style={styles.createButton} onPress={handlepublish}>
                <Text style={styles.createButtonText}>Update Review</Text>
                </TouchableOpacity>

              
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
    picker: {
        height: 40,
        width: 350,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        marginBottom: 20,
        paddingHorizontal: 10,
        overflow: 'hidden',
        justifyContent: 'center',

    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000', // Customize the border color for unselected state
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: '#FB7E3C', // Customize the border color for selected state
    },
    radioLabel: {
        fontSize: 16,
        color: '#000',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FB7E3C', // Color of the dot
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -5 }, { translateY: -5 }], // Adjust position to center the dot
    },
    OptionsContainer: {
        flexDirection: 'row', // Display items horizontally
        justifyContent: 'space-evenly', // Adjust space between items
        marginBottom: 10, // Add margin if needed
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
      subText: {
        fontSize: 12,
        color: '#6C7A9C',
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 120,
        height: 80,
        borderRadius: 8,
        marginRight: 20,
      },
      viewContentButton: {
        backgroundColor: '#FB7E3C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
      },
      viewContentText: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 3,
      },
      arrowContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        flexDirection: 'row',
      },
      createButton: {
        backgroundColor: '#030D45',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 10,
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      titleText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      inputContainer: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
      },
      input: {
        padding: 10,
        width: 350,
      },
      thumbnailContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      thumbnailText: {
        fontSize: 18,
        color: '#0A2753',
        marginBottom: 5,
        fontWeight: 'bold',
      },
      thumbnailBox: {
        width: 350,
        height: 120,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnailImage: {
        width: 119,
        height: 116,
        borderRadius: 28,
      },
      addIcon: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageplus: {
        color: '#093D89',
        fontSize: 40,
      },
      addImageText: {
        color: '#6C7A9C',
        fontSize: 14,
        marginTop: 5,
      },
      Detailscontainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      detailinput: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        padding: 10,
        width: 350,
        height: 130,
      },
});

export default LOLEditReviewScreen;