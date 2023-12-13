import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


const DOBScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const navigation = useNavigation(); // Initialize the navigation object

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
    
      
    const [selectedDay, setSelectedDay] = useState('DD');
    const [selectedMonth, setSelectedMonth] = useState('MM');
    const [selectedYear, setSelectedYear] = useState('YYYY');
      

    const handleContinuePress = () => {
      console.log('Day:', selectedDay);
      console.log('Month:', selectedMonth);
      console.log('Year:', selectedYear);

      navigation.navigate('Account Type'); // Navigate to SignUp screen on button press
    };

    const handleCancelPress = () => {
      navigation.navigate('Sign Up');
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
                Enter your
                {'\n'}
                Date of Birth</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    additionalText: {
        color: '#847C7C',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30, // Adjust the margin as needed
        lineHeight: 17, // Controls line height
        marginBottom: 40,
    },
    dropdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: 20,
    },
    DDdropdownBox: {
      width: '35%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
    },
    MMdropdownBox: {
      width: '35%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
    },
    YYdropdownBox: {
      width: '40%',
      height: 51,
      borderRadius: 6,
      borderColor: '#6C6363',
      borderWidth: 1,
      justifyContent: 'center',
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
      marginTop: 65,
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
      marginTop: 33,
    },
});

export default DOBScreen;