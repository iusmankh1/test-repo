import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { Text1, Text2 } from "../TextComponent/TextComponent";
import { black, mainBlue } from "../../Assets/colors/colors";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomSearchBar from "../SearchBar/CustomSearchBar";
import {
  greenBlue,
  darkBlueGrey,
  warmGrey,
  lightGrey,
  lightPink,
} from "../../Assets/colors/colors";
import filter from "lodash.filter";
import { useIsFocused } from "@react-navigation/native";
const ModalComponent = ({
  headingText,
  isVisible,
  onPressClose,
  onPressOpen,
  style,
  placeHolder,
  isFieldValid,
  modalText,
  value,
  list,
  onSelectItem,
  selectedItem,
  onHandleSearch,
}) => {
  // const [list, setList] = React.useState(list1);
  // const [tempData, setTempData] = React.useState([]);
  // const [query, setQuery] = React.useState('');
  // const isFocused = useIsFocused();

  // // React.useEffect(() => {
  // //   console.log('====================================');
  // //   console.log('Called');
  // //   console.log('====================================');
  // //   setList(list1);
  // //   setTempData(list);
  // // }, [isFocused]);

  // const handleSearch = text => {
  //   const formattedQuery = text.toLowerCase();
  //   const filteredData = filter(tempData, item => {
  //     return contains(item, formattedQuery);
  //   });
  //   setList(filteredData);
  //   setQuery(text);
  //   if (text == '') {
  //     setList(tempData);
  //   }
  // };

  // const contains = (item, query) => {
  //   let name = null;
  //   if (item != null) {
  //     if (modalText == 'Make') {
  //       name = item.make;
  //     }
  //   }
  //   if (name != null) {
  //     if (name.toLowerCase().includes(query)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <View>
      <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
        {true ? (
          <View style={{ paddingLeft: wp("6") }}>
            <Text2>{headingText}</Text2>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            onPressOpen();
          }}
          style={{
            shadowColor: "#a8adad",
            shadowOffset:
              Platform.OS === "ios"
                ? { width: 0.5, height: 0.5 }
                : { width: 1, height: 1 },
            shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
            shadowRadius: Platform.OS === "ios" ? 4 : 0.5,
            alignItems: "center",
            justifyContent: "space-between",
            elevation: 4,
            aspectRatio: 6.5,
            paddingLeft: 10,
            width: wp("89%"),
            flexDirection: "row",
            borderWidth: 0.5,
            borderColor: isFieldValid ? lightGrey : lightPink,
            borderRadius: 12,
            alignSelf: "center",
            marginTop: hp("1"),
            backgroundColor: "white",
            ...style,
          }}
        >
          <Text2 style={{ color: "#9b9b9b", fontWeight: "500" }}>
            {value ?? placeHolder}
          </Text2>
          <View
            onPress={() => {}}
            style={{
              marginRight: wp("3"),
            }}
          >
            <Entypo name="select-arrows" size={23} color={black} />
          </View>
          {/* {clearIcon === true ? (
        <TouchableOpacity
          onPress={onClear}
          style={{
            marginRight: wp('3'),
          }}>
          <Entypo name="cross" size={23} color={darkBlueGrey} />
        </TouchableOpacity>
      ) : null} */}
        </TouchableOpacity>
      </View>
      <Modal
        onSwipeComplete={() => {
          onPressClose();
        }}
        onBackButtonPress={() => {}}
        isVisible={isVisible}
        backdropColor="rgba(0,0,0,0.8)"
        onBackdropPress={() => {
          onPressClose();
        }}
        animationIn="slideInUp"
        // animationIn=“slideInUp”
        animationInTiming={200}
        animationOutTiming={200}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
      >
        <View
          style={{
            width: wp(100),
            marginTop: hp(30),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignSelf: "center",
            backgroundColor: "#fff",
            height: hp(70),
          }}
        >
          <TouchableOpacity
            onPress={() => onPressClose()}
            style={{
              alignSelf: "center",
              width: wp(9),
              height: hp(0.7),
              borderRadius: 2,
              backgroundColor: "#fff",
              top: hp(-2),
            }}
          ></TouchableOpacity>
          <View
            style={{
              width: wp(100),
              height: hp(8),
              borderBottomWidth: 1,
              borderBottomColor: "rgb(217,217,217)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                //   fontSize: RFPercentage(2),
              }}
            >
              {`Select ${modalText}`}
            </Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <CustomSearchBar // Search bar
              placeholder="Search here"
              onPress={() => {}}
              onChangeText={(text) => onHandleSearch(text)}
              onClearPress={() => {}}
            />
          </View>
          <ScrollView>
            {modalText === "Make"
              ? list.map(({ make, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {make}
                    </Text>
                    {/* <View
                  style={{
                    width: 12,
                    aspectRatio: 1,
                    backgroundColor: 'black',
                  }}></View> */}

                    {selectedItem !== null && selectedItem.id === id ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Model"
              ? list.map(({ model, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(index);
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {model}
                    </Text>
                    {/* <View
                  style={{
                    width: 12,
                    aspectRatio: 1,
                    backgroundColor: 'black',
                  }}></View> */}

                    {selectedItem !== null && selectedItem.id === id ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Year"
              ? list.map(({ value, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {value}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null && selectedItem.value === value ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Style"
              ? list.map(({ bodyStyle, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {bodyStyle}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.bodyStyle === bodyStyle ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Transmission"
              ? list.map(({ transmission, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {transmission}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.transmission === transmission ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Exterior Color"
              ? list.map(({ exteriorColor, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {exteriorColor}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.exteriorColor === exteriorColor ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Interior Color"
              ? list.map(({ interiorColor, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {interiorColor}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.interiorColor === interiorColor ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Doors"
              ? list.map(({ door, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {door}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null && selectedItem.door === door ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Driveline"
              ? list.map(({ driveType, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {driveType}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.driveType === driveType ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Fuel"
              ? list.map(({ fuelType, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {fuelType}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null &&
                    selectedItem.fuelType === fuelType ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Inventory Status"
              ? list.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {item}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null && selectedItem === item ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Engine"
              ? list.map(({ engine, id }, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {engine}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null && selectedItem.engine === engine ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : modalText === "Category"
              ? list.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelectItem(index);
                    }}
                    style={{
                      marginTop: hp(1),
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: wp(4),
                      height: hp(4),
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        color: "black",
                        //   fontSize: RFPercentage(2),
                      }}
                    >
                      {item}
                    </Text>
                    {/* <View
                style={{
                  width: 12,
                  aspectRatio: 1,
                  backgroundColor: 'black',
                }}></View> */}

                    {selectedItem !== null && selectedItem === item ? (
                      <AntDesign name={"check"} color={"black"} size={15} />
                    ) : null}
                  </TouchableOpacity>
                ))
              : null}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({});
export default ModalComponent;
