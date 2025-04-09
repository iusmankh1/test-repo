import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text1, Text2 } from "../TextComponent/TextComponent";
// import Entypo from 'react-native-vector-icons/Entypo';
import {
  greenBlue,
  darkBlueGrey,
  warmGrey,
  lightGrey,
  lightPink,
} from "../../Assets/colors/colors";
// import Icon from 'react-native-vector-icons/FontAwesome';
const TextField = ({
  onClear,
  clearIcon,
  isFieldValid,
  fieldValue,
  autoFocus,
  returnKeyType,
  onChangeField,
  onSubmitEditing,
  style,
  keyboardType,
  autoCapitalize,
  length,
  placeholder,
  secureTextEntry,
  refForward,
  showHeading,
  headingText,
  textStyle,
  editable,
}) => {
  return (
    <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
      {showHeading == true ? (
        <View style={{ paddingLeft: wp("6"), ...textStyle }}>
          <Text2>{headingText}</Text2>
        </View>
      ) : null}

      <View
        style={{
          shadowColor: "#a8adad",
          shadowOffset:
            Platform.OS === "ios"
              ? { width: 0.5, height: 0.5 }
              : { width: 1, height: 1 },
          shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
          shadowRadius: Platform.OS === "ios" ? 4 : 0.5,
          alignItems: "center",
          justifyContent: "flex-start",
          elevation: 4,

          // height:hp('7%'),
          aspectRatio: 6.5,
          paddingLeft: 5,
          width: wp("89%"),
          flexDirection: "row",
          borderWidth: 0.5,
          borderColor: isFieldValid ? lightGrey : lightPink,
          borderRadius: 12,
          alignSelf: "center",
          marginTop: hp("1"),
          backgroundColor: ((editable == false)? "#f2f2f2": "white"),
          ...style,
        }}
      >
        <TextInput
          ref={refForward}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          value={fieldValue}
          autoFocus={autoFocus}
          onChangeText={(text) => onChangeField(text)}
          style={{ color: "black", flex: 1, fontSize: 16, fontWeight: "500" }}
          keyboardType={keyboardType ? keyboardType : "default"}
          maxLength={length}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#9b9b9b"
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType} 
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
        {/* {clearIcon === true ? (
        <TouchableOpacity
          onPress={onClear}
          style={{
            marginRight: wp('3'),
          }}>
          <Entypo name="cross" size={23} color={darkBlueGrey} />
        </TouchableOpacity>
      ) : null} */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default TextField;
