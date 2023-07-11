import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryLine } from 'victory-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomLabel = (props) => {
  const { x, y, datum } = props;

  return (
      <TouchableOpacity onPress={() =>console.log("NE")}>
        <Ionicons
          style={{
            position: 'absolute',
            left: x - 9,
            top: y - 14,
            zIndex: 20
          }}
          name="person-circle" size={20} />
      </TouchableOpacity>
  );
};
export default CustomLabel