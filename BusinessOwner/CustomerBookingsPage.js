import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const BOBookingScreen = () => {
  const [location, setLocation] = useState('');

    const navigation = useNavigation(); // Add this line to get the navigation object
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedDate, setDisplayedDate] = useState('Today');
  
    const handleDateChange = (date) => {
      if (!isToday(date)) {
        setDisplayedDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        setSelectedDate(date);
      } else {
        setDisplayedDate('Today');
        setSelectedDate(date);
      }
      // Perform actions or fetch data based on the selected date
    };
    
    const renderDateHeaders = () => {
      const dateArray = [];
      for (let i = -2; i <= 2; i++) {
        const date = new Date(selectedDate);
        date.setDate(selectedDate.getDate() + i);
        const isCurrent = isToday(date);
        const dateFormat = isCurrent
          ? displayedDate
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const isSelected =
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear();
    
        dateArray.push(
          <TouchableOpacity
            key={i}
            style={[
              styles.headerDateContainer,
              isSelected ? styles.selectedDate : null,
            ]}
            onPress={() => handleDateChange(date)}
          >
            <Text style={[styles.headerDateText, isSelected ? styles.selectedDateText : null]}>
              {dateFormat}
            </Text>
          </TouchableOpacity>
        );
      }
      return dateArray;
    };


    const [bookings, setBookings] = useState([
  {
    id: 1,
    date: '2023-12-18',
    username: 'John Doe',
    bookingRef: 'ABC123',
    time: '4:00 PM',
    // Other relevant information for the booking
  },
  {
    id: 2,
    date: '2023-12-19',
    username: 'Alice Smith',
    bookingRef: 'DEF456',
    time: '5:30 PM',
    // Other relevant information for the booking
  },
  {
    id: 3,
    date: '2023-12-20',
    username: 'Janet',
    bookingRef: 'GHI789',
    time: '2:00 PM',
    // Other relevant information for the booking
  },
  {
    id: 4,
    date: '2023-12-19',
    username: 'James Stinson',
    bookingRef: 'ABD012',
    time: '10:30 AM',
    // Other relevant information for the booking
  },
  {
    id: 5,
    date: '2023-12-17',
    username: 'Ash',
    bookingRef: 'LMO981',
    time: '8:30 PM',
    // Other relevant information for the booking
  },

  // Add more bookings as needed
]);

const [filteredBookings, setFilteredBookings] = useState([]);

  // Update filtered bookings based on the selected date
  useEffect(() => {
    const filtered = bookings.filter((booking) => booking.date === selectedDate.toISOString().split('T')[0]);
    setFilteredBookings(filtered);
  }, [selectedDate, bookings]);

  const renderBookings = () => {
    return filteredBookings.map((booking) => (
      <View key={booking.id} style={styles.bookingContainer}>
        <View style={styles.bookingRow}>
          <Text style={styles.bookingUsername}>@{booking.username}</Text>
          <Text style={styles.bookingRef}>Booking Ref: {booking.bookingRef}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Text style={styles.bookingReservation}>Reservation at {booking.time}</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };
  
    
    
  
    const isToday = (compareDate) => {
      const today = new Date();
      return (
        compareDate.getDate() === today.getDate() &&
        compareDate.getMonth() === today.getMonth() &&
        compareDate.getFullYear() === today.getFullYear()
      );
    };
  
    
    
    const handleHome = () => {
      navigation.navigate('Business Owner');
    };

    const handlePOI = () => {
      navigation.navigate('Interest');
    };

    const handleProfile = () => {
      navigation.navigate('Business Owner More');
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderDateHeaders()}
                </ScrollView>
            </View>

            <View style={styles.midContainer}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* Your other content */}
              
              {/* Bookings */}
              {renderBookings()}
            </ScrollView>




              
                    <Text >&copy; 2023 TripAid</Text>

            </View>
            <View style={styles.footer}>
        {/* Footer Container */}
              <View style={styles.footerContainer}>
                {/* Home */}
                <TouchableOpacity style={styles.footerItem} onPress={handleHome}>
                  <MaterialIcons name="home" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>

                {/* POI */}
                <TouchableOpacity style={styles.footerItem} onPress={handlePOI}>
                  <MaterialIcons name="place" size={32} color="#FFF" />
                  <Text style={styles.footerText}>POI</Text>
                </TouchableOpacity>

                {/* Middle Circle */}
                <TouchableOpacity style={styles.middleCircle}>
                  <View style={styles.circle}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>

                {/* Shop */}
                <TouchableOpacity style={styles.footerItem}>
                  <MaterialIcons name="shopping-bag" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Shop</Text>
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
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerDateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDate: {
    borderBottomWidth: 2,
    borderBottomColor: '#FB7E3C',
  },
  selectedDateText: {
    color: '#FB7E3C',
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
  selectedDate: {
    borderBottomWidth: 2,
    borderBottomColor: '#FB7E3C',
  },
  selectedDateText: {
    color: '#FB7E3C',
  },
  
  bookingContainer: {
    borderTopWidth: 2,
    borderTopColor: '#FB7E3C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
    width: 380, // Adjust the width according to your requirement
  },
  
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookingUsername: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingRef: {
    fontSize: 14,
    color: '#666',
    marginLeft: 50,
  },
  bookingReservation: {
    fontSize: 20,
    marginTop: 5,
    color: '#0A2753',
    fontWeight: 'bold',
    marginRight: 20,
  },
  viewButton: {
    backgroundColor: '#FB7E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BOBookingScreen;