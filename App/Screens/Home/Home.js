import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import filter from "lodash.filter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Spinner from "react-native-loading-spinner-overlay";
import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
import { logOut } from "../../Redux/Actions/authActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "react-native-dynamic-search-bar";
import {
  mainBlue,
  blackThree,
  backgroundColor,
  white,
  black,
  greyish,
  lightGrey,
} from "../../Assets/colors/colors";
import Entypo from "react-native-vector-icons/Entypo";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import AntDesign from "react-native-vector-icons/AntDesign";
import MainCard from "./CardComponent";
import AddCarComponent from "./AddCarComponent";
import LogOutModal from "./LogoutModal";
import { devBaseURL } from "../../Config/networkModule";
const axios = require("axios");
import { connect } from "react-redux";
import DeleteModal from "./onDeleteModal";

const Home = (props) => {
  const { navigation, accessToken, dealer, baseUrl, logOut } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [tempData, setTempData] = useState([]);
  const [outroCommentsText, setOutroCommentsText] = useState("");
  const [onDeleteModal, setOnDeleteModal] = useState(false);
  const [tempDeleteItem, setTempDeleteItem] = useState(null);
  const [activeVehicles, setActiveVehicles] = useState(0);
  const [inactiveVehicles, setInactiveVehicles] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    getCarsData();
  }, [isFocused]);

  const getCarsData = async () => {
    console.log("==============Get cars data ======================");
    console.log("Base URL:", baseUrl || devBaseURL);
    console.log("Access Token:", accessToken);
    console.log("====================================");
    setSpinner(true);
    try {
      const link = `${baseUrl || devBaseURL}/applistings`;
      const response = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data, status } = response;
      if (data) {
        setData(data);
        //set stats
        let active = 0,
          inactive = 0;
        data.map((d) => {
          if (d.active == "1") {
            active++;
          } else {
            inactive++;
          }
        });
        setActiveVehicles(active);
        setInactiveVehicles(inactive);

        setTempData(data);
        if (data != null && data.length > 0) {
          setOutroCommentsText(data[0].outrocomments);
        }
      } else {
        console.log("No data received from API");
        setData([]);
        setTempData([]);
      }
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
      // Only logout if it's an authentication error
      if (error.response?.status === 401) {
        logOut();
      }
    } finally {
      setSpinner(false);
    }
  };

  const onSelectItem = async ({ item }) => {
    console.log("item",item)
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/applistings/${item.sid}`;
    console.log("onSelectItem",link)
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data, status } = response;
        console.log("================edit=================");
        console.log(data);
        console.log("====================================");

        navigation.navigate("CarDetail", {
          payload: data,
          editId: item.sid,
        });
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const onDeleteItem = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/applistings/${tempDeleteItem.sid}`;
    console.log(link);
    await axios
      .delete(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data, status } = response;
        // console.log("====================================");
        // console.log(data);
        // console.log("====================================");
        // navigation.navigate('VehicleDetails', {
        //   payload: data,
        // });
        setSpinner(false);
        getCarsData();
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };
  
  const onEditItem = async ({ item }) => {
    if (
      item.StockNumber != null &&
      item.vMake != null &&
      item.vModel != null &&
      item.Year != null &&
      item.BodyStyle != null
    ) {
      setSpinner(true);
      const link = `${(baseUrl || devBaseURL)}/applistings/${item.sid}`;
      console.log(link);
      await axios
        .get(link, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { data, status } = response;
          console.log(item.sid);
          navigation.navigate("VehicleDetails", {
            payload: data,
            onEdit: true,
            editId: item.sid,
            outroCommentsText: item.outrocomments,
          });
          setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e.response.data);
          alert(e);
        });
    }
  };

  const onActivate = async ({ item, index }) => {
    console.log("================item id====================");
    console.log(item.sid);
    console.log("====================================");
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appchangeactivation/${item.sid}`;
    console.log(accessToken);
    const body = {
      active: 1,
    };
    await axios
      .post(link, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.success == true) {
          // Alert.alert(response.data.message);

          let temp = [...data];
          temp[index].active = "1";
          setActiveVehicles(activeVehicles + 1);
          setInactiveVehicles(inactiveVehicles - 1);
          setData(temp);
        }

        console.log("================edit====================");
        console.log(data);
        console.log("========================================");
        // navigation.navigate('VehicleDetails', {
        //   payload: data,
        //   onEdit: true,
        // });
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e);
        alert(e);
      });
  };

  const onDeactivate = async ({ item, index }) => {
    // console.log('================item id====================');
    // console.log(item);
    // console.log('====================================');
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appchangeactivation/${item.sid}`;
    console.log(accessToken);
    const body = {
      active: 0,
    };
    await axios
      .post(link, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.success == true) {
          // Alert.alert(response.data.message);

          let temp = [...data];
          temp[index].active = "0";
          setActiveVehicles(activeVehicles - 1);
          setInactiveVehicles(inactiveVehicles + 1);
          setData(temp);
        }
        // console.log('================edit====================');
        // console.log(data);
        // console.log('====================================');
        // navigation.navigate('VehicleDetails', {
        //   payload: data,
        //   onEdit: true,
        // });
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        // alert(e);
      });
  };

  const onPressManualAdd = () => {
    setModalVisible(false);
    navigation.navigate("VehicleDetails", {
      onEdit: false,
      outroCommentsText: outroCommentsText,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <MainCard
        item={item}
        onPress={() => onSelectItem({ item })}
        onPressDelete={() => {
          setTempDeleteItem(item);
          setOnDeleteModal(true);
        }}
        onPressEdit={() => onEditItem({ item })}
        onActivate={() => onActivate({ item, index })}
        onDeactivate={() => onDeactivate({ item, index })}
      />
    );
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const onPressScan = () => {
    setModalVisible(false);
    navigation.navigate("BarcodeScanner");
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openPicker();
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openPicker = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (response) => {
      // Use launchImageLibrary to open image gallery
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        console.log(source);
      }
    });
  };

  // let options = {
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };
  // ImagePicker.launchCamera(options, response => {
  //   console.log('Response = ', response);

  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else if (response.customButton) {
  //     console.log('User tapped custom button: ', response.customButton);
  //     alert(response.customButton);
  //   } else {
  //     const source = {uri: response.uri};
  //     console.log('response', JSON.stringify(response));
  //   }
  // });

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(tempData, (item) => {
      return contains(item, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
    if (text == "") {
      setData(tempData);
    }
  };

  const contains = (item, query) => {
    const { keywords } = item;
    if (keywords) {
      if (
        keywords.toLowerCase().includes(query)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <AddCarComponent // Modal
          onPressManualAdd={() => onPressManualAdd()}
          modalVisible={modalVisible}
          onPressScan={() => onPressScan()}
          onPressClose={() => setModalVisible(false)}
        />
        <LogOutModal // Modal
          onPressManualAdd={() => onPressManualAdd()}
          modalVisible={logOutModal}
          onPressYes={() => {
            logOut();
            setLogOutModal(false);
          }}
          onPressClose={() => setLogOutModal(false)}
        />
        <DeleteModal // Modal
          modalVisible={onDeleteModal}
          onPressYes={() => {
            setOnDeleteModal(false);
            setTimeout(() => {
              onDeleteItem();
            }, 1000);
          }}
          onPressClose={() => setOnDeleteModal(false)}
        />
        <View //Header
          style={styles.header}
        >
          <TouchableOpacity onPress={() => setLogOutModal(true)}>
            <AntDesign name="poweroff" size={25} color={black} />
          </TouchableOpacity>
          <Text1 style={{ color: blackThree, fontSize: 17, fontWeight: "500" }}>
            {dealer
              ? dealer.substr(0, 20) + (dealer.length > 20 ? "..." : "")
              : "AutoBunny Dealer Solutions"}
          </Text1>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Inquiry")}>
              <AntDesign name="infocirlceo" size={22} color={black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showModal()}
              style={{ marginLeft: wp(2) }}
            >
              <AntDesign name="plus" size={25} color={black} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {activeVehicles + inactiveVehicles}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Vehicles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {activeVehicles}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {inactiveVehicles}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Inactive</Text>
          </View>
        </View>
        <SearchBar // Search bar
          placeholder="Search here"
          onPress={() => {}}
          style={{ borderRadius: 0, marginTop: -10 }}
          onChangeText={(text) => handleSearch(text)}
          onClearPress={() => setData(tempData)}
        />
        <View style={{ height: hp("1") }} />
        <FlatList
          data={data}
          renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={(item) => item.id}
          // extraData={selectedId}
        />
      </SafeAreaView>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    accessToken: state.authReducer.accessToken,
    dealer: state.authReducer.dealer,
    baseUrl: state.authReducer.baseUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  header: {
    width: undefined,
    height: hp("8"),
    paddingTop: hp("1"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp("5"),
  },
  statCard: {
    marginBottom: hp("2"),
    // alignSelf: "center",
    height: undefined,
    width: wp("27"),
    aspectRatio: 1.25,
    // borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: 18,
    borderWidth: 1,
    borderColor: lightGrey,
    backgroundColor: "#FFFFFF",
  },
});
