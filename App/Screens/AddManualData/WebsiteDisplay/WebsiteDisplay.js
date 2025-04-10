import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  CheckBox,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextField from '../../../Components/TextFieldComponent/TextField';
import {Text1, Text2} from '../../../Components/TextComponent/TextComponent';
import ButtonNormal from '../../../Components/ButtonComponent/ButtonNormal';
import ModalComponent from '../../../Components/ModalComponent/ModalComponent';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Activity from '../../../Components/ActivityIndicator/ActivityIndicator';
// import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
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
  lightGrey,
  lightPink,
  blackThree,
} from '../../../Assets/colors/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const WebsiteDisplay = props => {
  const {navigation, route, accessToken} = props;
  //Spinner
  const [spinner, setSpinner] = React.useState(false);
  //Payment
  const [payment, setPayment] = React.useState(null);

  //Carfax Link
  const [carfaxLink, setCarfaxLink] = React.useState(null);
  const [isValidCarFaxLink, setIsValidCarFaxLink] = React.useState(true);

  const [options, setOptions] = React.useState([
    { //64
      key: 'Featured on the Website',
      isSelected: false,
    },
    { //65
      key: 'Hide Price',
      isSelected: false,
    },
    { //66
      key: 'Hide Kilometers',
      isSelected: false,
    },
    { //67
      key: 'Hide Fuel',
      isSelected: false,
    },
    { //68
      key: 'Hide Vin',
      isSelected: false,
    },
    { //69
      key: 'Hide Standard Equipments',
      isSelected: false,
    },
    { //70
      key: 'Display Sale Pending On Website',
      isSelected: false,
    },
    { //71
      key: 'Hide Stock Number',
      isSelected: false,
    },
    { //72
      key: 'Display Payment',
      isSelected: false,
    },
    { //73
      key: 'Display Call for Price',
      isSelected: false,
    },
    { //74
      key: 'Display Special Price ',
      isSelected: false,
    },
    { //75
      key: 'Display Carfax Link',
      isSelected: false,
    }
  ])

  //ETest
  const [eTest, setETest] = React.useState(null);
  const [isValidETest, setIsValidETest] = React.useState(true);
  

  //Other Link
  const [otherLink, setOtherLink] = React.useState(null);
  const [isValidOtherLink, setIsValidOtherLink] = React.useState(true);


  useEffect(() => {
    if (props.route.params.onEdit == true) {
      if (props.route.params && props.route.params.payload != null) {
        console.log(props.route.params.payload);
        setPayment(props.route.params.payload.Payment);
      }
      if (props.route.params && props.route.params.payload != null) {
        setETest(props.route.params.payload.ETest);
      }
      if (props.route.params && props.route.params.payload != null) {
        setCarfaxLink(props.route.params.payload.CarproofLink);
      }
      if (props.route.params && props.route.params.payload != null) {
        setOtherLink(props.route.params.payload.OtherLink);
      }

      //  else if (props.route.params.payload.DisplaySpecialPrice) {
      //   items[10].isSelected =
      //     props.route.params.payload.DisplaySpecialPrice == '1' ? true : false;
      // }
    }

    let items = [...options];
    if (props.route.params.payload.WebsiteFeaturedAd) {
      items[0].isSelected =
        props.route.params.payload.WebsiteFeaturedAd == '1' ? true : false;
    }
    if (props.route.params.payload.HidePrice) {
      items[1].isSelected =
        props.route.params.payload.HidePrice == '1' ? true : false;
    }
    if (props.route.params.payload.HideKm) {
      items[2].isSelected =
        props.route.params.payload.HideKm == '1' ? true : false;
    }
    if (props.route.params.payload.HideFuelCityHwy) {
      items[3].isSelected =
        props.route.params.payload.HideFuelCityHwy == '1' ? true : false;
    }
    if (props.route.params.payload.HideVin) {
      items[4].isSelected =
        props.route.params.payload.HideVin == '1' ? true : false;
    }
    if (props.route.params.payload.HideOptions) {
      items[5].isSelected =
        props.route.params.payload.HideOptions == '1' ? true : false;
    }
    if (props.route.params.payload.SalePending_SiteDisplay) {
      items[6].isSelected =
        props.route.params.payload.SalePending_SiteDisplay == '1'
          ? true
          : false;
    }
    if (props.route.params.payload.HideStockNumber) {
      items[7].isSelected =
        props.route.params.payload.HideStockNumber == '1' ? true : false;
    }
    if (props.route.params.payload.DisplayPayment) {
      items[8].isSelected =
        props.route.params.payload.DisplayPayment == '1' ? true : false;
    }
    if (props.route.params.payload.DisplayCallForPrice) {
      items[9].isSelected =
        props.route.params.payload.DisplayCallForPrice == '1' ? true : false;
    }
    if (props.route.params.payload.DisplaySpecialPrice) {
      items[10].isSelected =
        props.route.params.payload.DisplaySpecialPrice == '1' ? true : false;
    }
    if (props.route.params.payload.DisplayCarproofLink) {
      items[11].isSelected =
        props.route.params.payload.DisplayCarproofLink == '1' ? true : false;
    }

    setOptions(items);
  }, []);

  const onPressCheckBox = index => {
    let items = [...options];
    items[index].isSelected = !items[index].isSelected;
    setOptions(items);
  };

  const onStepFive = async () => {
    //validation
    if(!validURL(carfaxLink)) {
      setIsValidCarFaxLink(false);
      alert("Invalid CarFax URL");
      return;
    }else if(!validURL(eTest)){
      setIsValidETest(false);
      alert("Invalid ETest URL");
      return;
    }else if(!validURL(otherLink)) {
      setIsValidOtherLink(false);
      alert("Invalid Other Link");
      return;
    }

    const payload = {
        ...route.params.payload,
        Payment: payment,
        CarproofLink: carfaxLink,
        ETest: eTest,
        OtherLink: otherLink,
        active: '1',
        last_user_ip: null,

        WebsiteFeaturedAd: options[0].isSelected == true ? '1' : '0',
        HidePrice: options[1].isSelected == true ? '1' : '0',
        HideKm: options[2].isSelected == true ? '1' : '0',
        HideFuelCityHwy: options[3].isSelected == true ? '1' : '0',
        HideVin: options[4].isSelected == true ? '1' : '0',
        HideOptions: options[5].isSelected == true ? '1' : '0',
        SalePending_SiteDisplay: options[6].isSelected == true ? '1' : '0',
        HideStockNumber: options[7].isSelected == true ? '1' : '0',
        DisplayPayment: options[8].isSelected == true ? '1' : '0',
        DisplayCallForPrice: options[9].isSelected == true ? '1' : '0',
        DisplaySpecialPrice: options[10].isSelected == true ? '1' : '0',
        DisplayCarproofLink: options[11].isSelected == true ? '1' : '0',
      };

    navigation.navigate('AddPhotos', {
      payload: payload,
      onEdit: props.route.params.onEdit,
      editId: props.route.params.editId,
    });
  };
  function validURL(str) {
    if(str) {
      var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }
    return true;
  }

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}>
          <View //Header
            style={styles.header}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="chevron-back" size={25} color={black} />
            </TouchableOpacity>
            <Text1 style={{color: blackThree, fontSize: 20}}>
              {' '}
              Website Display & Hyperlinks
            </Text1>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'Home'}],
                  }),
                )
              }>
              <Entypo name="home" size={25} color={black} />
            </TouchableOpacity>
          </View>

          <View style={{height: hp('2')}}></View>
          <View
            style={{
              width: wp('90'),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View // Step 1
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: mainBlue,
                width: wp('13'),
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
              }}>
              <View
                style={{
                  height: undefined,
                  aspectRatio: 1,
                  width: wp('10'),
                  backgroundColor: mainBlue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text1 style={{color: white}}>1</Text1>
              </View>
            </View>
            <View
              style={{
                height: hp('0.5'),
                backgroundColor: mainBlue,
                flex: 1,
              }}></View>

            <View // Step 2
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: mainBlue,
                width: wp('13'),
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
              }}>
              <View
                style={{
                  height: undefined,
                  aspectRatio: 1,
                  width: wp('10'),
                  backgroundColor: mainBlue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text1 style={{color: white}}>2</Text1>
              </View>
            </View>
            <View
              style={{
                height: hp('0.5'),
                backgroundColor: mainBlue,
                flex: 1,
              }}></View>
            <View // Step 3
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: mainBlue,
                width: wp('13'),
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
              }}>
              <View
                style={{
                  height: undefined,
                  aspectRatio: 1,
                  width: wp('10'),
                  backgroundColor: mainBlue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text1 style={{color: white}}>3</Text1>
              </View>
            </View>
            <View
              style={{
                height: hp('0.5'),
                backgroundColor: mainBlue,
                flex: 1,
              }}></View>
            <View // Step 3
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: mainBlue,
                width: wp('13'),
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
              }}>
              <View
                style={{
                  height: undefined,
                  aspectRatio: 1,
                  width: wp('10'),
                  backgroundColor: mainBlue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text1 style={{color: white}}>4</Text1>
              </View>
            </View>
          </View>
          <View style={{height: hp('2')}}></View>
          {options.map((item, index) => (
          <TouchableOpacity
            onPress={() => onPressCheckBox(index)}
            style={{
              flexDirection: 'row',
              marginTop: 7,
              marginLeft: wp('4'),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp('4'),
                height: undefined,
                marginRight: 7,
                aspectRatio: 1,
                borderWidth: 1,
                borderColor: greyish,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.isSelected == true ? (
                <AntDesign name="check" color={black} />
              ) : null}
            </View>
            <Text2 style={{fontSize: 16}}>{item.key}</Text2>
          </TouchableOpacity>
        ))}
          <View style={{height: hp('2')}}></View>
          <TextField
            showHeading={true}
            headingText="Payment"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'Payment'}
            fieldValue={payment}
            keyboardType={'default'}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // secureTextEntry={true}
            // autoFocus={true}
            blurOnSubmit={false}
            onChangeField={text => setPayment(text)}
          />
          <View style={{height: hp('2')}}></View>
          <TextField
            showHeading={true}
            headingText="Carfax Link"
            // ref={passwordRef}
            isFieldValid={true} 
            style={{
              borderColor: isValidCarFaxLink ? lightGrey : lightPink,
            }}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'Carfax Link'}
            fieldValue={carfaxLink}
            keyboardType={'default'}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // secureTextEntry={true}
            // autoFocus={true}
            // keyboardType={'email-address'}
            blurOnSubmit={false}
            onChangeField={text => setCarfaxLink(text)}
          />
          <View style={{height: hp('2')}}></View>
          <TextField
            showHeading={true}
            headingText="ETest"
            // ref={passwordRef}
            isFieldValid={true}
            style={{
              borderColor: isValidETest ? lightGrey : lightPink,
            }}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'ETest'}
            fieldValue={eTest}
            keyboardType={'default'}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // secureTextEntry={true}
            // autoFocus={true}
            // keyboardType={'email-address'}
            blurOnSubmit={false}
            onChangeField={text => {
              setETest(text);
            }}
          />
          <View style={{height: hp('2')}}></View>
          <TextField
            showHeading={true}
            headingText="Other Link"
            // ref={passwordRef}
            isFieldValid={true}
            style={{
              borderColor: isValidOtherLink ? lightGrey : lightPink,
            }}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'Other Link'}
            fieldValue={otherLink}
            keyboardType={'default'}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // secureTextEntry={true}
            // autoFocus={true}
            // keyboardType={'email-address'}
            blurOnSubmit={false}
            onChangeField={text => setOtherLink(text)}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <ButtonNormal
              onPress={() => {
                navigation.pop();
                // onLogin();
                // navigation.navigate('FeaturesAndOptions');
              }}
              style={{marginBottom: hp('2'), width: wp('40'), aspectRatio: 3}}
              color={mainBlue}>
              Previous
            </ButtonNormal>
            <ButtonNormal
              onPress={() => {
                onStepFive();
                // onLogin();
                // navigation.navigate('FeaturesAndOptions');
              }}
              style={{marginBottom: hp('2'), width: wp('40'), aspectRatio: 3}}
              color={mainBlue}>
              Next
            </ButtonNormal>
          </View>

          <View style={{height: hp('2')}}></View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  return {
    accessToken: state.authReducer.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteDisplay);

const styles = StyleSheet.create({
  header: {
    width: undefined,
    height: hp('8'),
    paddingTop: hp('1'),
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('4'),
  },
});
