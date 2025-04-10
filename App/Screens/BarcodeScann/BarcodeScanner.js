import {
  StyleSheet,
  Text,
  Alert,
  StatusBar,
  View,
  SafeAreaView,
  Button,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Text1, Text2} from '../../Components/TextComponent/TextComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';

import {devBaseURL} from '../../Config/networkModule';

import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
} from '../../Assets/colors/colors';
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {RNHoleView} from 'react-native-hole-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const BarcodeScannerScreen = props => {
  const {navigation, accessToken, baseUrl} = props;
  const device = useCameraDevice('back');
  const [barcode, setBarcode] = React.useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanned, setIsScanned] = React.useState(false);

  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      console.log('status ->>>>', status);
      if (status === 'denied') {
        Alert.alert(
          'Camera Permission',
          'You will not be able to scan if you do not allow camera access',
        );
      } else {
        setHasPermission(true);
      }
    } else {
      console.log('====================================');
      console.log(status);
      console.log('====================================');
      setHasPermission(status === 'authorized');
    }
  };

  const requestCameraPermissionIOS = async () => {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      console.log('Result ->>>> ', result);
      if (result !== 'granted') {
        checkCameraPermission();
      } else {
        setHasPermission(true);
        return;
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        checkCameraPermission();
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestCameraPermissionIOS();
    } else {
      requestCameraPermission();
    }
  }, []);

  const fetchVinData = async vin => {
    const link = `${baseUrl || devBaseURL}/appvindecoder/${vin}`;
    console.log('Fetching VIN data for:', vin);
    await axios
      .get(link, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        if (response && response.data && response.data.vMake) {
          let data = response.data;
          console.log('=================data===================');
          console.log(data);
          console.log('====================================');
          navigation.navigate('VehicleDetails', {
            payload: data,
          });
        } else {
          Alert.alert('Error', 'Cannot fetch details.');
        }
      })
      .catch(e => {
        console.log(e.response ? e.response.data : e);
        Alert.alert('Error', 'Failed to fetch VIN data');
      });
  };

  const resetBarcode = () => {
    setBarcode('');
    setIsScanned(false);
  };

  // This is the key part that was missing - proper handling of scanned codes
  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'code-128',
      'code-39',
      'code-93',
      'ean-13',
      'ean-8',
      'upc-e',
    ],
    onCodeScanned: codes => {
      if (codes.length > 0 && !isScanned) {
        console.log(`Scanned ${codes.length} codes!`);

        // Get the first code value
        const scannedValue = codes[0].value;
        console.log('Scanned value:', scannedValue);

        // Prevent multiple scans
        setIsScanned(true);
        setBarcode(scannedValue);

        // Process the scanned value
        if (scannedValue && scannedValue.length > 0) {
          // Assuming this is a VIN code
          fetchVinData(scannedValue);
        }
      }
    },
  });

  return (
    device != null &&
    hasPermission && (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Camera
          style={{width: '100%', height: '70%'}}
          device={device}
          codeScanner={codeScanner}
          isActive={!isScanned}
          audio={false}
        />
        <RNHoleView
          holes={[
            {
              x: wp('8.5%'),
              y: hp('26%'),
              width: wp('83%'),
              height: hp('20%'),
              borderRadius: 10,
            },
          ]}
          style={styles.rnholeView}
        />
        <TouchableOpacity
          onPress={() => resetBarcode()}
          style={styles.resetButton}>
          <Text1 style={{color: 'white'}}>Reset Scanner</Text1>
        </TouchableOpacity>
      </>
    )
  );
};

const mapStateToProps = state => {
  return {
    accessToken: state.authReducer.accessToken,
    baseUrl: state.authReducer.baseUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarcodeScannerScreen);

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
  resetButton: {
    width: 200,
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: mainBlue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 20,
    borderRadius: 10,
  },
  barcodeText: {
    color: mainBlue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionText: {
    color: greyish,
  },
});
