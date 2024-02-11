import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Modal, Pressable, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig'; // Importing db from your firebase config file
import { useAppContext } from "../AppContext";

// CustomDropdown component
const CustomDropdown = ({ selectedValue, onValueChange, items }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownPress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = (value) => {
    onValueChange(value);
    setShowDropdown(false);
  };

  

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={handleDropdownPress} style={styles.dropdownHeader}>
        <Text style={styles.dropdownHeaderText}>{selectedValue}</Text>
        <MaterialIcons name={showDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="#333" />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => handleItemPress(item.value)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};




const BOBookingScreen = () => {

  const { user } = useAppContext();

  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState('Today');
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const [isMonthYearPickerVisible, setIsMonthYearPickerVisible] = useState(false);

  const handleDateChange = (date) => {
    if (!isToday(date)) {
      setDisplayedDate(
        date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      );
      
      setSelectedDate(date);
    } else {
      setDisplayedDate('Today');
      setSelectedDate(date);
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    updateFilteredBookings(month, selectedYear);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    updateFilteredBookings(selectedMonth, year);
  };

  const updateFilteredBookings = (month, year) => {
    const filtered = bookings.filter(
      (booking) =>
        new Date(booking.date).getMonth() + 1 === month &&
        new Date(booking.date).getFullYear() === year
    );
    setFilteredBookings(filtered);
  };

// Inside your renderDateHeaders function

const renderDateHeaders = () => {
  const dateArray = [];
  const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0);

  for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(selectedYear, selectedMonth - 1, i);
    const isCurrent = isToday(date);
    const dateFormat = isCurrent
      ? displayedDate
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); // Change date format here
    const isSelected =
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear();

    dateArray.push(
      <TouchableOpacity
        key={i}
        style={[styles.headerDateContainer, isSelected ? styles.selectedDate : null]}
        onPress={() => handleDateSelection(date)} // Integrate handleDateSelection here
      >
        <Text style={[styles.headerDateText, isSelected ? styles.selectedDateText : null]}>
          {dateFormat}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.headerDateContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dateArray}
      </ScrollView>
    </View>
  );
};


  
  const handleToggleMonthYearPicker = () => {
    setIsMonthYearPickerVisible(!isMonthYearPickerVisible);
    updateFilteredBookings(selectedMonth, selectedYear);
  };

  const formatTimestamp = (timestamp) => {
    // Check if the timestamp is valid
    if (!timestamp || !(timestamp instanceof Date)) {
      return ''; // Return an empty string if the timestamp is invalid
    }
  
    // Options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    // Format the timestamp into a human-readable date string
    const formattedDate = timestamp.toLocaleDateString(undefined, options);
  
    return formattedDate;
  };

  const fetchBookingsFromDatabase = async () => {
    try {
      const bookingsCollectionRef = collection(db, 'bookings');
      const bookingQuery = query(
        bookingsCollectionRef,
        where('businessId', '==', user.id),
        where('businessname', '==', user.username),
      );
  
      const querySnapshot = await getDocs(bookingQuery);
  
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
  
      const bookingsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Raw data:", data); // Log raw data to check the date fields
        const checkinDate = data.checkin ? data.checkin.toDate() : null;
        console.log("Check-in date:", checkinDate); // Log the check-in date to verify
        const formattedDate = checkinDate ? checkinDate.toLocaleDateString() : '';
        
        // Format the time portion
        const formattedTime = checkinDate ? checkinDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
        
        const bookingRef = data.userId;
        const time = formattedTime; // Use the formatted time information
        bookingsData.push({ date: formattedDate, bookingRef, time });
      });
  
      console.log("Bookings data:", bookingsData); // Log the formatted bookings data
      return bookingsData;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };
  
  
  
  
  
  

  // Function to format date to "February 19, 2024"
  const formatDate = (dateObject) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  
  // Function to format time to "12:16 PM"
  const formatTime = (dateObject) => {
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const timeString = hours + ':' + minutesStr + ' ' + ampm;
    return timeString;
  };
  
  
  const formatDateForComparison = (date) => {
    // Convert the date object to a string in the format YYYY-MM-DD
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
  
  // Update the useEffect hook to filter bookings based on the selected date
  useEffect(() => {
    const formattedSelectedDate = formatDate(selectedDate);
    const filtered = bookings.filter((booking) => booking.date === formattedSelectedDate);
    setFilteredBookings(filtered);
  }, [selectedDate, bookings]);
  
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsData = await fetchBookingsFromDatabase();
      console.log("Fetched Bookings in useEffect:", bookingsData); // Add this line
      setBookings(bookingsData);
    };
  
    fetchBookings();
  }, []);

