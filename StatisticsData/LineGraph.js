import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineGraph = ({ data }) => {
  // Assuming data is an array of objects with date and value properties
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.value),
        color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`, // Change color as needed
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineGraphContainer}>
        <View style={styles.gradientLine}></View>
        <View style={styles.gradientArea}></View>
        <LineChart
          data={chartData}
          width={290}
          height={290}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(108, 122, 156, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#FF5733',
            },
          }}
          bezier
          style={styles.chartStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#093D89',
    marginBottom: 10,
  },
  lineGraphContainer: {
    position: 'relative',
    width: '100%',
    height: 300, // Adjust the height as needed
  },
  gradientLine: {
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    position: 'absolute',
    left: -5,
    top: 3,
    background: 'linear-gradient(180deg, #192875 0%, rgba(217, 217, 217, 0) 100%)',
    borderWidth: 1,
    borderColor: '#0A2753',
  },
  gradientArea: {
    width: 150, // Adjust the width as needed
    height: 120, // Adjust the height as needed
    position: 'absolute',
    left: 0,
    top: 0,
    background: 'linear-gradient(180deg, #FB7E3C 0%, rgba(217, 217, 217, 0) 100%)',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});


export default LineGraph;
