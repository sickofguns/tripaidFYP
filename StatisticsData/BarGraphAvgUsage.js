import React from 'react';
import { View, StyleSheet } from 'react-native';

const BarGraph = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.avgUsageTime)); // Get the maximum avgUsageTime from the data

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              height: (item.avgUsageTime / maxValue) * 100 + '%',
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
