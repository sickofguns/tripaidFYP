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
    try {
      // Check if the timestamp is a valid date string
      if (typeof timestamp === 'string') {
        // Create a Date object from the timestamp string
        const dateObject = new Date(timestamp);
    
        // Format the date
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
    
        return dateObject.toLocaleDateString(undefined, options);
      } else if (timestamp instanceof Date) {
        // Check if the timestamp is already a Date object
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
    
        return timestamp.toLocaleDateString(undefined, options);
      } else {
        console.log('Invalid timestamp format:', timestamp);
        throw new Error('Invalid timestamp format');
      }
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return 'Invalid Date';
    }
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

        const bookingsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const bookingRef = doc.id; // Get the booking reference ID
            let date = '';
            let time = '';
            let date2 = ''; // Declare date2 variable
            let date3 = ''; // Declare date3 variable

            // Extract date and time based on category
            if (data.category === 'Attraction' || data.category === 'Events' || data.category === 'Wellness' || data.category === 'Tours' || data.category === 'Food') {
                date = data.date ? formatTimestamp(data.date.toDate()) : '';
                time = data.time ? formatTime(data.time.toDate()) : '';
            } else if (data.category === 'Transport') {
                date = data.startdate ? formatTimestamp(data.startdate.toDate()) : '';
                time = data.time ? formatTime(data.time.toDate()) : '';
                date2 = data.enddate ? formatTimestamp(data.enddate.toDate()) : ''; // Extract end date for Transport category
            } else if (data.category === 'Accommodation') {
                date = data.checkin ? formatTimestamp(data.checkin.toDate()) : '';
                time = ''; // Accommodation might not have a specific time
                date3 = data.checkoutdate ? formatTimestamp(data.checkoutdate.toDate()) : ''; // Extract checkout date for Accommodation category
            }

            // Additional fields
            const adults = data.adults || '0'; // Retrieve adults field
            const children = data.children || '0'; // Retrieve children field
            const location = data.location || ''; // Retrieve location field
            const promo = data.promo || 'NIL'; // Retrieve promo field
            const remark = data.remark || 'NIL'; // Retrieve remark field
            const rooms = data.rooms || ''; // Retrieve rooms field
            const businessname = data.businessname || '';
            const username = data.username || '';

            return { date, time, adults, children, location, promo, remark, rooms, bookingRef, category: data.category, businessname, username, enddate: date2, checkoutdate: date3 };
        });

        console.log("Bookings data:", bookingsData); // Log the bookings data to check

        setBookings(bookingsData);
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


const [filteredBookings, setFilteredBookings] = useState([]);
const handleDateSelection = (selectedDate) => {
  setSelectedDate(selectedDate);
  const formattedDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  console.log("Selected Date:", formattedDate);
};



useEffect(() => {
  const fetchAndCombineBookings = async () => {
    try {
      // Fetch bookings from the database
      const fetchedBookings = await fetchBookingsFromDatabase();
      console.log("Fetched Bookings in useEffect:", fetchedBookings);

      // Update the state with fetched bookings
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // Handle the error as needed
    }
  };

  fetchAndCombineBookings();
}, []);

// Rendering logic
const renderBookings = () => {
  // Filter bookings based on the selected date
  const filteredBookings = bookings.filter((booking) => {
    return booking.date === formatTimestamp(selectedDate);
  });

  return (
    <View>
      <Text style={styles.dateHeader}>Bookings for {formatTimestamp(selectedDate)}</Text>
      {filteredBookings.map((booking, index) => (
        <View key={index} style={styles.bookingContainer}>
          <View style={styles.bookingRow}>
            {/* Render the booking reference */}
            <Text style={styles.bookingRef}>Booking Ref: {booking.bookingRef}</Text>
          </View>
          <View style={styles.bookingRow}>
            {/* Render the reservation time */}
            <Text style={styles.bookingReservation}>Reservation at {booking.time}</Text>
            {/* Render any additional actions or buttons */}
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewContent(booking)}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
          {/* Render the formatted date */}
          <Text>Date: {booking.date}</Text>
        </View>
      ))}
    </View>
  );
};

const handleViewContent = (booking) => {
  navigation.navigate("Business Owner View Booking", { booking });
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
  dateHeader: {
    fontSize: 16,
    color: '#0A2753',
    alignSelf: 'center',
    fontWeight: '600',
    marginBottom: 10,
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
  
  dropdownItem: {
    // Your dropdown item styles here
    padding: 10, // Example padding for dropdown items
  },
  dropdownItemText: {
    // Your dropdown item text styles here
    fontSize: 20, // Example font size for dropdown item text
  },
});

export default BOBookingScreen;