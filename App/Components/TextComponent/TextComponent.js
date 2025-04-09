import React, {Children} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {black} from '../../Assets/colors/colors';

export const Text1 = ({style, children}) => {
  return (
    <Text style={{fontSize: 20, fontWeight: '700', color: black, ...style}}>
      {children}
    </Text>
  );
};
export const Text2 = ({style, children}) => {
  return <Text style={{fontSize: 15, color: black, ...style}}>{children}</Text>;
};
