import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Text1, Text2} from '../../Components/TextComponent/TextComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
} from '../../Assets/colors/colors';

const Template = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <View>
        <Text>Template</Text>
      </View>
    </SafeAreaView>
  );
};

export default Template;

const styles = StyleSheet.create({});
