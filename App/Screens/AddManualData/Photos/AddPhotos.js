import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import RNFS from "react-native-fs";
import Spinner from "react-native-loading-spinner-overlay";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import ImgToBase64 from "react-native-image-base64";
import { Text1, Text2 } from "../../../Components/TextComponent/TextComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
// import * as ImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { devBaseURL } from "../../../Config/networkModule";
import axios from "axios";
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
  lightGrey,
  lightBlue,
  blackThree,
} from "../../../Assets/colors/colors";

import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ButtonNormal from "../../../Components/ButtonComponent/ButtonNormal";
import Activity from "../../../Components/ActivityIndicator/ActivityIndicator";
import { useEffect } from "react";
import { CommonActions } from "@react-navigation/native";

const AddPhotos = (props) => {
  const { navigation, route, accessToken, baseUrl } = props;
  //Spinner
  const [spinner, setSpinner] = React.useState(false);
  const [images, setImages] = useState([]);
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    // console.log(baseUrl)
    if (props.route.params.onEdit == true) {
      if (
        props.route.params.payload.imgs[0] &&
        !props.route.params.payload.imgs[0].thumb_url.includes(
          "no_image_available"
        )
      ) {
        const tempList = [];
        if (props.route.params.payload.imgs.length > 0) {
          for (let i = 0; i < props.route.params.payload.imgs.length; i++) {
            console.log("====================");
            console.log(props.route.params.payload.imgs[i]);
            tempList.push({
              id: props.route.params.payload.imgs[i].id,
              uri: props.route.params.payload.imgs[i].thumb_url,
            });
          }
        }
        setImages(tempList);
      }

      setVehicleId(props.route.params.editId);
    }
  }, []);

  const chooseImage = async (FROM) => {
    // setSpinner(true);
    // setSpinner(true);
    const options = {
      mediaType: "photo",
      quality: 0.7,
    };

    if (FROM === "CAMERA") {
      request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      ).then((result) => {
        if (result === RESULTS.GRANTED) {
          setSpinner(true);
          ImagePicker.openCamera({ width: 200, height: 200, multiple: true })
            .then(async (response) => {
              console.log("response");
              uploadMultipleImage([response.path]);
            })
            .catch((e) => {
              setSpinner(false);
            });
          // ImagePicker.launchCamera(options, async (response) => {
          //   if (response.didCancel) {
          //     setSpinner(false);
          //     return;
          //   } else {
          //     let source = response;

          //     if (images.length < 50) {
          //       uploadImage(source.assets[0].uri);
          //     } else {
          //       setSpinner(false);
          //       Alert.alert("Maximum limit reached");
          //     }
          //   }
          // });
        } else {
          setSpinner(false);
          Alert.alert("Camera Permissions Required!");
          return;
        }
      });
    } else if (FROM === "GALLERY") {
      console.log("====================================");
      console.log("Add 50 images");
      console.log("====================================");
      setSpinner(true);
      request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      ).then((result) => {
        if (result === RESULTS.GRANTED) {
          ImagePicker.openPicker({
            // width: 200,
            // height: 200,
            // compressImageMaxHeight: 400,
            maxFiles: 50,
            // compressImageMaxWidth: 400,
            cropping: true,
            multiple: true,
          })
            .then(async (response) => {
              let tempArray = [];
              for (let i = 0; i < response.length; i++) {
                const imgUri = response[i].path;
                tempArray.push(imgUri);
              }
              uploadMultipleImage(tempArray);
            })
            .catch((e) => {
              setSpinner(false);
            });
        } else {
          setSpinner(false);
          Alert.alert("Storage Permissions Required!");
          return;
        }
      });
    } else {
      return;
    }
  }; //end

  const uploadMultipleImage = async (imgs) => {
    if (imgs.length > 0) {
      let body = {
        imgs: [],
      };
      if (images.length + imgs.length > 50) {
        setSpinner(false);
        alert("Cannot add more than 50 images.");
        return;
      }

      for (let i = 0; i < imgs.length; i++) {
        const imgUri = imgs[i];
        let currentOrder = images.length + (i + 1);

        let base64String = await ImgToBase64.getBase64String(imgUri);
        base64String = base64String.replace(/(?:\r\n|\r|\n)/g, '');
        base64String = `data:image/jpeg;base64,${base64String}`;
        let img = {
          order: currentOrder,
          base64: base64String,
        };
        body.imgs.push(img);
      }

      let link = `${(baseUrl || devBaseURL)}/appupload/${vehicleId}`;
      if (!vehicleId) {
        link = `${(baseUrl || devBaseURL)}/appuploadgetreservedid`;
      }

      // console.log(body)

      await axios
        .post(link, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { data, status } = response;
          //set sid to image
          let newImgs = [];
          for (let i = 0; i < data.imageIds.length; i++) {
            const id = data.imageIds[i];
            newImgs.push({ id: id, uri: imgs[i] });
          }
          setImages([...images, ...newImgs]);
          if (!vehicleId) {
            //set reserved id
            setVehicleId(data.reservedId);
          }
          setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e);
          alert(e);
        });
    } else {
      setSpinner(false);
    }
  };

  const askForImagePickerSource = () => {
    Alert.alert(
      "License Image",
      "Add your image",
      [
        {
          text: "Camera",
          onPress: () => chooseImage("CAMERA"),
        },
        {
          text: "Gallery",
          onPress: () => chooseImage("GALLERY"),
        },
      ],
      { cancelable: true }
    );
  };

  const onSubmit = async () => {
    setSpinner(true);
    //send order to server
    sendImageOrder();
    if (props.route.params.onEdit == true) {
      updateData();
    } else {
      if (vehicleId) {
        uploadData(vehicleId);
      } else {
        uploadData();
      }
    }
    setSpinner(false);
  };

  const sendImageOrder = async () => {
    //composing data
    if (vehicleId) {
      let imgs = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        imgs.push({
          sid: image.id,
          order: i + 1,
        });
      }

      await axios
        .post(
          `${(baseUrl || devBaseURL)}/apporderimages/${vehicleId}`,
          {
            imgs: imgs,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
    }
  };

  const arrayJoin = (arr) => {
    const tempArray = [];
    for (var i = 0; i < arr.length; i++) {
      tempArray.push(arr[i].key);
    }
    return tempArray.join("|");
  };

  const updateData = async () => {
    console.log("Called edit");
    const link = `${(baseUrl || devBaseURL)}/applistings/${props.route.params.editId}`;
    const body = {
      ...route.params.payload,
    };

    setSpinner(true);
    try {
      await axios
        .put(link, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          const { success, message } = response.data;
          if (success == true) {
            // console.log(message);
            // setTimeout(() => {
            //   const alertWithoutButtons = () => {
            //     const title = 'Message';
            //     const message = message;
            //     const emptyArrayButtons = [];
            //     const alertOptions = {
            //       cancelable: false,
            //     };

            //     Alert.alert(title, message, emptyArrayButtons, alertOptions);
            //   };
            //   alertWithoutButtons();
            // }, 1000);
            navigation.navigate("Home");
          }
          setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e.response);
          alert(e);
        });
    } catch (error) {
      setSpinner(false);
    }
  };
  const uploadData = async (id = null) => {
    console.log("Called add");
    const link = `${(baseUrl || devBaseURL)}/applistings`;
    const body = {
      ...route.params.payload,
      ReservedId: id,
      exteriorOptionsList: arrayJoin(route.params.payload.exteriorOptionsList),
      interiorOptionsList: arrayJoin(route.params.payload.interiorOptionsList),
      mechanicalOptionsList: arrayJoin(
        route.params.payload.mechanicalOptionsList
      ),
      safetyOptionsList: arrayJoin(route.params.payload.safetyOptionsList),
      entertainmentOptionsList: arrayJoin(
        route.params.payload.entertainmentOptionsList
      ),
    };

    setSpinner(true);
    try {
      await axios
        .post(link, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response);
          const { success, message } = response.data;
          if (success == true) {
            // console.log(message);
            // alert(message);
            navigation.navigate("Home");
          }
          // setData(data);

          setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e.response);
          alert(e);
        });
    } catch (error) {
      setSpinner(false);
    }
  };

  const onDelete = async (index) => {
    if (vehicleId) {
      let link = `${(baseUrl || devBaseURL)}/appdeletesingleimage/${vehicleId}/${images[index].id}`;
      console.log(link);
      let imgs = [...images];
      imgs.splice(index, 1);
      if (imgs.length == 0 && !props.route.params.onEdit) {
        setImages([]);
        setVehicleId("");
      } else {
        setImages(imgs);
      }
      // api call to delete from server
      await axios
        .post(
          link,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .catch((e) => console.log(e));
    }
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    // <ScaleDecorator>
    <>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        // style={styles.item}
      >
        <View
          style={{
            width: wp("50"),
            aspectRatio: 2,
            // marginLeft: 5,
            marginBottom: 10,
          }}
        >
          <Image
            source={{
              uri: item.uri,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View
          style={{
            width: "10%",
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: mainBlue,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 10,
            top: 10,
          }}
        >
          <Text style={styles.title}>{index + 1}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(index)}
        style={{
          // width: 25,
          // height: 25,
          borderRadius: 50,
          backgroundColor: "red",
          position: "absolute",
          alignSelf: "flex-end",
          top: 10,
          right: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Entypo name="circle-with-cross" size={23} color={white} />
      </TouchableOpacity>
    </>
  );

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <View //Header
          style={styles.header}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons name="chevron-back" size={25} color={black} />
          </TouchableOpacity>
          <Text1 style={{ color: blackThree, fontSize: 23 }}> Photo</Text1>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Home" }],
                })
              )
            }
          >
            <Entypo name="home" size={25} color={black} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <DraggableFlatList
            style={{
              alignSelf: "center",
              paddingTop: wp("2"),
              paddingHorizontal: wp("2"),
              backgroundColor: "#ccc",
            }}
            data={images}
            onDragEnd={(cb) => {
              setImages(cb.data);
            }}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
          />
        </View>
        <TouchableOpacity
          // disabled={true}
          onPress={() => askForImagePickerSource()}
          style={{
            aspectRatio: 2.5,
            alignSelf: "center",
            marginTop: hp("5"),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            borderColor: greyish,
            borderStyle: "dashed",
            borderWidth: 0.75,
            overflow: "hidden",
            width: wp("35"),
            backgroundColor: lightGrey,
          }}
        >
          <AntDesign size={40} color={greyish} name="upload" />
          {/* {frontImage.length > 0 ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'contain'}
                  source={{uri: frontImage}}
                />
              ) : (
                <Feather size={40} color={warmGrey} name="camera" />
              )} */}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ButtonNormal
            onPress={() => {
              navigation.pop();
              // onLogin();
              // navigation.navigate('FeaturesAndOptions');
            }}
            style={{ marginBottom: hp("2"), width: wp("40"), aspectRatio: 3 }}
            color={mainBlue}
          >
            Previous
          </ButtonNormal>
          <ButtonNormal
            onPress={() => {
              onSubmit();
              // onLogin();
              // navigation.navigate('FeaturesAndOptions');
            }}
            style={{ marginBottom: hp("2"), width: wp("40"), aspectRatio: 3 }}
            color={mainBlue}
          >
            Submit
          </ButtonNormal>
        </View>
      </SafeAreaView>
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotos);

const styles = StyleSheet.create({
  header: {
    width: undefined,
    height: hp("8"),
    paddingTop: hp("1"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp("4"),
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    color: "white",
  },
});