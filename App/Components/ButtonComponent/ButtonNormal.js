import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ButtonNormal = ({children, onPress, color, style, disabled}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={{
        width: wp('88'),
        aspectRatio: 6.5,
        marginTop: hp('3'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: color,
        alignSelf: 'center',
        ...style,
      }}>
      <Text style={{color: 'white', fontSize: 16}}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});
export default ButtonNormal;
