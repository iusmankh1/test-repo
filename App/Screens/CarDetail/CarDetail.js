import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  lightGrey,
  blackThree,
} from "../../Assets/colors/colors";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import ImageSlider from "react-native-image-slider";
import Slideshow from "react-native-image-slider-show";

export default class SlideshowTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      itemData: null,
      dataSource: [],
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.payload)
    this.setState({
      itemData: this.props.route.params.payload,
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 5000),
    });

    let tempDataSourse = [];

    if (
      this.props.route.params.payload &&
      this.props.route.params.payload.imgs.length > 0
    ) {
      for (let i = 0; i < this.props.route.params.payload.imgs.length; i++) {
        tempDataSourse.push({
          url: this.props.route.params.payload.imgs[i].url,
        });
      }
    } else {
      tempDataSourse = [];
    }
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

  render() {
    // const {itemData} = this.props.navigation.route.params;
    const { itemData } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <ScrollView>
          <Slideshow
            dataSource={this.state.dataSource}
            position={this.state.position} indicatorSize={0}
            onPositionChanged={(position) => this.setState({ position })}
          />
          <View style={{ height: hp("1") }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View //Heading Text
              style={{ paddingHorizontal: wp("7.6"), paddingVertical: wp(3), flexDirection: "column", maxWidth: '90%' }}
            >
              <Text2 style={{fontSize: 16, fontWeight: 'bold'}}>
                {this.props.route.params.payload.Year}{" "}
                {this.props.route.params.payload.vMake.value}{" "}
                {this.props.route.params.payload.vModel.value}{" "}
              </Text2>
              {this.props.route.params.payload.Price != null ||
              this.props.route.params.payload.Price == "" ? (
                <Text2
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {`$${this.props.route.params.payload.Price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                </Text2>
              ) : (
                ""
              )}
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("VehicleDetails", {
                  payload: this.props.route.params.payload,
                  onEdit: true,
                  editId: this.props.route.params.editId,
                  outroCommentsText: this.props.route.params.outrocomments,
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

          <View
            style={{
              marginTop: 15,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Year</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Year}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Make</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.vMake.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Model</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.vModel.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>
              Special Price
            </Text2>
            <Text2 style={styles.labelValue}>
              { this.props.route.params.payload.SpecialPrice ? this.props.route.params.payload.SpecialPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):'' }
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Kilometers</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Kilometers? this.props.route.params.payload.Kilometers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):''}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Body Style</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.BodyStyle.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Doors</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Doors.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Engine</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Engine.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Engine Size</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.EngineSize}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Passengers</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Passengers}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Fuel Type</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.FuelType.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>
              City Fuel Economy
            </Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.CityFuelEconomy}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Hwy Fuel</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.HwyFuelEconomy}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>
              Interior color
            </Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.InteriorColor.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>
              Exterior color
            </Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.ExteriorColor.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Fuel Type</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.FuelType.value}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Stock Number</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.StockNumber}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Vin</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Vin}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 14,
              paddingTop: 10,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Category</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.Category}
            </Text2>
          </View>
          <View
            style={{
              marginTop: 12,
              paddingTop: 9,
              width: wp("85%"),
              // height: hp('5'),
              alignSelf: "center",
              borderTopWidth: 0.5,
              justifyContent: "space-between",
              flexDirection: "row",
              borderTopColor: greyish,
            }}
          >
            <Text2 style={styles.label}>Drive Type</Text2>
            <Text2 style={styles.labelValue}>
              {this.props.route.params.payload.DriveType.value}
            </Text2>
          </View>
          <View style={{ height: hp("3") }}></View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text1 style={{ fontSize: 14 }}>Options</Text1>
          </View>
          <View style={{ height: hp("1") }}></View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text2 style={{ fontSize: 14 }}>
              {this.props.route.params.payload.VehicleOptions.length > 0
                ? this.joinOptions(
                    this.props.route.params.payload.VehicleOptions,
                    "value"
                  )
                : ""}
            </Text2>
          </View>
          <View style={{ height: hp("3") }}></View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text1 style={{ fontSize: 14 }}>Comments</Text1>
          </View>
          <View style={{ height: hp("1") }}></View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text2 style={{ fontSize: 14 }}>
              {this.props.route.params.payload.SellerComments}
            </Text2>
          </View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text1 style={{ fontSize: 14 }}>Hyperlinks</Text1>
          </View>
          <View style={{ height: hp("1") }}></View>
          <View style={{ paddingHorizontal: wp("7.6") }}>
            <Text2
              style={{
                fontSize: 14,
              }}
            >{`Carfax Link: ${this.props.route.params.payload.CarproofLink || ""}`}</Text2>
            <Text2
              style={{
                fontSize: 14,
              }}
            >{`ETest: ${this.props.route.params.payload.ETest || ""}`}</Text2>
            <Text2
              style={{
                fontSize: 14,
              }}
            >{`Other: ${this.props.route.params.payload.OtherLink || ""}`}</Text2>
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
    color: blackThree
  },
  labelValue: {
    fontSize: 14
  }
});
