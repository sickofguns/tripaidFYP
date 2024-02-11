import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar, Modal, TouchableOpacity, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import PieChart from '../StatisticsData/BOPieChart';
import * as Location from 'expo-location';
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc, 
} from "firebase/firestore/lite";

const BOLandingPageScreen = () => {
    // remove console.log("App executed");
  console.log("App executed");
  const { user } = useAppContext();

  //location
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message

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
  
 //////////////////////////////////////////////////////////////////////////////// user count
 const [nuCount, setNuCount] = useState(0);
 const [boCount, setBoCount] = useState(0);
 const [lolCount, setLolCount] = useState(0);
 const [totalUserCount, setTotalUserCount] = useState(0);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const usersCollection = collection(db, 'users');
       const snapshot = await getDocs(usersCollection);
 
       const personalUsers = snapshot.docs.filter(doc => {
         const userRole = doc.data().type; // Adjust this based on your actual data structure
         return userRole === 'personal' && !doc.data().verify;
       });
 
       const businessUsers = snapshot.docs.filter(doc => {
         const userRole = doc.data().type; // Adjust this based on your actual data structure
         return userRole === 'business' && doc.data().verify;
       });
 
       const lolUsers = snapshot.docs.filter(doc => {
         const userRole = doc.data().type; // Adjust this based on your actual data structure
         return userRole === 'personal' && doc.data().lol && doc.data().verify;
       });
 
       setNuCount(personalUsers.length);
       setBoCount(businessUsers.length);
       setLolCount(lolUsers.length);
       setTotalUserCount(personalUsers.length + businessUsers.length + lolUsers.length);
     } catch (error) {
       console.error('Error fetching user data:', error);
     }
   };
 
   fetchData();

   
   // Clean up resources if needed
 }, []); // No need to include userData in the dependency array if it's not changing during the component's lifecycle
 
  //////////////////////////////////////////////////////////////////////
  const [genderData, setGenderData] = useState([]);

const fetchGenderData = async () => {
  try {
    const usersCollection = collection(db, 'users');

    const userQuery = query(
      usersCollection,
      where('type', '==', 'personal'),
    );

    const userSnapshot = await getDocs(userQuery);

    // Use a map to count occurrences of each gender
    const genderCountMap = new Map();

    // Iterate through the documents and count genders
    userSnapshot.forEach((doc) => {
      const userGender = doc.data().gender;

      if (userGender) {
        // Increment the count for the gender or initialize to 1 if not present
        genderCountMap.set(userGender, (genderCountMap.get(userGender) || 0) + 1);
      }
    });

    // Convert the map to an array of objects with label and value properties
    const genders = Array.from(genderCountMap).map(([label, value]) => ({
      label,
      value,
    }));

    setGenderData(genders);

    console.log(genders);
  } catch (error) {
    console.error('Error fetching genders:', error);
  }
};

useEffect(() => {
  // Fetch gender data when the component mounts
  fetchGenderData();
}, []);

//////////////////////////////////////////////////////////////////////////////// data category display 

const [categoryData, setCategoryData] = useState([]);

