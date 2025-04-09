import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
  lightGrey,
} from "../../Assets/colors/colors";

const AddCarComponent = (props) => {
  const { onPressClose, modalVisible, onPressManualAdd, onPressScan } = props;
  return (
    <View>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            opacity: 0.85,
            // backgroundColor: 'transparent',
          }}
        >
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => onPressScan()}
                style={{ alignItems: "center", flex: 1 }}
              >
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={responsiveHeight(8)}
                    color={mainBlue}
                  />
                </View>
                <Text style={styles.msg}>Scan</Text>
                {/* <Text style={styles.msgDetail}>{text}</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", flex: 1 }}
                onPress={() => onPressManualAdd()}
              >
                {/* <View> */}
                <View style={styles.iconBox}>
                  <Entypo
                    name="add-to-list"
                    size={responsiveHeight(8)}
                    color={mainBlue}
                  />
                </View>
                <Text style={styles.msg}>Manual</Text>
                {/* </View> */}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => onPressClose()}
                style={styles.button}
              >
                <Text style={styles.login}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    //flex:1,
    alignItems: "center",
    alignSelf: "center",
    height: responsiveHeight(40),
    backgroundColor: "white",
    width: responsiveWidth(90),
    borderRadius: Math.round(responsiveWidth(90) + responsiveHeight(40)) / 25,
    marginTop: responsiveHeight(30),
    padding: "7%",
    // opacity: 1,
  },
  iconBox: {
    // width: Dimensions.get('window').height / 8,
    width: responsiveHeight(15),
    height: responsiveHeight(15),
    backgroundColor: "#9addfb",
    borderRadius: Math.round(responsiveHeight(12) + responsiveHeight(12)) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginVertical: "2%",
    color: black,
  },
  msgDetail: {
    fontSize: responsiveFontSize(2),
  },
  login: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: responsiveWidth(65),
    height: responsiveHeight(6),
    borderRadius: Math.round(responsiveWidth(65) + responsiveHeight(6)) / 25,
    backgroundColor: mainBlue,
    // marginTop:responsiveHeight(3),
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AddCarComponent;
