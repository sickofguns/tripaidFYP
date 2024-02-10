import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BarGraph = ({ data }) => {
  // Check if data is available
  if (!data || data.length === 0) {
    return <Text style={{ color: 'red' }}>No data available</Text>;
  }

  // Ensure data has 7 days for the week
  if (data.length !== 7) {
    console.error('Invalid data format. Expected data for 7 days of the week.');
    return null;
  }

  // Get the maximum sign-up count from the data for any day
  const maxValue = Math.max(...data);

  return (
    <View style={styles.container}>
      {data.map((count, dayIndex) => (
        <View
          key={dayIndex}
          style={[
            styles.bar,
            {
              height: (count / maxValue) * 100 + '%',
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: 120,
    backgroundColor: '#F0F2F4',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  bar: {
    flex: 1,
    backgroundColor: '#FB7E3C',
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default BarGraph;
