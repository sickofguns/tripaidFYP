import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


const BORegistrationScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const [ACRA, setACRA] = useState('');
    const category = ['Hospitality', 'Food & Beverage', 'Sports & Recreation', 'Retail'];
    const country = ['Local', 'International'];
    const hour = [
        "9 AM - 5 PM",
        "10 AM - 6 PM",
        "8:30 AM - 4:30 PM",
        "11 AM - 7 PM",
        "9:30 AM - 5:30 PM",
        "12 PM - 8 PM",
        "1 PM - 9 PM",
        "8 AM - 4 PM",
        "10:30 AM - 6:30 PM",
        "11:30 AM - 7:30 PM",
        "24 Hours"
      ];
      const hostsize = [
        "Small (1-20 guests)",
        "Medium (20-50 guests)",
        "Large (50-100 guests)",
        "Extra Large (100+ guests)",
        "Intimate (1-10 guests)",
        "Intimate Gathering (1-15 guests)",
        "Cozy (10-30 guests)",
        "Spacious (30-70 guests)",
        "Grand (70-150 guests)",
        "Massive (150+ guests)"
      ];
      
      
    
    
    const [selectedCategory, setSelectedCategory] = useState('Category');
    const [selectedCountry, setSelectedCountry] = useState('Local or International');
    const [selectedHour, setSelectedHour] = useState('Operating Hours');
    const [selectedHostSize, setSelectedHostSize] = useState('No. of Pax');
          

    const handleContinuePress = () => {
      console.log('ACRA:', ACRA);
      console.log('Category:', selectedCategory);
      console.log('Country:', selectedCountry );
      console.log('Operating Hours:', selectedHour );
      console.log('No. of Pax:', selectedHostSize);      

      navigation.navigate('Business Registration Category'); // Navigate to SignUp screen on button press
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
                Enter your ACRA number</Text>
                <Text style={styles.additionalText}>
                Your business information will be protected
                </Text>

                <View style={styles.dropdownContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="ACRA Number"
                        onChangeText={(text) => setACRA(text)}
                        value={ACRA}
                    />
                </View>

                <Text style={styles.enterDOBText}>
                Select your Business Category</Text>

                <View style={styles.dropdownContainer}>
                  {/* category Picker */}
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={styles.CategorydropdownBox}
                  >
                    <Picker.Item label="Business Category" value="Business Category" />
                    {category.map((category) => (
                      <Picker.Item label={category.toString()} value={category.toString()} key={category.toString()} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.enterDOBText}>
                Business Operating Country</Text>

                <View style={styles.dropdownContainer}>
                  {/* local/international Picker */}
                  <Picker
                    selectedValue={selectedCountry}
                    onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                    style={styles.CountrydropdownBox}
                  >
                    <Picker.Item label="Local or International" value="Local or International" />
                    {country.map((country) => (
                      <Picker.Item label={country.toString()} value={country.toString()} key={country.toString()} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.enterDOBText}>
                Operating Hours</Text>

                <View style={styles.dropdownContainer}>
                  {/* local/international Picker */}
                  <Picker
                    selectedValue={selectedHour}
                    onValueChange={(itemValue) => setSelectedHour(itemValue)}
                    style={styles.HourdropdownBox}
                  >
                    <Picker.Item label="Operating Hours" value="Operating Hours" />
                    {hour.map((hour) => (
                      <Picker.Item label={hour.toString()} value={hour.toString()} key={hour.toString()} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.enterDOBText}>
                Hosting Size</Text>

                <View style={styles.dropdownContainer}>
                  {/* local/international Picker */}
                  <Picker
                    selectedValue={selectedHostSize}
                    onValueChange={(itemValue) => setSelectedHostSize(itemValue)}
                    style={styles.HostsizedropdownBox}
                  >
                    <Picker.Item label="No. of Pax" value="No. of Pax" />
                    {hostsize.map((hostsize) => (
                      <Picker.Item label={hostsize.toString()} value={hostsize.toString()} key={hostsize.toString()} />
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        marginTop: -50,
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
      marginTop: -60,
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

    
    CategorydropdownBox: {
      width: '100%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
      marginTop: -50,
    },
    CountrydropdownBox: {
        width: '100%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -50,
      },
      HourdropdownBox: {
        width: '100%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -50,
      },
      HostsizedropdownBox: {
        width: '100%',
        height: 51,
        borderRadius: 6,
        borderColor: '#6C6363',
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: -50,
      },
    input: {
        height: 60,
        width: 326,
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1, // Sets the width of the outline
        borderColor: '#C4C4C4',
        backgroundColor: '#F7F7F7',
      },
});

export default BORegistrationScreen;