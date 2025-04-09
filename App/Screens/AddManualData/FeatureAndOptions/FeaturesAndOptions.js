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
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
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
  blackThree,
} from '../../../Assets/colors/colors';
import {useEffect} from 'react';

const FeaturesAndOptions = props => {
  const {navigation, route} = props;
  var optionsObj = {};
  //Exterior
  const [exteriorList, setExteriorList] = useState([]);
  const [showExterior, setShowExterior] = useState(false);
  //Interior
  const [interiorList, setInteriorList] = useState([]);
  const [showInterior, setShowInterior] = useState(false);
  //MechanicalOptions
  const [mechanicalList, setMechanicalList] = useState([]);
  const [showMechanical, setShowMechanical] = useState(false);
  //SafetyOptions
  const [safetyList, setSafetyList] = useState([]);
  const [showSafety, setShowSafety] = useState(false);
  //Entertainment Options
  const [entertainmentList, setEntertainmentList] = useState([]);
  const [showEntertainment, setShowEntertainment] = useState(false);

  const [options, setOptions] = useState([
    {key: 'Air Conditioning', isSelected: false},
    {key: 'Alloy Wheels', isSelected: false},
    {key: 'ABS Brakes', isSelected: false},
    {key: 'Vehicle Anti-Theft System', isSelected: false},
    {key: 'Auto Dimming Mirrors', isSelected: false},
    {key: 'Automatic Headlight', isSelected: false},
    {key: 'AM/FM Stereo', isSelected: false},
    {key: 'Backup Camera', isSelected: false},
    {key: 'Bluetooth', isSelected: false},
    {key: 'CD Player', isSelected: false},
    {key: 'Center Arm Rest', isSelected: false},
    {key: 'Child-Safety Locks', isSelected: false},
    {key: 'Climate Control', isSelected: false},
    {key: 'Cloth Interior', isSelected: false},
    {key: 'Cruise Control', isSelected: false},
    {key: 'Cup Holder', isSelected: false},
    {key: 'DVD Player', isSelected: false},
    {key: 'Daytime Running Lights', isSelected: false},
    {key: 'Digital Clock', isSelected: false},
    {key: 'Disability Equipped', isSelected: false},
    {key: 'Driver Side Airbag', isSelected: false},
    {key: 'Dual impact Airbags', isSelected: false},
    {key: 'Multi-Zone A/C', isSelected: false},
    {key: 'Entertainment System', isSelected: false},
    {key: 'Fog Lights', isSelected: false},
    {key: 'Folding Rear Seat', isSelected: false},
    {key: '3rd Row Seating', isSelected: false},
    {key: 'Heated Exterior Mirrors', isSelected: false},
    {key: 'Heated Seats', isSelected: false},
    {key: 'Hill Ascent Control', isSelected: false},
    {key: 'Keyless Entry', isSelected: false},
    {key: 'Leather Seats', isSelected: false},
    {key: 'Leather Steering Wheels', isSelected: false},
    {key: 'Memory Seat', isSelected: false},
    {key: 'Navigation System', isSelected: false},
    {key: 'Night Vision', isSelected: false},
    {key: 'Parking Sensor', isSelected: false},
    {key: 'Passenger Airbag', isSelected: false},
    {key: 'Power Brakes', isSelected: false},
    {key: 'Power Locks', isSelected: false},
    {key: 'Power Mirrors', isSelected: false},
    {key: 'Power Seat', isSelected: false},
    {key: 'Power Sliding Door', isSelected: false},
    {key: 'Power Steering', isSelected: false},
    {key: 'Power Windows', isSelected: false},
    {key: 'Power-Assist Disc Brakes', isSelected: false},
    {key: 'Premium Audio', isSelected: false},
    {key: 'Rain Sensor Wipers', isSelected: false},
    {key: 'Rear Window Defroster', isSelected: false},
    {key: 'Rear Windows Wiper', isSelected: false},
    {key: 'Remote Trunk Release', isSelected: false},
    {key: 'Satellite Radio', isSelected: false},
    {key: 'Security System', isSelected: false},
    {key: 'Side Airbag', isSelected: false},
    {key: 'Electronic  Stability Control', isSelected: false},
    {key: 'Sunroof/Moonroof', isSelected: false},
    {key: 'Tilt Steering', isSelected: false},
    {key: 'Tinted Glass', isSelected: false},
    {key: 'Low Tire Pressure Warning', isSelected: false},
    {key: 'Tow Package', isSelected: false},
    {key: 'Traction Control', isSelected: false},
    {key: 'Trip Odometer', isSelected: false},
    {key: 'Wood Trim Interior', isSelected: false},
    {key: 'Xenon Headlights', isSelected: false}
  ]);


  const onPressCheckBox = index => {
    let items = [...options];
    items[index].isSelected = !items[index].isSelected;
    setOptions(items);
  };

  const onExteriorCheckBox = index => {
    let items = [...exteriorList];
    items[index].isSelected = !items[index].isSelected;
    setExteriorList(items);
  };
  const onInteriorCheckBox = index => {
    let items = [...interiorList];
    items[index].isSelected = !items[index].isSelected;
    setInteriorList(items);
  };
  const onMechanicalCheckBox = index => {
    let items = [...mechanicalList];
    items[index].isSelected = !items[index].isSelected;
    setMechanicalList(items);
  };
  const onSafetyCheckBox = index => {
    let items = [...safetyList];
    items[index].isSelected = !items[index].isSelected;
    setSafetyList(items);
  };
  const onEntertainmentCheckBox = index => {
    let items = [...entertainmentList];
    items[index].isSelected = !items[index].isSelected;
    setEntertainmentList(items);
  };

  useEffect(() => {
    route.params.payload.exteriorOptionsList.length > 0
      ? setExteriorList(route.params.payload.exteriorOptionsList)
      : setExteriorList([]);
    route.params.payload.interiorOptionsList.length > 0
      ? setInteriorList(route.params.payload.interiorOptionsList)
      : setInteriorList([]);
    route.params.payload.mechanicalOptionsList.length > 0
      ? setMechanicalList(route.params.payload.mechanicalOptionsList)
      : setMechanicalList([]);
    route.params.payload.safetyOptionsList.length > 0
      ? setSafetyList(route.params.payload.safetyOptionsList)
      : setSafetyList([]);
    route.params.payload.entertainmentOptionsList.length > 0
      ? setEntertainmentList(route.params.payload.entertainmentOptionsList)
      : setSafetyList([]);
    if (route.params.payload.VehicleOptions.length > 0) {
      console.log('==================length==================');
      console.log(route.params.payload.VehicleOptions.length);
      console.log('====================================');
      setVehicleOptions(route.params.payload.VehicleOptions);
    }

    // route.params.payload.interiorOptionsList.forEach(item => {
    //   console.log('====================================');
    //   console.log(item);
    //   console.log('====================================');
    // });

    
  }, []);

  const setVehicleOptions = array => {
    let tempArray = options;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < tempArray.length; j++) {
        if (array[i].key === tempArray[j].key) {
          tempArray[j].isSelected = true;
        }
      }
    }
    setOptions(tempArray);
  };

  const onStepFour = () => {
    options.forEach((element, index) => {
      if (element.isSelected == true && index < 64) {
        optionsObj[index.toString()] = '1';
      }
    });
    const payload = {
      ...route.params.payload,
      VehicleOptions: optionsObj,
      exteriorOptionsList: exteriorList,
      interiorOptionsList: interiorList,
      mechanicalOptionsList: mechanicalList,
      safetyOptionsList: safetyList,
      entertainmentOptionsList: entertainmentList,
      
    };
    console.log('====================================');
    console.log(payload);
    console.log('====================================');
    navigation.navigate('WebsiteDisplay', {
      payload: payload,
      onEdit: props.route.params.onEdit,
      editId: props.route.params.editId,
    });
  };

  return (
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
          <Text1 style={{color: blackThree, fontSize: 23}}>
            Features & Options
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
              backgroundColor: greyish,
              flex: 1,
            }}></View>
          <View // Step 3
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: greyish,
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
                backgroundColor: greyish,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Text1 style={{color: white}}>4</Text1>
            </View>
          </View>
        </View>
        <View style={{height: hp('2')}}></View>
        <View style={{marginLeft: wp('4')}}>
          <Text2 style={{fontSize: 18}}>Standard Equipments</Text2>
        </View>
        <View style={{height: hp('2')}}></View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowExterior(!showExterior)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {showExterior == false ? <Text1>+</Text1> : <Text1>-</Text1>}
            <View style={{width: 10}}></View>

            <FontAwesome name="folder-open" color={mainBlue} size={20} />
            <View style={{width: 5}}></View>
            <Text2 style={{fontSize: 16}}>Exterior</Text2>
          </TouchableOpacity>
        </View>
        {showExterior == true &&
          exteriorList.map((item, index) => (
            <TouchableOpacity
              onPress={() => onExteriorCheckBox(index)}
              style={{
                flexDirection: 'row',
                marginTop: 7,
                marginLeft: wp('4'),
                alignItems: 'center',
                marginRight: wp('5'),
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

        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowMechanical(!showMechanical)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {showMechanical == false ? <Text1>+</Text1> : <Text1>-</Text1>}
            <View style={{width: 10}}></View>

            <FontAwesome name="folder-open" color={mainBlue} size={20} />
            <View style={{width: 5}}></View>
            <Text2 style={{fontSize: 16}}>Mechanical</Text2>
          </TouchableOpacity>
        </View>
        {showMechanical == true &&
          mechanicalList.map((item, index) => (
            <TouchableOpacity
              onPress={() => onMechanicalCheckBox(index)}
              style={{
                flexDirection: 'row',
                marginTop: 7,
                marginLeft: wp('4'),
                alignItems: 'flex-start',

                marginRight: wp('5'),
              }}>
              <View
                style={{
                  width: wp('4'),
                  height: undefined,
                  marginRight: 7,
                  marginTop: hp('1'),
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
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowInterior(!showInterior)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {showInterior == false ? <Text1>+</Text1> : <Text1>-</Text1>}
            <View style={{width: 10}}></View>
            <FontAwesome name="folder-open" color={mainBlue} size={20} />
            <View style={{width: 5}}></View>
            <Text2 style={{fontSize: 16}}>Interior</Text2>
          </TouchableOpacity>
        </View>
        {showInterior == true &&
          interiorList.map((item, index) => (
            <TouchableOpacity
              onPress={() => onInteriorCheckBox(index)}
              style={{
                flexDirection: 'row',
                marginTop: 7,
                marginLeft: wp('4'),
                alignItems: 'flex-start',

                marginRight: wp('5'),
              }}>
              <View
                style={{
                  width: wp('4'),
                  height: undefined,
                  marginRight: 7,
                  marginTop: hp('1'),
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

        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowSafety(!showSafety)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {showSafety == false ? <Text1>+</Text1> : <Text1>-</Text1>}
            <View style={{width: 10}}></View>
            <FontAwesome name="folder-open" color={mainBlue} size={20} />
            <View style={{width: 5}}></View>
            <Text2 style={{fontSize: 16}}>Safety</Text2>
          </TouchableOpacity>
        </View>
        {showSafety == true &&
          safetyList.map((item, index) => (
            <TouchableOpacity
              onPress={() => onSafetyCheckBox(index)}
              style={{
                flexDirection: 'row',
                marginTop: 7,
                marginLeft: wp('4'),
                alignItems: 'flex-start',
                marginRight: wp('5'),
              }}>
              <View
                style={{
                  width: wp('4'),
                  height: undefined,
                  marginRight: 7,
                  marginTop: hp('1'),
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

        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowEntertainment(!showEntertainment)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {showEntertainment == false ? <Text1>+</Text1> : <Text1>-</Text1>}
            <View style={{width: 10}}></View>
            <FontAwesome name="folder-open" color={mainBlue} size={20} />
            <View style={{width: 5}}></View>
            <Text2 style={{fontSize: 16}}>Entertainment</Text2>
          </TouchableOpacity>
        </View>
        {showEntertainment == true &&
          entertainmentList.map((item, index) => (
            <TouchableOpacity
              onPress={() => onEntertainmentCheckBox(index)}
              style={{
                flexDirection: 'row',
                marginTop: 7,
                marginLeft: wp('4'),
                alignItems: 'flex-start',
                marginRight: wp('5'),
              }}>
              <View
                style={{
                  width: wp('4'),
                  height: undefined,
                  marginRight: 7,
                  marginTop: hp('1'),
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 7,
            marginLeft: wp('4'),
            alignItems: 'center',
          }}>
          <FontAwesome name="folder-open" color={mainBlue} size={20} />
          <View style={{width: 5}}></View>
          <Text2 style={{fontSize: 16}}>Options</Text2>
        </View>
        <View style={{height: hp('1')}}></View>
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
              onStepFour();
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
  );
};

export default FeaturesAndOptions;

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
