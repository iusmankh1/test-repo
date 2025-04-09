import { StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
  blackThree,
  lightGrey,
} from "../../Assets/colors/colors";
import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { devBaseURL } from "../../Config/networkModule";
import AddCustomerComponent from "./AddCustomerComponent"
import CustomerCard from "./CustomerCard";
import DeleteModal from "../Home/onDeleteModal";
import LogOutModal from "../Home/LogoutModal";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "react-native-dynamic-search-bar";
import filter from "lodash.filter";
import { logOut } from "../../Redux/Actions/authActions";

import axios from "axios";

const Customers = (props) => {
  const { navigation, accessToken, baseUrl, dealer, logOut } = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const isFocused = useIsFocused();
  const [customers, setCustomers] = React.useState([]);
  const [tempDeleteItem, setTempDeleteItem] = React.useState(null);
  const [onDeleteModal, setOnDeleteModal] = React.useState(false);
  const [logOutModal, setLogOutModal] = React.useState(false);
  const [leadCount, setLeadCount] = React.useState(0);
  const [customerCount, setCustomerCount] = React.useState(0);
  const [tmpData, setTmpData] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);


  const getCustomers = async () => {
    setSpinner(true);
    try {
      var config = {
        method: "get",
        url: `${baseUrl || devBaseURL}/appleadcustomer`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios(config)
        .then(function (response) {
          setCustomers(response.data);
          //all data which has response.data.is_customer = 1
          const customerData = response.data.filter(
            (item) => item.is_customer == 1
          );
          setCustomerCount(customerData.length);
          setLeadCount(response.data.length - customerData.length);
          setTmpData(response.data);
          setSpinner(false);
        })
        .catch(function (error) {
          console.log(error);
          setSpinner(false);
        });
    } catch (error) {
      console.log("error", error);
      setSpinner(false);
    }
  };

  const onDeleteItem = async () => {
    setSpinner(true);
    const link = `${baseUrl || devBaseURL}/appleadcustomer/${tempDeleteItem.sid
      }`;
    console.log(accessToken);
    await axios
      .delete(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data, status } = response;
        setSpinner(false);
        getCustomers();
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const onEditItem = async ({ item }) => {
    setSpinner(true);
    const link = `${baseUrl || devBaseURL}/appleadcustomer/${item.sid}`;
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
        navigation.navigate("Add Customer", {
          payload: data,
          onEdit: true,
          editId: item.sid,
          onCreate: false,
          outroCommentsText: item.outrocomments,
        });
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const onSelectItem = async ({ item }) => {
    setSpinner(true);
    const link = `${baseUrl || devBaseURL}/appleadcustomer/${item.sid}`;
    console.log("OKK");
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data, status } = response;

        navigation.navigate("CustomerDetail", {
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

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    console.log(formattedQuery);
    const filteredData = filter(tmpData, (item) => {
      return contains(item, formattedQuery);
    });
    setCustomers(filteredData);
    if (text == "") {
      setCustomers(tmpData);
    }
  };

  const contains = (item, query) => {
    const { first_name, last_name, email, phone_number, phone_number_3 } = item;
    let keywords = first_name + " " + last_name + " " + email + " " + phone_number + " " + phone_number_3;
    if (keywords) {
      if (
        keywords.toLowerCase().includes(query)
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    getCustomers();
  }, [isFocused]);

  const renderItem = ({ item, index }) => {
    return (
      <CustomerCard
        item={item}
        onPress={() => onSelectItem({ item })}
        onPressDelete={() => {
          setTempDeleteItem(item);
          setOnDeleteModal(true);
        }}
        onPressEdit={() => onEditItem({ item })}
      />
    );
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const onPressScan = () => {
    setModalVisible(false);
    navigation.navigate("PictureClicker");
  };

  const onPressManualAdd = () => {
    setModalVisible(false);
    navigation.navigate("Add Customer", {
      onEdit: false,
      onCreate: true,
    });
  };

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <SafeAreaView>
        <AddCustomerComponent // Modal
          onPressManualAdd={() => onPressManualAdd()}
          modalVisible={modalVisible}
          onPressScan={() => onPressScan()}
          onPressClose={() => setModalVisible(false)}
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

        <LogOutModal // Modal
          modalVisible={logOutModal}
          onPressYes={() => {
            logOut();
            setLogOutModal(false);
          }}
          onPressClose={() => setLogOutModal(false)}
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
              onPress={() => showModal()
                // navigation.navigate("Add Customer", {
                //   onEdit: false,
                //   onCreate: true,
                // });
              }
              style={{ marginLeft: wp(2) }}
            >
              <AntDesign name="plus" size={25} color={black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {customers.length}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {customers.filter((item) => item.is_customer == "1").length}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Customer</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 18, color: "#010101", flexWrap: "wrap" }}>
              {customers.filter((item) => item.is_customer != "1").length}
            </Text>
            <Text style={{ fontSize: 12, flexWrap: "wrap" }}>Lead</Text>
          </View>
        </View>

        <SearchBar // Search bar
          placeholder="Search here"
          onPress={() => { }}
          style={{ borderRadius: 0, marginTop: -10 }}
          onChangeText={(text) => handleSearch(text)}
          onClearPress={() => setCustomers(tmpData)}
        />

        <View style={{ padding: 15 }}>
          <View style={{ marginTop: wp(2), paddingBottom: wp(22) }}>
            <FlatList
              data={customers}
              renderItem={(item, index) => renderItem(item, index)}
              keyExtractor={(item) => item.id}
            // extraData={selectedId}
            />
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Customers);

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
    marginBottom: hp("3"),
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
