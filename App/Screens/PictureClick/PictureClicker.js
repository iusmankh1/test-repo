import React, { useState, useEffect } from 'react'
import { Image, Platform } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'
import ImgToBase64 from "react-native-image-base64";
import axios from "axios";
import { connect } from "react-redux";
import { devBaseURL } from "../../Config/networkModule";
import Spinner from "react-native-loading-spinner-overlay";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const PictureClicker = (props) => {
  const { navigation, route, accessToken, baseUrl } = props;
  const [scannedImage, setScannedImage] = useState();
  const [spinner, setSpinner] = React.useState(false);

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument()

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      setSpinner(true);
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
      try {
        let fileUri = scannedImages[0]

        let base64String = await ImgToBase64.getBase64String(fileUri);

        let body = {
          "licenseFile": 'data:image/png;base64,' +  base64String
        }

        let link = `${(baseUrl || devBaseURL)}/processLicense1`;
        console.log(body.licenseFile.substring(0, 20));;

        await axios
        .post(link, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('=====================================================')
          let responseJson = response.data.extractedText;
          let payload = {};
          
          if(responseJson.FIRST_NAME) {
            payload.first_name = responseJson.FIRST_NAME
          }
          
          if(responseJson.LAST_NAME) {
            payload.last_name = responseJson.LAST_NAME
          }
          
          if(responseJson.CITY_IN_ADDRESS) {
            payload.city = responseJson.CITY_IN_ADDRESS
          }
          
          if(responseJson.ZIP_CODE_IN_ADDRESS) {
            payload.postal_code = responseJson.ZIP_CODE_IN_ADDRESS
          }
          
          if(responseJson.STATE_IN_ADDRESS) {
            payload.province = responseJson.STATE_IN_ADDRESS
          }
          
          if(responseJson.STATE_NAME) {
            payload.drivers_license_state = responseJson.STATE_NAME
          }
          
          if(responseJson.DOCUMENT_NUMBER) {
            payload.drivers_license_number = responseJson.DOCUMENT_NUMBER
          }
          
          if(responseJson.EXPIRATION_DATE) {
            let formattedDate = new Date(responseJson.EXPIRATION_DATE).toISOString().split('T')[0];
            payload.drivers_license_exp = formattedDate
          }
          
          if(responseJson.DATE_OF_BIRTH) {
            let formattedDate = new Date(responseJson.DATE_OF_BIRTH).toISOString().split('T')[0];
            payload.date_birth = formattedDate
          }
          
          if(responseJson.ADDRESS) {
            payload.address = responseJson.ADDRESS
          }

          console.log(payload);
          setSpinner(false);
          navigation.navigate("Add Customer", {
            onEdit: false,
            onCreate: true,
            payload: payload,
          });
        })
        .catch((error) => {
          setSpinner(false);
          console.log(error);
          alert("error", error);
        });


      } catch (err) {
        console.log(err)
      }
      // console.log('Image', scannedImages[0])
    }
  }

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const result = await request(
          Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
          })
        );
  
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          setTimeout(() => {
            scanDocument();
          }, 500);
        } else {
          setSpinner(false);
          alert('Camera Permissions Required!');
        }
      } catch (error) {
        setSpinner(false);
        alert('Error checking camera permission');
      }
    };
  
    checkCameraPermission();
  }, []);  

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <Image
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
        source={{ uri: scannedImage }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.authReducer.accessToken,
    baseUrl: state.authReducer.baseUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PictureClicker);