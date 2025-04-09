import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import {
    mainBlue,
    white,
    lightGrey,
    lightBlue,
  } from "../../Assets/colors/colors";
  import Entypo from "react-native-vector-icons/Entypo";
  import {
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
  import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
  
  const CustomerCard = ({
    item,
    onPress,
    onPressEdit,
    onPressDelete,
  }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    let title = `${item.first_name} ${item.last_name}`;
    title = title.substr(0,25)+(title.length>25?'...':'')
    const isFocused = useIsFocused();
  
    useEffect(() => {
      setModalVisible(false);
    }, [isFocused]);
  
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <View //Main Card
          style={{
            marginBottom: hp("2"),
            alignSelf: "center",
            height: undefined,
            width: wp("90"),
            aspectRatio: 2.8,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 13,
            borderWidth: 1,
            borderColor: lightGrey,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View // Car Details
            style={{
              width: wp("82"),
              height: undefined,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  width: wp(40),
                  flex: 1,
                  justifyContent: "space-between",
                  marginBottom: hp("1"),
                }}
              >
                <Text1 style={{ fontSize: 15, flexWrap: "wrap" }}>
                  {title}
                </Text1>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  width: wp(10),
                  height: hp(4),
                  alignItems: "flex-end",
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Entypo name="dots-three-vertical" size={20} color={mainBlue} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: wp(2.8)}}>
                { item.phone_number ? (<Icon name="phone" color={'gray'} />) : "" } {item.phone_number }
                  </Text>
            </View>
            <View>
              <Text style={{fontSize: wp(2.8), marginTop: 5 }}>
                { item.phone_number_3 ? (<Icon name="mobile" color={'gray'} />) : "" } {item.phone_number_3 }
                  </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
                  <Text2
                    style={{
                      fontWeight: "500",
                    }}
                  >
                     <Icon name="envelope" /> {item.email}
                  </Text2>
                
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 2,
                  borderRadius: 40,
                  backgroundColor: lightBlue,
                  paddingHorizontal: 10,
                }}
              >
                <Text>{item.is_customer == 1 ? 'Customer' : 'Lead'}</Text>
              </View>
            </View>
          </View>
  
          {modalVisible == true ? (
            <View
              style={{
                position: "absolute",
                height: hp("13"),
                alignSelf: "center",
                width: wp("30"),
                left: wp("45"),
                top: 0,
                borderRadius: 10,
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                backgroundColor: white,
                borderWidth: 0.5,
                borderColor: lightGrey,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onPressEdit();
                  setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                }}
              >
                <Text2>Edit</Text2>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onPressDelete();
                  setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                }}
              >
                <Text2>Delete</Text2>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
  
  export default CustomerCard;
  
  const styles = StyleSheet.create({
    card: {
      alignItems: "center",
      alignSelf: "center",
      height: responsiveHeight(40),
      backgroundColor: "white",
      width: responsiveWidth(90),
      borderRadius: Math.round(responsiveWidth(90) + responsiveHeight(40)) / 25,
      marginTop: responsiveHeight(30),
      padding: "7%",
    },
  });
  