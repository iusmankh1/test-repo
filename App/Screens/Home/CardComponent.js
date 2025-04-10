import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import {Text1, Text2} from '../../Components/TextComponent/TextComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchBar from 'react-native-dynamic-search-bar';
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
  lightGrey,
  lightBlue,
} from '../../Assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import { ColorSpace } from "react-native-reanimated";

const MainCard = ({
  item,
  onPress,
  onDeactivate,
  onActivate,
  onPressEdit,
  onPressDelete,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  let title = `${item.Year} ${item.vMake} ${item.vModel}`;
  title = title.substr(0, 25) + (title.length > 25 ? '...' : '');

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View //Main Card
        style={{
          marginBottom: hp('2'),
          alignSelf: 'center',
          height: undefined,
          width: wp('90'),
          aspectRatio: 2.8,
          borderRadius: 8,

          // shadowColor: "#171717",
          // shadowOffset: { width: -2, height: 4 },
          // shadowOpacity: 0.2,
          // shadowRadius: 3,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,

          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 13,
          borderWidth: 1,
          borderColor: lightGrey,
          backgroundColor: '#FFFFFF',
        }}>
        <View //Image Card
          style={{
            width: wp('27'),
            height: undefined,
            aspectRatio: 1.1,
            // borderRadius: 20,
            backgroundColor: lightGrey,
            overflow: 'hidden',
            // borderColor: mainBlue,
            // borderWidth: 1,
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%'}}
          />
        </View>

        <View // Car Details
          style={{
            width: wp('53.5'),
            // backgroundColor: 'red',
            height: undefined,
            aspectRatio: 2.1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                // backgroundColor: 'yellow',
                width: wp(40),
                flex: 1,
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: hp('1'),
              }}>
              <Text1 style={{fontSize: 15, flexWrap: 'wrap'}}>{title}</Text1>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                width: wp(10),
                height: hp(4),
                alignItems: 'flex-end',
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Entypo name="dots-three-vertical" size={20} color={mainBlue} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            {item.WebsiteFeaturedAd == '1' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 2,
                  borderRadius: 40,
                  backgroundColor: mainBlue,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}>
                <Text style={{fontSize: 11, color: white}}>Featured</Text>
              </View>
            ) : null}
            {item.SalePending_SiteDisplay == '1' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 2,
                  borderRadius: 40,
                  backgroundColor: '#d32f2f',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontSize: 11, color: white}}>Sale Pending</Text>
              </View>
            ) : null}
          </View>
          <View>
            <Text style={{fontSize: wp(2.8)}}>{item.StockNumber}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 3,
            }}>
            {item.Price != null || item.Price == '' ? (
              item.DisplaySpecialPrice == 1 ? (
                <Text2
                  style={{
                    fontWeight: '500',
                    textDecorationLine: 'line-through',
                  }}>
                  {`$${item.Price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                </Text2>
              ) : (
                <Text2
                  style={{
                    fontWeight: '500',
                  }}>
                  {`$${item.Price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                </Text2>
              )
            ) : (
              ''
            )}
            <Text2 style={{fontWeight: '500', color: 'green'}}>
              {item.DisplaySpecialPrice == 1 && item.SpecialPrice
                ? `$${item.SpecialPrice.replace(
                    /(\d)(?=(\d{3})+(?!\d))/g,
                    '$1,',
                  )}`
                : ''}
            </Text2>
            <Text>{'      '}</Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 2,
                borderRadius: 40,
                backgroundColor: lightBlue,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 11}}>
                {item.active == '1' ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>

        {/* <Text2 style={{fontSize: 14, color: greyish}}>
            Model: {item.vModel}
          </Text2> */}
        {/* <Text2 style={{fontSize: 14, color: greyish}}>
            {item.mileage} KM
          </Text2> */}

        {modalVisible == true ? (
          <View
            style={{
              position: 'absolute',
              height: hp('13'),
              alignSelf: 'center',
              width: wp('30'),
              left: wp('45'),
              top: 0,
              borderRadius: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              backgroundColor: white,
              borderWidth: 0.5,
              borderColor: lightGrey,
            }}>
            <TouchableOpacity
              onPress={() => {
                onPressEdit();
                setModalVisible(false);
              }}
              style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
              }}>
              <Text2>Edit</Text2>
              {/* <AntDesign name="edit" size={20} color={black} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressDelete();
                setModalVisible(false);
              }}
              style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
              }}>
              <Text2>Delete</Text2>
              {/* <AntDesign name="delete" size={20} color={black} /> */}
            </TouchableOpacity>
            {item.active != '1' ? (
              <TouchableOpacity
                onPress={() => {
                  onActivate();
                  setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: 'grey',
                }}>
                <Text2>Activate</Text2>
                {/* <AntDesign name="edit" size={20} color={black} /> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onDeactivate();
                  setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Text2>Deactivate</Text2>
                {/* <AntDesign name="edit" size={20} color={black} /> */}
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text2>Close</Text2>
            </TouchableOpacity> */}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  card: {
    //flex:1,
    alignItems: 'center',
    alignSelf: 'center',
    height: responsiveHeight(40),
    backgroundColor: 'white',
    width: responsiveWidth(90),
    borderRadius: Math.round(responsiveWidth(90) + responsiveHeight(40)) / 25,
    marginTop: responsiveHeight(30),
    padding: '7%',
    // opacity: 1,
  },
});
