import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import TextField from "../../../Components/TextFieldComponent/TextField";
import { Text1, Text2 } from "../../../Components/TextComponent/TextComponent";
import ButtonNormal from "../../../Components/ButtonComponent/ButtonNormal";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  lightPink,
  greyish,
  lightGrey,
  blackThree,
} from "../../../Assets/colors/colors";
// import { log } from "react-native-reanimated";
const VehicleDescription = (props) => {
  const { navigation, route } = props;
  //Comments
  const [comments, setComments] = React.useState(null);
  const [isCommentsValid, setCommentsValid] = React.useState(true);

  //Warranty
  const [warranty, setWarranty] = React.useState(null);

  //OutroComments
  const [outroComments, setOutroComments] = React.useState(false);

  //Dealer Comments
  const [dealerComments, setDealerComments] = React.useState(null);
  //Outo Comments Text
  const [outroCommentsText, setOutroCommentsText] =
    React.useState("Outro comment");

  React.useEffect(() => {
    if (props.route.params && props.route.params.payload != null) {
      setOutroComments(
        props.route.params.payload.displayoutrocomments == "1" ? true : false
      );
      setComments(props.route.params.payload.SellerComments);
      setWarranty(props.route.params.payload.Warranty);
      setDealerComments(props.route.params.payload.DealerComments);
      // setWarranty(props.route.params.payload.);
    }
    setOutroCommentsText(props.route.params.outroCommentsText);
  }, []);

  const onStepThree = () => {
    if (validateFields() === true) {
      const payload = {
        ...route.params.payload,
        SellerComments: comments,
        displayoutrocomments: outroComments == true ? "1" : "0",
        Warranty: warranty,
        DealerComments: dealerComments,
      };
      navigation.navigate("FeaturesAndOptions", {
        payload: payload,
        onEdit: props.route.params.onEdit,
        editId: props.route.params.editId,
      });
    } else {
      alert("Please enter required fields");
    }
  };

  const validateFields = () => {
    if (comments) {
      return true;
    } else {
      setCommentsValid(false);
      return false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={120}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      >
        <View //Header
          style={styles.header}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons name="chevron-back" size={25} color={black} />
          </TouchableOpacity>
          <Text1 style={{ color: blackThree, fontSize: 23 }}>Description</Text1>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Home" }],
                })
              )
            }
          >
            <Entypo name="home" size={25} color={black} />
          </TouchableOpacity>
        </View>

        <View style={{ height: hp("2") }}></View>
        <View
          style={{
            width: wp("90"),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View // Step 1
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: mainBlue,
              width: wp("13"),
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: 1,
            }}
          >
            <View
              style={{
                height: undefined,
                aspectRatio: 1,
                width: wp("10"),
                backgroundColor: mainBlue,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <Text1 style={{ color: white }}>1</Text1>
            </View>
          </View>
          <View
            style={{
              height: hp("0.5"),
              backgroundColor: mainBlue,
              flex: 1,
            }}
          ></View>

          <View // Step 2
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: mainBlue,
              width: wp("13"),
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: 1,
            }}
          >
            <View
              style={{
                height: undefined,
                aspectRatio: 1,
                width: wp("10"),
                backgroundColor: mainBlue,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <Text1 style={{ color: white }}>2</Text1>
            </View>
          </View>
          <View
            style={{
              height: hp("0.5"),
              backgroundColor: greyish,
              flex: 1,
            }}
          ></View>
          <View // Step 3
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: greyish,
              width: wp("13"),
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: 1,
            }}
          >
            <View
              style={{
                height: undefined,
                aspectRatio: 1,
                width: wp("10"),
                backgroundColor: greyish,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <Text1 style={{ color: white }}>3</Text1>
            </View>
          </View>
          <View
            style={{
              height: hp("0.5"),
              backgroundColor: greyish,
              flex: 1,
            }}
          ></View>
          <View // Step 3
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: greyish,
              width: wp("13"),
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: 1,
            }}
          >
            <View
              style={{
                height: undefined,
                aspectRatio: 1,
                width: wp("10"),
                backgroundColor: greyish,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <Text1 style={{ color: white }}>4</Text1>
            </View>
          </View>
        </View>

        <View style={{ height: hp("3") }}></View>
        <View //Comments
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          {true ? (
            <View style={{ paddingLeft: wp("6") }}>
              <Text2>{"Comments"}</Text2>
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
              //   alignItems: 'center',
              //   justifyContent: "",
              elevation: 4,

              // height:hp('7%'),
              aspectRatio: 3.5,
              paddingLeft: 5,
              width: wp("89%"),
              flexDirection: "column",
              borderWidth: 0.5,
              borderColor: isCommentsValid ? lightGrey : lightPink,
              borderRadius: 12,
              alignSelf: "center",
              marginTop: hp("1"),
              backgroundColor: "white",
            }}
          >
            <TextInput
              //   ref={refForward}
              //   autoCapitalize={autoCapitalize}
              //   placeholder={placeholder}
              value={comments}
              //   autoFocus={autoFocus}
              onChangeText={(text) => {
                setComments(text);
              }}
              numberOfLines={5}
              style={{
                color: "black",
                flex: 1,
                fontSize: 16,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
              //   keyboardType={keyboardType ? keyboardType : 'default'}

              multiline={true}
              //   autoCapitalize={autoCapitalize}
              placeholderTextColor="#9b9b9b"
              //   secureTextEntry={secureTextEntry}
              //   returnKeyType={returnKeyType}
              //   onSubmitEditing={onSubmitEditing}
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
        <View style={{ height: hp("3") }}></View>
        <View // Warranty
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          {true ? (
            <View style={{ paddingLeft: wp("6") }}>
              <Text2>{"Warranty"}</Text2>
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
              //   alignItems: 'center',
              //   justifyContent: "",
              elevation: 4,

              // height:hp('7%'),
              aspectRatio: 3.5,
              paddingLeft: 5,
              width: wp("89%"),
              flexDirection: "column",
              borderWidth: 0.5,
              borderColor: lightGrey,
              borderRadius: 12,
              alignSelf: "center",
              marginTop: hp("1"),
              backgroundColor: "white",
            }}
          >
            <TextInput
              //   ref={refForward}
              //   autoCapitalize={autoCapitalize}
              //   placeholder={placeholder}
              value={warranty}
              //   autoFocus={autoFocus}
              onChangeText={(text) => {
                setWarranty(text);
              }}
              numberOfLines={5}
              style={{
                color: "black",
                flex: 1,
                fontSize: 16,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
              //   keyboardType={keyboardType ? keyboardType : 'default'}

              multiline={true}
              //   autoCapitalize={autoCapitalize}
              placeholderTextColor="#9b9b9b"
              //   secureTextEntry={secureTextEntry}
              //   returnKeyType={returnKeyType}
              //   onSubmitEditing={onSubmitEditing}
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
        <View style={{ height: hp("3") }}></View>
        <View // Warranty
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: wp("90"),
            }}
          >
            <View style={{ paddingLeft: wp("6") }}>
              <Text2>{"Outro Comments"}</Text2>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setOutroComments(!outroComments);
                }}
                style={{
                  flexDirection: "row",
                  marginBottom: 7,
                  marginLeft: wp("4"),
                  alignItems: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginRight: wp("5"),
                }}
              >
                <View
                  style={{
                    width: wp("4"),
                    height: undefined,
                    marginRight: 7,
                    marginTop: hp("1"),
                    aspectRatio: 1,
                    borderWidth: 1,
                    borderColor: greyish,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {outroComments == true ? (
                    <AntDesign name="check" color={black} />
                  ) : null}
                </View>
              </TouchableOpacity>
              <Text
                onPress={() => {
                  setOutroComments(!outroComments);
                }}
              >
                Hide
              </Text>
            </View>
          </View>

          <View
            style={{
              shadowColor: "#a8adad",
              shadowOffset:
                Platform.OS === "ios"
                  ? { width: 0.5, height: 0.5 }
                  : { width: 1, height: 1 },
              shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
              shadowRadius: Platform.OS === "ios" ? 4 : 0.5,
              //   alignItems: 'center',
              //   justifyContent: "",
              elevation: 4,

              // height:hp('7%'),
              aspectRatio: 3.5,
              paddingLeft: 5,
              width: wp("89%"),
              flexDirection: "column",
              borderWidth: 0.5,
              borderColor: lightGrey,
              backgroundColor: "#f2f2f2",
              borderRadius: 12,
              alignSelf: "center",
              marginTop: hp("1"),
              backgroundColor: "white",
            }}
          >
            <TextInput
              //   ref={refForward}
              //   autoCapitalize={autoCapitalize}
              //   placeholder={placeholder}
              value={outroCommentsText}
              //   autoFocus={autoFocus}
              onChangeText={(text) => {}}
              // value = "Read Only"
              editable={false}
              numberOfLines={5}
              style={{
                color: "black",
                flex: 1,
                backgroundColor: "#f2f2f2",
                fontSize: 16,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
              //   keyboardType={keyboardType ? keyboardType : 'default'}

              multiline={true}
              //   autoCapitalize={autoCapitalize}
              placeholderTextColor="#9b9b9b"
              //   secureTextEntry={secureTextEntry}
              //   returnKeyType={returnKeyType}
              //   onSubmitEditing={onSubmitEditing}
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

        <View style={{ height: hp("3") }}></View>
        <View // Warranty
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          {true ? (
            <View style={{ paddingLeft: wp("6") }}>
              <Text2>{"Dealer Comments"}</Text2>
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
              //   alignItems: 'center',
              //   justifyContent: "",
              elevation: 4,

              // height:hp('7%'),
              aspectRatio: 3.5,
              paddingLeft: 5,
              width: wp("89%"),
              flexDirection: "column",
              borderWidth: 0.5,
              borderColor: lightGrey,
              borderRadius: 12,
              alignSelf: "center",
              marginTop: hp("1"),
              backgroundColor: "white",
            }}
          >
            <TextInput
              //   ref={refForward}
              //   autoCapitalize={autoCapitalize}
              //   placeholder={placeholder}
              value={dealerComments}
              //   autoFocus={autoFocus}
              onChangeText={(text) => {
                setDealerComments(text);
              }}
              numberOfLines={5}
              style={{
                color: "black",
                flex: 1,
                fontSize: 16,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
              //   keyboardType={keyboardType ? keyboardType : 'default'}

              multiline={true}
              //   autoCapitalize={autoCapitalize}
              placeholderTextColor="#9b9b9b"
              //   secureTextEntry={secureTextEntry}
              //   returnKeyType={returnKeyType}
              //   onSubmitEditing={onSubmitEditing}
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

        <View style={{ height: hp("3") }}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ButtonNormal
            onPress={() => {
              navigation.pop();
              // onLogin();
              // navigation.navigate('FeaturesAndOptions');
            }}
            style={{ marginBottom: hp("2"), width: wp("40"), aspectRatio: 3 }}
            color={mainBlue}
          >
            Previous
          </ButtonNormal>
          <ButtonNormal
            onPress={() => {
              onStepThree();
              // onLogin();
              // navigation.navigate('FeaturesAndOptions');
            }}
            style={{ marginBottom: hp("2"), width: wp("40"), aspectRatio: 3 }}
            color={mainBlue}
          >
            Next
          </ButtonNormal>
        </View>

        <View style={{ height: hp("2") }}></View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default VehicleDescription;

const styles = StyleSheet.create({
  header: {
    width: undefined,
    height: hp("8"),
    paddingTop: hp("1"),
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp("4"),
  },
});
