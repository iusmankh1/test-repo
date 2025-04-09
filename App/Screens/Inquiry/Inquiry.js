import React from "react";
import {
  mainBlue,
  backgroundColor,
  white,lightGrey,
  black,
  greyish,
} from "../../Assets/colors/colors";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
import TextField from "../../Components/TextFieldComponent/TextField";
import ButtonNormal from "../../Components/ButtonComponent/ButtonNormal";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import Spinner from "react-native-loading-spinner-overlay";
import { devBaseURL } from "../../Config/networkModule";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { logIn } from "../../Redux/Actions/authActions";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import axios from "axios";

const Login = (props) => {
  const { navigation, logIn } = props;
  const [isEmailValid, setEmailValid] = React.useState(true);
  // const [email, setEmail] = React.useState("app.demo@autobunny.ca");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [request, setRequest] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  // useEffect(() => {}, []);
  const renderLogo = () => {
    return (
      <View
        style={{
          width: undefined,
          height: hp("20"),
          width: wp(60),
          // aspectRatio: 1,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%",
          }}
          source={require("../../Assets/images/AutoBunny.png")}
        ></Image>
      </View>
    );
  };

  const renderEmailField = () => {
    return (
      <TextField
        isFieldValid={isEmailValid}
        length={40}
        returnKeyType="next"
        autoCapitalize="none"
        placeholder="Email Address"
        fieldValue={email}
        keyboardType={"default"}
        blurOnSubmit={false}
        onChangeField={(text) => {setIncorrectCredentials(false); setEmail(text);}}
      />
    );
  };
  function ValidateEmail(inputText) {
    //Validate Email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      setEmailValid(true);
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }

  const onLogin = async () => {
    setSpinner(true);
    setRequired(false);
    console.log(name, email, phone);
    const isEmailValid = ValidateEmail(email);
    setEmailValid(isEmailValid);
    if (isEmailValid && name && phone && request) {
      const body = {
        email: email,
        name: name,
        phone: phone,
        comment: request,
      };
      const link = `${devBaseURL}/appuserinquiry`;
      console.log(link);
      
      await axios
        .post(link, body, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
            console.log(response.data);
            setName("");
            setEmail("");
            setPhone("");
            setRequest("");
            setIncorrectCredentials(true)
            setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e);
          //show eror
        });
    } else {
      setSpinner(false);
      setRequired(true);
    }
  };

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />

      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ height: hp("5") }}></View>
            <Text1>Submit Account Deletion Request</Text1>

            <View style={{ height: 10 }}></View>
            <View style={{ height: 10 }}></View>
            <TextField
                isFieldValid={true}
                length={40}
                returnKeyType="next"
                autoCapitalize="none"
                placeholder="Full Name"
                fieldValue={name}
                keyboardType={"default"}
                blurOnSubmit={false}
                onChangeField={(text) => {setIncorrectCredentials(false); setName(text);}}
            />
            <View style={{ height: 8 }}></View>
            {renderEmailField()}
            <View style={{ height: 8 }}></View>
            <TextField
                isFieldValid={true}
                length={40}
                returnKeyType="next"
                autoCapitalize="none"
                placeholder="Phone"
                fieldValue={phone}
                keyboardType={"default"}
                blurOnSubmit={false}
                onChangeField={(text) => {setIncorrectCredentials(false); setPhone(text);}}
            />
            <View style={{ height: 8 }}></View>
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
              aspectRatio: 6.5,
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
              value={request}
              onChangeText={(text) => {
                setRequest(text);
              }}
              numberOfLines={5} 
              placeholder="Reason"
              style={{
                color: "black",
                flex: 1,
                fontSize: 16,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
              multiline={true}
              placeholderTextColor="#9b9b9b"
            />
            </View>
            <View style={{ height: 20 }}></View>

            <View style={{paddingHorizontal: 18}}>
                <Text2 style={{color: "green", textAlign: 'center'}}>
                    {incorrectCredentials? 'Thanks for submitting an inquiry, we will get back to you as soon as possible.' : ''}
                </Text2>
                <Text2 style={{color: "red", textAlign: 'center'}}>
                    {required? 'All fields are required.' : ''}
                </Text2>
            </View>
            <ButtonNormal
              onPress={() => {
                onLogin();
                // navigation.navigate('Home');
              }}
              style={{ marginBottom: hp("2") }}
              color={mainBlue}
            >
              Submit
            </ButtonNormal>
            <View style={{ flexDirection: "row" }}>
              <Text> </Text>
              <Text style={{ fontWeight: "500", color: mainBlue }} onPress={() => { navigation.navigate("Home"); }}>
                Go Back
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    logIn: (token, dealer) => dispatch(logIn(token, dealer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