const [filteredBookings, setFilteredBookings] = useState([]);
const handleDateSelection = (selectedDate) => {
  setSelectedDate(selectedDate);
  console.log("Selected Date:", selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
};

  useEffect(() => {
    const filtered = bookings.filter((booking) => booking.date === selectedDate.toISOString().split('T')[0]);
    setFilteredBookings(filtered);
  }, [selectedDate, bookings]);

  const renderBookings = () => {
    // Group bookings by date
    const groupedBookings = {};
    filteredBookings.forEach((booking) => {
      const dateKey = booking.date;
      if (!groupedBookings[dateKey]) {
        groupedBookings[dateKey] = [];
      }
      groupedBookings[dateKey].push(booking);
    });
  
    // Render bookings grouped by date
    return Object.keys(groupedBookings).map((date) => (
      <View key={date}>
        <Text style={styles.dateHeader}>{date}</Text>
        {groupedBookings[date].map((booking, index) => (
          <View key={index} style={styles.bookingContainer}>
            <View style={styles.bookingRow}>
              {/* Render the booking reference */}
              <Text style={styles.bookingRef}>Booking Ref: {booking.bookingRef}</Text>
            </View>
            <View style={styles.bookingRow}>
              {/* Render the reservation time */}
              <Text style={styles.bookingReservation}>Reservation at {booking.time}</Text>
              {/* Render any additional actions or buttons */}
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
            
            {/* Render the formatted date */}
            <Text>Date: {booking.date}</Text>
          </View>
        ))}
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

    const handleSearch = () => {
      navigation.navigate('Business Owner Search User');
    };

    const handleProfile = () => {
      navigation.navigate('Business Owner More');
    };
    
    const handleCreate = () => {
      navigation.navigate('Business Owner Create');
    }
    const handleShop = () => {
      navigation.navigate('Business Owner Shop');
    }

    // Custom dropdown data for months and years
    const months = [
      { label: 'January', value: 1 },
      { label: 'February', value: 2 },
      { label: 'March', value: 3 },
      { label: 'April', value: 4 },
      { label: 'May', value: 5 },
      { label: 'June', value: 6 },
      { label: 'July', value: 7 },
      { label: 'August', value: 8 },
      { label: 'September', value: 9 },
      { label: 'October', value: 10 },
      { label: 'November', value: 11 },
      { label: 'December', value: 12 },
    ];
  
    const years = Array.from({ length: 11 }, (_, i) => 2015 + i);
  

    return (
      

      <View style={styles.container}>
      {/* Separate View for date headers */}
      <View>
        {renderDateHeaders()}
      </View>
  
      {/* Select Month and Year button at the top right */}
      <TouchableOpacity onPress={handleToggleMonthYearPicker} style={styles.monthYearPickerButton}>
        <Text style={styles.monthYearPickerButtonText}>Select Month and Year</Text>
      </TouchableOpacity>
        <View style={styles.midContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Your other content */}
            {/* Bookings */}
            {renderBookings()}
          </ScrollView>
  
          {/* Modal for Month and Year Picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isMonthYearPickerVisible}
            onRequestClose={() => setIsMonthYearPickerVisible(!isMonthYearPickerVisible)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Month and Year</Text>
                {/* Render your custom dropdowns for month and year */}
                <CustomDropdown
                  selectedValue={months.find((m) => m.value === selectedMonth)?.label || ''}
                  onValueChange={handleMonthChange}
                  items={months}
                />
                <CustomDropdown
                  selectedValue={selectedYear.toString()}
                  onValueChange={handleYearChange}
                  items={years.map((y) => ({ label: y.toString(), value: y }))}
                />
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => setIsMonthYearPickerVisible(!isMonthYearPickerVisible)}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* Your other content */}
              
              {/* Bookings */}
              {renderBookings()}
            </ScrollView>




              
                    <Text >&copy; 2024 TripAid</Text>

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
                <TouchableOpacity style={styles.middleCircle} onPress={handleCreate}>
                  <View style={styles.circle}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>

                {/* Shop */}
                <TouchableOpacity style={styles.footerItem} onPress={handleShop}>
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
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },

  monthYearPickerButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FB7E3C',
  },

  monthYearPickerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalCloseButton: {
    backgroundColor: '#FB7E3C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  modalCloseButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
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