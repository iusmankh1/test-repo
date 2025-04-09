import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {mainBlue} from '../../Assets/colors/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
const Sample = () => {
  return (
    <View
      style={{
        // position: 'relative',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 50,
        aspectRatio: 1,
        width: wp('10'),
      }}>
      <ActivityIndicator color={mainBlue} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Sample;
