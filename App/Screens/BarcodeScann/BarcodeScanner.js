import {
  StyleSheet,
  // Text,
  // Alert,
  // StatusBar,
  // View,
  // SafeAreaView,
  // Button,
  // PermissionsAndroid,
  // Platform,
} from 'react-native';
import React from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Text1, Text2} from '../../Components/TextComponent/TextComponent';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const axios = require('axios');

// import {devBaseURL} from '../../Config/networkModule';

// import {
//   mainBlue,
//   backgroundColor,
//   white,
//   black,
//   greyish,
// } from '../../Assets/colors/colors';
import {connect} from 'react-redux';
// import {useState, useEffect} from 'react';
// import {useCameraDevices, Camera} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// import {RNHoleView} from 'react-native-hole-view';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const BarcodeScannerScreen = props => {
  // const {navigation, accessToken, baseUrl} = props;
  // const devices = useCameraDevices();
  // const device = devices.back;
  // const [frameProcessor, barcodes] = useScanBarcodes([
  //   BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
  // ]);
  // const [barcode, setBarcode] = React.useState('');
  // const [hasPermission, setHasPermission] = React.useState(false);
  // const [isScanned, setIsScanned] = React.useState(false);

  // // const checkCameraPermission = async () => {
  // //   const status = await Camera.getCameraPermissionStatus();
  // //   setHasPermission(status === 'authorized');
  // // };

  // const checkCameraPermission = async () => {
  //   let status = await Camera.getCameraPermissionStatus();
  //   if (status !== 'authorized') {
  //     await Camera.requestCameraPermission();
  //     status = await Camera.getCameraPermissionStatus();
  //     if (status === 'denied') {
  //       showToast(
  //         'You will not be able to scan if you do not allow camera access',
  //       );
  //     }
  //   } else {
  //     console.log('====================================');
  //     console.log(status);
  //     console.log('====================================');
  //     setHasPermission(status === 'authorized');
  //   }
  // };
  // const requestCameraPermissionIOS = async () => {
  //   request(PERMISSIONS.IOS.CAMERA).then(result => {
  //     if (result == 'granted') {
  //       checkCameraPermission();
  //       // granted = result;
  //     } else {
  //       return;
  //     }
  //   });
  // };

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'App Camera Permission',
  //         message: 'App needs access to your camera ',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     console.log(PermissionsAndroid.RESULTS);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // openPicker();
  //       checkCameraPermission();
  //       console.log('Camera permission given');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // useEffect(() => {
  //   console.log(baseUrl);
  //   if (Platform.OS === 'ios') {
  //     requestCameraPermissionIOS();
  //   } else {
  //     requestCameraPermission();
  //   }
  //   // checkCameraPermission();
  //   // fetchVinData("3VWPX7AJ3EM627612")
  // }, []);

  // React.useEffect(() => {
  //   toggleActiveState();
  //   return () => {
  //     barcodes;
  //   };
  // }, [barcodes]);

  // const fetchVinData = async vin => {
  //   const link = `${baseUrl || devBaseURL}/appvindecoder/${vin}`;
  //   console.log(accessToken);
  //   await axios
  //     .get(link, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(response => {
  //       // console.log(response)
  //       if (response && response.data && response.data.vMake) {
  //         let data = response.data;
  //         console.log('=================data===================');
  //         console.log(data);
  //         console.log('====================================');
  //         navigation.navigate('VehicleDetails', {
  //           payload: data,
  //         });
  //       } else {
  //         alert('Cannot fetch details.');
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e.response.data);
  //       alert(e);
  //     });
  // };

  // const toggleActiveState = async () => {
  //   if (barcodes && barcodes.length > 0 && isScanned === false) {
  //     setIsScanned(true);
  //     // setBarcode('');
  //     barcodes.forEach(async scannedBarcode => {
  //       if (scannedBarcode.rawValue !== '') {
  //         // console.log("====================================");
  //         // console.log(scannedBarcode.rawValue);
  //         // console.log("====================================");
  //         //  Alert.alert(scannedBarcode.rawValue);
  //         setBarcode(scannedBarcode.rawValue);
  //         fetchVinData(scannedBarcode.rawValue);
  //       }
  //     });
  //   }
  // };

  // const resetBarcode = () => {
  //   setBarcode('');
  //   setIsScanned(false);
  // };

  return (
    // device != null &&
    // hasPermission && (
      <>
        <Text1 style={{color: 'white'}}>Reset</Text1>
        {/* <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Camera
          style={{ width: "100%", height: "70%" }}
          device={device}
          isActive={!isScanned}
          frameProcessor={frameProcessor}
          frameProcessorFps={10}
          audio={false}
        />
        <RNHoleView
          holes={[
            {
              x: wp("8.5%"),
              y: hp("26%"),
              width: wp("83%"),
              height: hp("20%"),
              borderRadius: 10,
            },
          ]}
          style={styles.rnholeView}
        />
        <TouchableOpacity
          onPress={() => resetBarcode()}
          style={{
            width: 200,
            marginTop: 50,
            height: 80,
            borderRadius: 10,
            backgroundColor: mainBlue,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text1 style={{ color: "white" }}>Reset</Text1>
        </TouchableOpacity> */}
      </>
    // )
  );
};

const mapStateToProps = state => {
  return {
    accessToken: state.authReducer.accessToken,
    baseUrl: state.authReducer.baseUrl,
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarcodeScannerScreen);
// export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