// Assuming you have a function to fetch category data from Firebase
const fetchCategoryData = async () => {
  try {
    const usersCollection = collection(db, 'users');

    const userQuery = query(
      usersCollection,
      where('type', '==', 'business'),
      where('verify', '==', true)
    );

    const userSnapshot = await getDocs(userQuery);

    // Use a map to count occurrences of each category
    const categoryCountMap = new Map();

    // Iterate through the documents and count categories
    userSnapshot.forEach((doc) => {
      const userCategory = doc.data().category;

      if (userCategory) {
        // Increment the count for the category or initialize to 1 if not present
        categoryCountMap.set(userCategory, (categoryCountMap.get(userCategory) || 0) + 1);
      }
    });

    // Convert the map to an array of objects with label and value properties
    const categories = Array.from(categoryCountMap).map(([label, value]) => ({
      label,
      value,
    }));

    setCategoryData(categories);

    console.log(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

useEffect(() => {
  // Fetch category data when the component mounts
  fetchCategoryData();
}, []);

//////////////////////////////////////////////////////////////////////////////// data category display 

const [countryData, setCountryData] = useState([]);

// Assuming you have a function to fetch country data from Firebase
const fetchCountryData = async () => {
  try {
    const usersCollection = collection(db, 'users');

    const userQuery = query(
      usersCollection,
      where('type', '==', 'personal'),
    );

    const userSnapshot = await getDocs(userQuery);

    // Use a map to count occurrences of each country
    const countryCountMap = new Map();

    // Iterate through the documents and count countries
    userSnapshot.forEach((doc) => {
      const userCountry = doc.data().country;

      if (userCountry) {
        // Increment the count for the country or initialize to 1 if not present
        countryCountMap.set(userCountry, (countryCountMap.get(userCountry) || 0) + 1);
      }
    });

    // Convert the map to an array of objects with label and value properties
    const countries = Array.from(countryCountMap).map(([label, value]) => ({
      label,
      value,
    }));

    setCountryData(countries);

    console.log(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

useEffect(() => {
  // Fetch country data when the component mounts
  fetchCountryData();
}, []);

/////////////////////////////////////////////////////

  const pieChartColors = [
    '#FB7E3C', '#FAC28B', '#F1E7EC', '#C49E92', '#AA7C7E', '#805454', '#4C5C68', '#336E7D', '#195C91', '#0A4982', '#053D73', '#032E64', '#021F55', '#011B46', '#011036', '#000C26', '#00061B', '#000012', 
    '#FF914E', '#FBD59D', '#D0B78F', '#C9A2A3', '#AF808E', '#865964', '#516277', '#38798B', '#1E679F', '#0F548F', '#09487F', '#08396F', '#072A61', '#062651', '#061B41', '#051731', '#050B26', '#05001D', 
    '#FFA15E', '#FCE7AF', '#D4BA9F', '#CEA6B3', '#B4859E', '#8C5D74', '#566785', '#3D839A', '#2372AD', '#145F9C', '#0D538B', '#0D447A', '#0C356C', '#0B315C', '#0B264C', '#0A223C', '#0A1131', '#0A0028', 
    '#FFB370', '#FDF8C1', '#D9BEAF', '#D3AAC3', '#B98AAB', '#916283', '#5B7194', '#428EAA', '#287DBB', '#196AA9', '#126E97', '#125F86', '#114077', '#104C68', '#103157', '#0F2D47', '#0F1C3C', '#0F0033', 
    '#FFC382', '#FEFAD2', '#DEC2C0', '#D8AED4', '#BE8EBB', '#976693', '#607CA3', '#4799B9', '#2D88C9', '#1E75B6', '#1779A2', '#176A91', '#164B82', '#155773', '#153C62', '#143852', '#142747', '#14003E', 
    '#FFD193', '#FFFCE4', '#E2C5D0', '#DDA2E4', '#C392CB', '#9C6AA2', '#6687B1', '#4CA3C7', '#3293D7', '#2370C2', '#1C83AE', '#1C759C', '#1B558D', '#1A628E', '#1A476D', '#19435D', '#193252', '#190049', 
    '#FFDFA5', '#E5D9A7', '#E7C9E1', '#E29DE1', '#C897DA', '#A26FB2', '#6B91C0', '#51AED6', '#379EE5', '#2865C8', '#218EB9', '#2170A2', '#204098', '#1F6DA9', '#1F5278', '#1E4E68', '#1E3D5D', '#1E0054', 
    '#FFEDA7', '#E8DBB8', '#ECCDE1', '#E797E0', '#CE9CEA', '#A774C2', '#709CCF', '#56B9E4', '#3CA8F3', '#2D5ACD', '#2699C4', '#2665A7', '#253BA3', '#2468B5', '#244D83', '#234973', '#234868', '#23005F', 
    '#FFFBB9', '#EBE0C9', '#F1D1F2', '#EC91DE', '#D3A1F9', '#AC79D1', '#75A7DD', '#5BC3F2', '#41B3FF', '#324FD3', '#2BA4CF', '#2B5AAD', '#2A45AE', '#2963C0', '#29488E', '#28547E', '#285373', '#28006A', 
    '#FFFDCA', '#EEE3DB', '#F6D5F2', '#F18BDC', '#D9A6FF', '#B17EDF', '#7AB1EB', '#60CDFE', '#46BDFF', '#3744D8', '#30AEDB', '#3050B2', '#2F50B9', '#2E6ECC','#2E5399', '#2D5F89', '#2D5E7E','#2D0075',
  ];
  
  //navigation
  const navigation = useNavigation(); // Initialize the navigation object
  const { goBack } = useNavigation();
  const handleBackPress = () => {
    goBack();
  };
  
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>What to expect for</Text>
            <View style={styles.subContent}>
              <Text style={styles.boldText}>Businesses</Text>
            </View>
          </View>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
        </View>

        <View style={styles.BigRowContainer}>
          <Text style={styles.sectionTitle}>Gender</Text>

              <View style={styles.statsContainer}>
                  <View style={styles.pieChartContainer}>
                      <PieChart data={genderData} colors={pieChartColors} />
                  </View>

                  <View style={styles.statsContent}>
                      {genderData.map((data, index) => (
                      <View key={index} style={styles.rowContainer}>
                          <View style={[styles.colorBox, { backgroundColor: pieChartColors[index] }]} />
                          <Text style={styles.dataText}>{data.label}: {data.value} </Text>
                      </View>
                      ))}
                  </View>
              </View>
        </View>

        <View style={styles.BigRowContainer}>
            <Text style={[styles.sectionTitle, {marginTop: -100}]}>Business Category</Text>

            <View style={[styles.statsContainer]}>
                <View style={styles.pieChartContainer}>
                    <PieChart data={categoryData} colors={pieChartColors} />
                </View>

                <View style={styles.statsContent}>

                    {categoryData.map((data, index) => (
                    <View key={index} style={styles.rowContainer}>
                        <View style={[styles.colorBox, { backgroundColor: pieChartColors[index] }]} />
                        <Text style={styles.dataText}>{data.label}: {data.value} </Text>
                    </View>
                    ))}
                </View>
            </View>
        </View>
        
        <View style={styles.BigRowContainer}>
        <Text style={[styles.sectionTitle, {marginTop: -100}]}>Country of Origin{'\n'}</Text>
            <View style={styles.columnItem}>
                <Text style={[styles.columnTextBold]}>Active Personal Accounts</Text>
                {/* Total Personal Account Count */}
                <Text style={styles.columnTextExtraLarge}>{nuCount}</Text>
            </View>

            <View style={styles.columnItem}>
                <Text style={[styles.columnTextBold]}>Active LOL Accounts</Text>
                {/* Total Personal Account Count */}
                <Text style={styles.columnTextExtraLarge}>{lolCount}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.pieChartContainer}>
                    <PieChart data={countryData} colors={pieChartColors} />
                </View>

                <View style={styles.statsContent}>
                    

                    {countryData.map((data, index) => (
                    <View key={index} style={styles.rowContainer}>
                        <View style={[styles.colorBox, { backgroundColor: pieChartColors[index] }]} />
                        <Text style={styles.dataText}>{data.label}: {data.value} </Text>
                    </View>
                    ))}
                </View>
            </View>
        </View>


            <TouchableOpacity onPress={handleBackPress}>
              <Text style={[styles.backText]}>Back</Text>
            </TouchableOpacity>
        
        </ScrollView>



      <View style={styles.footer}>
        <View style={styles.footerImages}>
          <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
          <View style={styles.spacerfooter} />
          <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
          <View style={styles.spacerfooter} />
          <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
        </View>
        <Text>&copy; 2024 TripAid</Text>
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
    paddingBottom: 10, // Add some paddingBottom if needed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
    color: '#6A778B',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  text: {
    color: '#39414B',
    fontSize: 18,
  },
  subContent: {
    alignItems: 'flex-start',
    marginBottom: 33.5,
    marginTop: 5,
  },
  boldText: {
    color: '#0A2753',
    fontSize: 32,
    fontWeight: '800',
  },
  semiBold: {
    color: '#0A2753',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 11,
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
  },
  footerImageGBB: {
    width: 50,
    height: 47,
    resizeMode: 'cover',
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  spacerfooter: {
    width: 16.5,
  },
  middlespacerimage: {
    height: 33.5,
  },
  middlespacertext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  midcolumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  countText: {
    color: '#FB7E3C',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  bigimageContainer: {
    width: 335,
    height: 180,
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigImage: {
    width: 335,
    height: 180,
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    width: 335,
    height: 83.26,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    bottom: -168,
    justifyContent: 'flex-end',
  },
  gradientTextContainer: {
    paddingHorizontal: 23,
    paddingBottom: 10,
  },
  gradientTextPrimary: {
    color: '#FFF',
    fontSize: 18,
  },
  gradientTextSecondary: {
    color: '#F3F3F3',
    fontSize: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 35,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#030D45',
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalHeaderText: {
    color: '#FB7E3C',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalInnerContainer: {
    width: 342,
    height: 104,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  halfCircleLeft: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#030D45',
    transform: [{ rotate: '90deg' }], // Rotate the half circle
  },
  halfCircleRight: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -8, // half the height of the half circle
    width: 32,
    height: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#030D45',
    transform: [{ rotate: '-90deg' }], // Rotate the half circle
  },
  dealsImageHilton: {
    width: 60,
    height: 22.29,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 42,
  },
  dealsImageGBB: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 29,
  },
  dealsImageJUMBO: {
    width: 67,
    height: 41,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 38,
  },
  dealsImageBTV: {
    width: 70,
    height: 20.83,
    resizeMode: 'cover',
    marginLeft: 30,
    marginTop: 42,
  },
  dottedLineHilton: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -55,
  },
  dottedLineGBB: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -73,
  },
  dottedLineJUMBO: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -68,
  },
  dottedLineBTV: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1, // To make the dashes more circular
    borderColor: 'rgba(102, 102, 102, 0.2)', // Color with 20% opacity
    height: 85, // Set the height of the line
    width: 0, // Set width to 0 for a vertical line
    marginLeft: 110,
    marginTop: -52,
  },
  dealsTop: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 126,
    marginTop: -75,
  },
  dealsMid: {
    color: '#000',
    fontSize: 16,
    marginLeft: 126,
    marginTop: 4,
  },
  dealsBot: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 10,
    marginLeft: 126,
    marginTop: 6,
  },
  modalReviewContent: {
    backgroundColor: '#FB7E3C',
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: 'center',
  },
  modalReviewHeaderText: {
    color: '#030D45',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
  },
  reviewContainer: {
    width: 334,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  LeftpfpContainer:{
    width: 70,
    height: 68,
    borderRadius: 34, // Half of the width/height for a perfect circle
    backgroundColor: 'lightgray', // You can change this to your desired color or remove it
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -230, // Adjust this according to your layout
    marginTop: 100, // Adjust this according to your layout
  },
  LeftUserName: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: -225,
    marginTop: 2,
    fontWeight: 'bold',
  },
  LeftUserType: {
    color: '#030D45',
    fontSize: 9,
    marginLeft: -225,
    marginTop: 2,
    fontStyle: 'italic',
  },
  RightReviewContent: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 100, // Adjust this according to your layout
    marginRight: 10, // Add some right margin to give space
    marginTop: -105,
    flex: 1, // Takes remaining space
    textAlign: 'center', // Centers the text horizontally
  },
  Revcontent: {
    flexDirection: 'column', // Aligns items horizontally
    alignItems: 'center', // Aligns items vertically
    padding: 10,
  },
  RightpfpContainer:{
    width: 70,
    height: 68,
    borderRadius: 34, // Half of the width/height for a perfect circle
    backgroundColor: 'lightgray', // You can change this to your desired color or remove it
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 230,
    marginTop: 100,
  },
  RightUserName: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 225,
    marginTop: 2,
    fontWeight: 'bold',
  },
  RightUserType: {
    color: '#030D45',
    fontSize: 9,
    marginLeft: 225,
    marginTop: 2,
    fontStyle: 'italic',
  },
  LeftReviewContent: {
    color: '#030D45',
    fontSize: 11,
    marginLeft: 10, // Adjust this according to your layout
    marginRight: 100, // Add some right margin to give space
    marginTop: -100,
    flex: 1, // Takes remaining space
    textAlign: 'center', // Centers the text horizontally
  },
  ReviewsignUpButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperContainer: {
    height: 180, // Or specify a height that suits your design
    marginBottom: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  curvedContainer: {
    width: 280,
    height: 65,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.6, // Adjust the opacity level here (0 to 1)
  },
  textBehindImage: {
    position: 'absolute',
    zIndex: 1,
    color: '#030D45',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginTop: 20, // Adjust the positioning of the text as needed
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieChartContainer: {
    marginRight: -200,
    marginLeft: -30,
    alignContent: 'flex-start'
  },
  statsContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: -100,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  BigRowContainer: {
    flexGrow: 1,
  },

  columnItem: {
    marginBottom: 10,
    justifyContent: 'flex-start', // Center content vertically
    alignItems: 'flex-start', // Center content horizontally
    marginLeft: 20,
  },
  columnTextBold: {
      color: '#0A2753',
      fontSize: 12,
      fontWeight: 'bold',
  },
  columnTextExtraLarge: {
      color: '#FB7E3C',
      fontSize: 20,
      marginBottom: 20,
  },
  insightsSection: {
    marginVertical: 20,
    paddingHorizontal: 90,
    width: "90%",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#093D89',
    marginBottom: 0,
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093D89',
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default BOLandingPageScreen;