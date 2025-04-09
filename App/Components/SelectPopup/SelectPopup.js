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
import SearchBar from "react-native-dynamic-search-bar";
import {
  greenBlue,
  darkBlueGrey,
  warmGrey,
  lightGrey,
  lightPink,
} from "../../Assets/colors/colors";
import filter from "lodash.filter";
import { useIsFocused } from "@react-navigation/native";
const SelectPopup = ({
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
  const [internalList, setInternalList] = React.useState(list);
  // const [tempData, setTempData] = React.useState([]);
  // const [query, setQuery] = React.useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setInternalList(list);
    // console.log('CalledC');
  }, [isFocused]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();

    let filteredData = list.filter(item => {
        return item.toLowerCase().includes(formattedQuery);
    });

    setInternalList(filteredData);

    if(text == ''){
        setInternalList(list);
    }
  };

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
            //refresh list
            setInternalList(list);
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
              }}
            >
              {`Select ${modalText}`}
            </Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <SearchBar // Search bar
              placeholder="Search here"
              onPress={() => {}}
              onChangeText={(text) => handleSearch(text)}
              onClearPress={() => {}}
            />
          </View>
          <ScrollView>
            {internalList.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectItem(item);
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

                  {selectedItem !== null && selectedItem === item ? (
                    <AntDesign name={"check"} color={"black"} size={15} />
                  ) : null}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({});
export default SelectPopup;
