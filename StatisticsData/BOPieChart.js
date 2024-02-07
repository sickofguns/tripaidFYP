import React from 'react';
import { Svg, G, Path } from 'react-native-svg';

const PieChart = ({ data, colors }) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  let cumulativePercentage = 0;

  return (
    <Svg width="400" height="300">
      <G transform={`translate(100, 100)`}>
        {data.map((entry, index) => {
          const percentage = (entry.value / total) * 100;
          const angle = (percentage * Math.PI * 2) / 100;

          // Adjust the values used in the path to make the pie slices smaller
          const path = `
            M 0 0
            L ${Math.cos(cumulativePercentage) * 70} ${Math.sin(cumulativePercentage) * 70}
            A 70 70 0 ${percentage > 50 ? 1 : 0} 1 ${Math.cos(cumulativePercentage + angle) * 70} ${Math.sin(cumulativePercentage + angle) * 70}
            Z
          `;

          cumulativePercentage += angle;

          return <Path key={index} d={path} fill={colors[index % colors.length]} />;
        })}
      </G>
    </Svg>
  );
};

export default PieChart;
