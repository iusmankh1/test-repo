"use strict";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import React, { Component } from "react";
import { Text2 } from "../../Components/TextComponent/TextComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white, black, greyish, blackThree } from "../../Assets/colors/colors";
import Icon from "react-native-vector-icons/AntDesign";
export default class CustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      itemData: this.props.route.params.payload || {},
      dataSource: [],
    };
    this.handleTestDriveClick = this.handleTestDriveClick.bind(this);
  }

  componentDidMount() {
    console.log(
      "Item data:primaryPhoneNumber",
      this.props.route.params.payload.phone_number
    );
    this.setState((prevState) => ({
      itemData: this.props.route.params.payload || prevState.itemData,
      interval: setInterval(() => {
        this.setState((prevState) => ({
          position:
            prevState.position === prevState.dataSource.length
              ? 0
              : prevState.position + 1,
        }));
      }, 5000),
    }));

    let tempDataSourse = [];
    this.setState({
      dataSource: tempDataSourse,
    });
  }

  joinOptions(a, attr) {
    var out = [];
    for (var i = 0; i < a.length; i++) {
      out.push(a[i][attr]);
    }

    return out.join(" - ");
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleTestDriveClick() {
    console.log("data -> ", this.props.route.params.payload);
    this.props.navigation.navigate("LoanerAuthorizationForm", {
      itemData: this.props.route.params.payload,
    });
  }

  render() {
    const { itemData = {} } = this.state;
    const payload = this.props.route.params.payload || {};
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <ScrollView>
          <View style={{ height: hp("1") }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View //Heading Text
              style={{
                paddingHorizontal: wp("7.6"),
                paddingVertical: wp(3),
                flexDirection: "column",
                maxWidth: "90%",
              }}
            >
              <Text2 style={{ fontSize: 16, fontWeight: "bold" }}>
                {payload.first_name || ""} {payload.last_name || ""}
              </Text2>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Add Customer", {
                  payload: payload,
                  onEdit: true,
                  onCreate: false,
                  editId: this.props.route.params.editId,
                })
              }
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 28,
              }}
            >
              <FontAwesome name="edit" size={23} color={black} />
            </TouchableOpacity>
          </View>

          {/* create 3 column card with white background */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: wp(3),
              flexGrow: 1,
              paddingHorizontal: wp(7.6),
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${itemData.phone_number}`)}
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: wp(6),
                    backgroundColor: "#e3e3e3",
                    borderRadius: 10,
                  }}
                >
                  {itemData.phone_number ? (
                    <Feather name="phone" size={20} color={black} />
                  ) : (
                    <Feather name="phone" size={20} color={"gray"} />
                  )}
                </View>
                <Text2
                  style={{ fontSize: 16, marginTop: 10, color: blackThree }}
                >
                  Call
                </Text2>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`sms:${itemData.phone_number_3}`)}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: wp(6),
                    backgroundColor: "#e3e3e3",
                    borderRadius: 10,
                  }}
                >
                  {itemData.phone_number_3 ? (
                    <FontAwesome name="comment-o" size={20} color={black} />
                  ) : (
                    <FontAwesome name="comment-o" size={20} color={"gray"} />
                  )}
                </View>
                <Text2
                  style={{ fontSize: 16, marginTop: 10, color: blackThree }}
                >
                  SMS
                </Text2>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:${payload.email}?subject=My Subject&body=My body text`)
              }
            >
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: wp(6),
                    backgroundColor: "#e3e3e3",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="mail" size={20} color={black} />
                </View>
                <Text2
                  style={{ fontSize: 16, marginTop: 10, color: blackThree }}
                >
                  Email
                </Text2>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTestDriveClick}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: wp(6),
                    backgroundColor: "#e3e3e3",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="car" size={20} color={black} />
                </View>
                <Text2
                  style={{ fontSize: 16, marginTop: 10, color: blackThree }}
                >
                  Test Drive
                </Text2>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Type</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.is_customer == 1
                ? "Customer"
                : "Lead"}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Gender</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.gender}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Salutation</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.salutation}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>First Name</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.first_name}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Last Name</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.last_name}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Email</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.email}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Phone Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.phone_number}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Business Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.phone_number_2}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Cell Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.phone_number_3}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Fax Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.fax_number}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Company Name</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.company_name}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Address</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.address}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Address 2</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.address_2}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>City</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.city}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Province</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.province}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Postal Code</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.postal_code}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Country</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.country}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Social Insurance</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.social_insurance}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Date of Birth</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.date_birth}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Drivers License Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.drivers_license_number}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Drivers License State</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.drivers_license_state}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Drivers License Expiry</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.drivers_license_exp}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Residence Duration Year</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.residence_duration_year}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Residence Duration Month</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.residence_duration_month}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Residence Status</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.residence_status}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Residence Payment</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.residence_payment}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Lead Type</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.lead_type}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>First Visit Date</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.first_visit_date}
            </Text2>
          </View>

          <View style={styles.rowContainer}>
            <Text2 style={styles.label}>Deal Date</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.deal_date}
            </Text2>
          </View>

          <View style={{ height: hp("2") }}></View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: blackThree,
  },
  labelValue: {
    fontSize: 14,
  },
  rowContainer: {
    marginTop: 14,
    paddingTop: 10,
    width: wp("85%"),
    // height: hp('5'),
    alignSelf: "center",
    borderTopWidth: 0.5,
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopColor: greyish,
  },
});
