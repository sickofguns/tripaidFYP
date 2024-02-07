import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const CircularProgress = ({ percentageIncrease }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageIncrease / 100) * circumference;

  // Determine the color based on the percentageIncrease
  const textColor = percentageIncrease >= 0 ? 'green' : 'red';

  const containerSize = radius * 2 + 20; // Adjusted size to accommodate the full circle

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <Svg width={containerSize} height={containerSize}>
        <Circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={radius}
          fill="#F2F2F2"
          stroke="#FB7E3C"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
        <SvgText x="50%" y="50%" fontSize="14" fill={textColor} textAnchor="middle" dy="4" dx="-10">
          {percentageIncrease.toFixed(2)}%
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center horizontally
  },
});

export default CircularProgress;
