import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { db } from "../firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore/lite";


const RegistrationScreen = ({ route }) => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');
  const { userId } = route.params || {}
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

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
    const gender = ['Female', 'Male'];
    const country = ["Singapore", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
    "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", 
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
    "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
    "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
    "The Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
    "Kenya", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", 
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",  
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", 
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", 
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
      
    const [selectedDay, setSelectedDay] = useState('DD');
    const [selectedMonth, setSelectedMonth] = useState('MM');
    const [selectedYear, setSelectedYear] = useState('YYYY');
    const [selectedGender, setSelectedGender] = useState('Gender');
    const [selectedCountry, setSelectedCountry] = useState('Country');

      

    const handleContinuePress = () => {

      // Check if any of the fields are still in their default values
  if (
    selectedDay === 'DD' ||
    selectedMonth === 'MM' ||
    selectedYear === 'YYYY' ||
    selectedGender === 'Gender' ||
    selectedCountry === 'Country'
  ) {
    // If any field is still in its default value, show an alert
    alert('Please fill in all required fields.');
    return; // Exit the function early
  }
      console.log('Day:', selectedDay);
      console.log('Month:', selectedMonth);
      console.log('Year:', selectedYear);
      console.log('Gender', selectedGender);
      console.log('Country', selectedCountry);
      const usersDB = collection(db, "users");
      const docRef = doc(usersDB, userId);
      updateDoc(docRef, {
        id: userId, 
        dob: `${selectedYear}-${selectedMonth}-${selectedDay}`,
        gender: selectedGender, 
        country: selectedCountry
      }).then(() => {
        navigation.navigate('Interest', { userId }); // Navigate to SignUp screen on button press
      })
      
      
    };
    
    

    const handleCancelPress = () => {
      navigation.navigate('Account Type');
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
                <Image source={require('../assets/LOGO.png')} style={styles.logo} />

                <Text style={styles.enterDOBText}>
                Enter your Date of Birth</Text>
                <Text style={styles.additionalText}>
                Your age information will be updated
                {'\n'}
                on your profile page and this will be displayed
                {'\n'}
                publicly on your dashboard
                </Text>


                <View style={styles.dropdownContainer}>
                  {/* Day Picker */}
                  <Picker
                    selectedValue={selectedDay}
                    onValueChange={(itemValue) => setSelectedDay(itemValue)}
                    style={styles.DDdropdownBox}
                  >
                    <Picker.Item label="DD" value="DD" />
                    {days.map((day) => (
                      <Picker.Item label={day.toString()} value={day.toString()} key={day.toString()} />
                    ))}
                  </Picker>

                  {/* Month Picker */}
                  <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    style={styles.MMdropdownBox}
                  >
                    <Picker.Item label="MM" value="MM" />
                    {months.map((month) => (
                      <Picker.Item label={month.toString()} value={month.toString()} key={month.toString()} />
                    ))}
                  </Picker>

                  {/* Year Picker */}
                  <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={styles.YYdropdownBox}
                  >
                    <Picker.Item label="YYYY" value="YYYY" />
                    {years.map((year) => (
                      <Picker.Item label={year.toString()} value={year.toString()} key={year.toString()} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.enterDOBText}>
                Select your Gender</Text>

                <View style={styles.dropdownContainer}>
                  {/* Gender Picker */}
                  <Picker
                    selectedValue={selectedGender}
                    onValueChange={(itemValue) => setSelectedGender(itemValue)}
                    style={styles.GenderdropdownBox}
                  >
                    <Picker.Item label="Gender" value="Gender" />
                    {gender.map((gender) => (
                      <Picker.Item label={gender.toString()} value={gender.toString()} key={gender.toString()} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.enterDOBText}>
                Country</Text>

                <View style={styles.dropdownContainer}>
                  {/* Origin Picker */}
                  <Picker
                    selectedValue={selectedCountry}
                    onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                    style={styles.OrigindropdownBox}
                  >
                    <Picker.Item label="Country" value="Country" />
                    {country.map((country) => (
                      <Picker.Item label={country.toString()} value={country.toString()} key={country.toString()} />
                    ))}
                  </Picker>
                </View>






                <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelPress}>
                  <Text style={styles.cancelText}>Cancel</Text>
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
      marginBottom: 60,
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
    enterDOBText: {
        color: '#FB7E3C',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
        marginTop: -30,
    },
    additionalText: {
        color: '#847C7C',
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 30, // Adjust the margin as needed
        lineHeight: 17, // Controls line height
        marginTop: -40,
    },
    dropdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: 5,
      marginBottom: 65,
    },
    DDdropdownBox: {
      width: '35%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      overflow: 'hidden', // Hide the content that overflows from the container

    },
    MMdropdownBox: {
      width: '35%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      overflow: 'hidden', // Hide the content that overflows from the container

    },
    YYdropdownBox: {
      width: '40%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      overflow: 'hidden', // Hide the content that overflows from the container

    },
    dropdownText: {
      color: '#6C6363',
      fontSize: 16,
      fontWeight: 'bold',
    },   
    continueButton: {
      backgroundColor: '#030D45',
      borderRadius: 5,
      height: 50,
      width: 320,
      marginTop: -30,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelText: {
      color: '#847C7C',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 15,
    },

    GenderdropdownBox: {
      width: '100%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      marginTop: -50,
      overflow: 'hidden', // Hide the content that overflows from the container

    },
    OrigindropdownBox: {
      width: '100%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      marginTop: -50,
      overflow: 'hidden', // Hide the content that overflows from the container

    },
});

export default RegistrationScreen;