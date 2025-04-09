import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import TextField from "../../../Components/TextFieldComponent/TextField";
import { Text1, Text2 } from "../../../Components/TextComponent/TextComponent";
import ButtonNormal from "../../../Components/ButtonComponent/ButtonNormal";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Activity from "../../../Components/ActivityIndicator/ActivityIndicator";
import Modal from "react-native-modal";
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
} from "../../../Assets/colors/colors";
import { devBaseURL } from "../../../Config/networkModule";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import filter from "lodash.filter";
import { connect } from "react-redux";

const VehicleDetails = (props) => {
  const { navigation, accessToken, baseUrl } = props;
  const [query, setQuery] = React.useState("");
  // set Payload data
  const [payloadData, setPayloadData] = React.useState([]);
  // set Exterior
  const [exteriorOptionsList, setExteriorOptionsList] = React.useState([]);
  // set Interior Options
  const [interiorOptionsList, setInteriorOptionsList] = React.useState([]);
  // set Mechanical Options
  const [mechanicalOptionsList, setMechanicalOptionsList] = React.useState([]);
  // set Safety Options
  const [safetyOptionsList, setSafetyOptionsList] = React.useState([]);
  // set Entertainment Options
  const [entertainmentOptionsList, setEntertainmentOptionsList] =
    React.useState([]);
  // set Vehicle Options
  const [vehicleOptionsList, setVehicleOptionsList] = React.useState([]);
  const [vim, setVim] = React.useState("");
  //Stock Number
  const [stockNumber, setStockNumber] = React.useState(null);
  const [isStockNumberValid, setStockNumberValid] = React.useState(true);
  //kilometers
  const [kilometers, setKilometers] = React.useState("");
  //Trim
  const [trim, setTrim] = React.useState("");
  //Engine Size
  const [engineSize, setEngineSize] = React.useState("");
  //Passengers
  const [passengers, setPassengers] = React.useState("");
  //City Fuel
  const [cityFuel, setCityFuel] = React.useState("");
  //Highway Fuel
  const [highway, setHighway] = React.useState("");
  //msrp
  const [MSRP, setMSRP] = React.useState("");
  //invoice price
  const [invoicePrice, setInvoicePrice] = React.useState("");
  //Price
  const [price, setPrice] = React.useState("");
  //Special Price
  const [specialPrice, setSpecialPrice] = React.useState("");

  //Spinner
  const [spinner, setSpinner] = React.useState(false);
  //Make
  const [isMakeVisible, setIsMakeVisible] = React.useState(false);
  const [isMakeValid, setIsMakeValid] = React.useState(true);
  const [makeValue, setMakeValue] = React.useState(null);
  const [makeList, setMakeList] = React.useState([]);
  const [makeListTemp, setMakeListTemp] = React.useState([]);
  const [selectedMake, setSelectedMake] = React.useState(null);
  //Modal
  const [isModelVisible, setIsModelVisible] = React.useState(false);
  const [isModalValid, setIsModalValid] = React.useState(true);
  const [modalValue, setModalValue] = React.useState(null);
  const [modalList, setModalList] = React.useState([]);
  const [selectedModal, setSelectedModal] = React.useState(null);
  const [modalListTemp, setModalListTemp] = React.useState([]);
  //Year
  const [isYearVisible, setIsYearVisible] = React.useState(false);
  const [yearValue, setYearValue] = React.useState(null);
  const [yearList, setYearList] = React.useState([]);
  const [yearListTemp, setYearListTemp] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [isYearValid, setIsYearValid] = React.useState(true);

  //Body Style
  const [isStyleVisible, setIsStyleVisible] = React.useState(false);
  const [styleValue, setStyleValue] = React.useState(null);
  const [styleList, setStyleList] = React.useState([]);
  const [styleListTemp, setStyleListTemp] = React.useState([]);
  const [selectedStyle, setSelectedStyle] = React.useState(null);
  const [isStyleValid, setIsStyleValid] = React.useState(true);

  //Transmission
  const [isTransmissionVisible, setIsTransmissionVisible] =
    React.useState(false);
  const [transmissionValue, setTransmissionValue] = React.useState(null);
  const [transmissionList, setTransmissionList] = React.useState([]);
  const [transmissionListTemp, setTransmissionListTemp] = React.useState([]);
  const [selectedTransmission, setSelectedTransmission] = React.useState(null);

  //Exterior Color
  const [isExteriorVisible, setIsExteriorVisible] = React.useState(false);
  const [exteriorValue, setExteriorValue] = React.useState(null);
  const [exteriorList, setExteriorList] = React.useState([]);
  const [exteriorListTemp, setExteriorListTemp] = React.useState([]);
  const [selectedExterior, setSelectedExterior] = React.useState(null);

  //Interior Color
  const [isInteriorVisible, setIsInteriorVisible] = React.useState(false);
  const [interiorValue, setInteriorValue] = React.useState(null);
  const [interiorList, setInteriorList] = React.useState([]);
  const [interiorListTemp, setInteriorListTemp] = React.useState([]);
  const [selectedInterior, setSelectedInterior] = React.useState(null);

  //Doors
  const [isDoorsVisible, setIsDoorsVisible] = React.useState(false);
  const [doorsValue, setDoorsValue] = React.useState(null);
  const [doorsList, setDoorsList] = React.useState([]);
  const [doorsListTemp, setDoorsListTemp] = React.useState([]);
  const [selectedDoors, setSelectedDoors] = React.useState(null);

  //Driveline
  const [isDrivelineVisible, setIsDrivelineVisible] = React.useState(false);
  const [drivelineValue, setDrivelineValue] = React.useState(null);
  const [drivelineList, setDrivelineList] = React.useState([]);
  const [drivelineListTemp, setDrivelineListTemp] = React.useState([]);
  const [selectedDriveline, setSelectedDriveline] = React.useState(null);

  //Fuel Type
  const [isFuelVisible, setIsFuelVisible] = React.useState(false);
  const [fuelValue, setFuelValue] = React.useState(null);
  const [fuelList, setFuelList] = React.useState([]);
  const [fuelListTemp, setFuelListTemp] = React.useState([]);
  const [selectedFuel, setSelectedFuel] = React.useState(null);

  //Engine
  const [isEngineVisible, setIsEngineVisible] = React.useState(false);
  const [engineValue, setEngineValue] = React.useState(null);
  const [engineList, setEngineList] = React.useState([]);
  const [engineListTemp, setEngineListTemp] = React.useState([]);
  const [selectedEngine, setSelectedEngine] = React.useState(null);

  //Inventory Status
  const [isInventoryStatusVisible, setIsInventoryStatusVisible] =
    React.useState(false);
  const [inventoryStatusValue, setInventoryStatusValue] =
    React.useState("Ready For Sale");
  const [inventoryStatusList, setInventoryStatusList] = React.useState([
    "Ready For Sale",
    "Awaiting Delivery",
    "Reconditioning",
    "Wholesale",
  ]);
  const [inventoryStatusListTemp, setInventoryStatusListTemp] = React.useState([
    "Ready For Sale",
    "Awaiting Delivery",
    "Reconditioning",
    "Wholesale",
  ]);
  const [selectedInventoryStatus, setSelectedInventoryStatus] =
    React.useState("Ready For Sale");

  //Category
  const [isCategoryVisible, setIsCategoryVisible] = React.useState(false);
  const [categoryValue, setCategoryValue] = React.useState("Cars-Trucks-SUVs");
  const [categoryList, setCategoryList] = React.useState([
    "Cars-Trucks-SUVs",
    "ATV",
    "Boats",
    "Farm-Equipment",
    "Heavy-Equipment",
    "Heavy-Trucks",
    "Motorcycle",
    "RV",
    "Snowmobile",
    "Transport-Trailers",
  ]);
  const [categoryListTemp, setCategoryListTemp] = React.useState([
    "Cars-Trucks-SUVs",
    "ATV",
    "Boats",
    "Farm-Equipment",
    "Heavy-Equipment",
    "Heavy-Trucks",
    "Motorcycle",
    "RV",
    "Snowmobile",
    "Transport-Trailers",
  ]);
  const [selectedCategory, setSelectedCategory] =
    React.useState("Cars-Trucks-SUVs");

  useEffect(() => {
    console.log(baseUrl)
    fetchMakeList();
    if (props.route.params && props.route.params.payload != null) {
      // setVimApiValues(props.route.params.payload);
      setVimApiValues(props.route.params.payload);
      setPayloadData(props.route.params.payload);
      // console.log('====================================');
      // console.log(props.route.params.payload);
      // console.log('====================================');
    }
  }, []);

  const fetchMakeList = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appmakemodels`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        const { data, status } = response;
        setMakeList(data);
        setMakeListTemp(data);
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const fetchModelList = async () => {
    setIsModelVisible(true);
    // setSpinner(true);
    // const link = `${devBaseURL}/appmakemodels`;
    // console.log(accessToken);
    // const link = `${devBaseURL}/appmodels`;
    // console.log(accessToken);
    // console.log(link);
    // await axios
    //   .get(link, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then(response => {
    //     const {data, status} = response;
    //     setModalList(data);
    //     setIsModelVisible(true);
    //     console.log(data);
    //     setSpinner(false);
    //   })
    //   .catch(e => {
    //     setSpinner(false);
    //     alert(e);
    //   });
  };

  const onSelectModel = async () => {
    if (selectedMake != null) {
      console.log("if case");
      await fetchModelList();
    } else {
      console.log("else case");
      // setIsMakeVisible(true);
    }
  };

  const getYears = () => {
    let years = [];
    let newYear = new Date().getFullYear() + 1;
    for (var i = newYear; i >= 1980; i--) {
      years.push({
        value: i,
        caption: i,
      });
    }
    setYearList(years);
    setYearListTemp(years);
    setIsYearVisible(true);
    // return years;
  };

  const getStyles = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appbodystyles`;

    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setStyleList(data);
        setStyleListTemp(data);
        setSpinner(false);
        setIsStyleVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getTransmission = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/apptransmissions`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setTransmissionList(data);
        setTransmissionListTemp(data);
        setSpinner(false);
        setIsTransmissionVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getExteriorColor = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appexteriorcolors`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setExteriorList(data);
        setExteriorListTemp(data);
        setSpinner(false);
        setIsExteriorVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getInteriorColor = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appinteriorcolors`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setInteriorList(data);
        setInteriorListTemp(data);
        setSpinner(false);
        setIsInteriorVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getDoors = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appdoors`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setDoorsList(data);
        setDoorsListTemp(data);
        setSpinner(false);
        setIsDoorsVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getDriveline = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appdrivetypes`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setDrivelineList(data);
        setDrivelineListTemp(data);
        setSpinner(false);
        setIsDrivelineVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getFuel = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appfueltypes`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setFuelList(data);
        setFuelListTemp(data);
        setSpinner(false);
        setIsFuelVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const getEngine = async () => {
    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appengines`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data, status } = response;
        console.log(data);
        setEngineList(data);
        setEngineListTemp(data);
        setSpinner(false);
        setIsEngineVisible(true);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const setMakeModel = (item) => {
    setSelectedMake(item);
    setModalList(item.models);
    setModalListTemp(item.models);
    setModalValue(null);
    setSelectedModal(null);
    console.log("====================================");
    // console.log(index);
    console.log("====================================");
  };

  const onStepTwo = () => {
    if (validateFields() === true) {
      console.log("payloadData.Payment ", payloadData.Payment);
      const payload = {
        Vin: vim,
        StockNumber: stockNumber,
        Make: selectedMake.id,
        Model: selectedModal.id,
        Year: yearValue,
        BodyStyle: selectedStyle !== null && selectedStyle.id,
        Kilometers: kilometers,
        Trim: trim,
        Transmission:
          selectedTransmission !== null ? selectedTransmission.id : null,
        ExteriorColor: selectedExterior !== null ? selectedExterior.id : null,
        InteriorColor: selectedInterior !== null ? selectedInterior.id : null,
        Doors: selectedDoors !== null && selectedDoors.id,
        DriveType: selectedDriveline !== null ? selectedDriveline.id : null,
        FuelType: selectedFuel !== null ? selectedFuel.id : null,
        Engine: selectedEngine !== null ? selectedEngine.id : null,
        EngineSize: engineSize,
        Passengers: passengers,
        CityFuelEconomy: cityFuel,
        HwyFuelEconomy: highway,
        MSRP: MSRP,
        InvoicePrice: invoicePrice,
        Price: price,
        SpecialPrice: specialPrice,
        isSoldAsis: null,
        Category: categoryValue,
        Status: inventoryStatusValue,
        exteriorOptionsList: exteriorOptionsList,
        interiorOptionsList: interiorOptionsList,
        mechanicalOptionsList: mechanicalOptionsList,
        safetyOptionsList: safetyOptionsList,
        entertainmentOptionsList: entertainmentOptionsList,
        VehicleOptions: vehicleOptionsList,
        imgs:
          props.route.params.onEdit == true
            ? props.route.params.payload.imgs != null
              ? props.route.params.payload.imgs
              : []
            : [],
        ETest:
          payloadData.ETest && payloadData.ETest != null
            ? payloadData.ETest
            : "",
        Payment:
          payloadData.Payment && payloadData.Payment != null
            ? payloadData.Payment
            : "",
        displayoutrocomments:
          payloadData != null && payloadData.displayoutrocomments != null
            ? payloadData.displayoutrocomments
            : "",
        WebsiteFeaturedAd:
          props.route.params.onEdit == true
            ? props.route.params.payload.WebsiteFeaturedAd
            : "0",
        HidePrice:
          props.route.params.onEdit == true
            ? props.route.params.payload.HidePrice
            : "0",
        HideKm:
          props.route.params.onEdit == true
            ? props.route.params.payload.HideKm
            : "0",
        HideStockNumber:
          props.route.params.onEdit == true
            ? props.route.params.payload.HideStockNumber
            : "0",
        HideFuelCityHwy:
          props.route.params.onEdit == true
            ? props.route.params.payload.HideFuelCityHwy
            : "0",
        HideVin:
          props.route.params.onEdit == true
            ? props.route.params.payload.HideVin
            : "0",
        HideOptions:
          props.route.params.onEdit == true
            ? props.route.params.payload.HideOptions
            : "0",
        SalePending_SiteDisplay:
          props.route.params.onEdit == true
            ? props.route.params.payload.SalePending_SiteDisplay
            : "0",
        DisplayPayment:
          props.route.params.onEdit == true
            ? props.route.params.payload.DisplayPayment
            : "0",
        DisplayCallForPrice:
          props.route.params.onEdit == true
            ? props.route.params.payload.DisplayCallForPrice
            : "0",
        DisplaySpecialPrice:
          props.route.params.onEdit == true
            ? props.route.params.payload.DisplaySpecialPrice
            : "0",
        DisplayCarproofLink:
          props.route.params.onEdit == true
            ? props.route.params.payload.DisplayCarproofLink
            : "0",
        SellerComments:
          props.route.params.onEdit == true
            ? props.route.params.payload.SellerComments
            : "",
        Warranty:
          props.route.params.onEdit == true
            ? props.route.params.payload.Warranty
            : "",
        DealerComments:
          props.route.params.onEdit == true
            ? props.route.params.payload.DealerComments
            : "",
        CarproofLink:
          props.route.params.onEdit == true
            ? props.route.params.payload.CarproofLink
            : "",
        OtherLink:
          props.route.params.onEdit == true
            ? props.route.params.payload.OtherLink
            : "",
      };

      navigation.navigate("VehicleDescription", {
        payload: payload,
        onEdit: props.route.params.onEdit,
        editId: props.route.params.editId,
        outroCommentsText: props.route.params.outroCommentsText,
      });
    } else {
      alert("Please enter required fields");
      console.log("Wrong");
    }
  };

  const validateFields = () => {
    const stockNumberValid = stockNumber != null;
    setStockNumberValid(stockNumberValid);
    console.log(stockNumberValid);
    const makeValid = selectedMake != null;

    setIsMakeValid(makeValid);
    const modelValid = selectedModal != null;
    setIsModalValid(modelValid);
    const yearValid = selectedYear != null;
    setIsYearValid(yearValid);
    const styleValid = selectedStyle != null;
    setIsStyleValid(styleValid);

    if (
      stockNumberValid == true &&
      makeValid == true &&
      yearValid == true &&
      styleValid == true &&
      modelValid == true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onCalculateVim = async () => {
    if(!vim) {
      alert("Please add VIN");
      return;
    }

    setSpinner(true);
    const link = `${(baseUrl || devBaseURL)}/appvindecoder/${vim}`;
    await axios
      .get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data, status } = response;
        if (data != null && data.vMake.value) {
          setVimApiValues(data);
        }
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
        console.log(e.response.data);
        alert(e);
      });
  };

  const setVimApiValues = (data) => {
    console.log("====================================");
    console.log("====================================");
    console.log(data.vMake.value);
    console.log("====================================");
    console.log("====================================");
    //Set Make
    console.log(data.Vin)
    setVim(data.Vin)
    setMakeValue(data.vMake.value);
    setSelectedMake(data.vMake);
    //Set Model
    setModalValue(data.vModel.value);
    setSelectedModal(data.vModel);
    //Set Trim
    console.log(data.InvoicePrice)
    setTrim(data.Trim);
    //Set Transmission
    setTransmissionValue(data.Transmission.value);
    setSelectedTransmission(data.Transmission);
    //Set Exterior Color
    setExteriorValue(data.ExteriorColor.value);
    setSelectedExterior(data.ExteriorColor);
    //Set Interior Color
    setInteriorValue(data.InteriorColor.value);
    setSelectedInterior(data.InteriorColor);
    //Set Doors
    setDoorsValue(data.Doors.value);
    setSelectedDoors(data.Doors);
    //Set Driverline
    setDrivelineValue(data.DriveType.value);
    setSelectedDriveline(data.DriveType);
    //Set Driverline
    setYearValue(data.Year);
    setSelectedYear(data.Year);
    //Set Fuel
    setFuelValue(data.FuelType.value);

    setSelectedFuel(data.FuelType);
    //Set Body Style
    setStyleValue(data.BodyStyle.value);
    setSelectedStyle(data.BodyStyle);
    //Set Engine
    setEngineValue(data.Engine.value);
    setSelectedEngine(data.Engine);
    //Set Engine Size
    setEngineSize(data.EngineSize);
    //Set Passengers
    setPassengers(data.Passengers);
    //Set City Fuel;
    setCityFuel(data.CityFuelEconomy);
    //set Category list

    if(data.Category) {
      setCategoryValue(data.Category);
    }

    setKilometers(data.Kilometers);

    if(data.Status) {
      setInventoryStatusValue(data.Status);
    }
    if(data.MSRP) {
      setMSRP(data.MSRP.toString());
    }
    if(data.InvoicePrice) {
      setInvoicePrice(data.InvoicePrice.toString());
    }
    setPrice(data.Price);
    setSpecialPrice(data.SpecialPrice);
    //set Highway Fuel
    setHighway(data.HwyFuelEconomy);
    //set Price
    if (data.Price != null) {
      setPrice(data.Price);
    }

    //set Inventory status
    if (data.StockNumber != null) {
      setStockNumber(data.StockNumber);
    }

    //set Passanger
    setPassengers(data.Passengers);
    if (data.ExteriorOptions != "" && data.ExteriorOptions != null) {
      var arr = data.ExteriorOptions.split("|");
      var tempArray = [];
      arr.map((name) => {
        tempArray.push({ key: name, isSelected: true });
      });
      setExteriorOptionsList(tempArray);
    }
    if (data.InteriorOptions != "" && data.InteriorOptions != null) {
      var arr = data.InteriorOptions.split("|");
      var tempArray = [];
      arr.map((name) => {
        tempArray.push({ key: name, isSelected: true });
      });
      setInteriorOptionsList(tempArray);
    }
    if (data.MechanicalOptions != "" && data.MechanicalOptions != null) {
      var arr = data.MechanicalOptions.split("|");
      var tempArray = [];
      arr.map((name) => {
        tempArray.push({ key: name, isSelected: true });
      });
      setMechanicalOptionsList(tempArray);
    }
    if (data.SafetyOptions != "" && data.SafetyOptions != null) {
      var arr = data.SafetyOptions.split("|");
      var tempArray = [];
      arr.map((name) => {
        tempArray.push({ key: name, isSelected: true });
      });
      setSafetyOptionsList(tempArray);
    }
    if (data.EntertainmentOptions != "" && data.EntertainmentOptions != null) {
      var arr = data.EntertainmentOptions.split("|");
      var tempArray = [];
      arr.map((name) => {
        tempArray.push({ key: name, isSelected: true });
      });
      setEntertainmentOptionsList(tempArray);
    }
    if (data.VehicleOptions != null && data.VehicleOptions.length > 0) {
      var tempArray = [];
      data.VehicleOptions.map((item) => {
        tempArray.push({ key: item.value, isSelected: true });
      });
      setVehicleOptionsList(tempArray);
    }
  };

  const transmissionHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(transmissionListTemp, (item) => {
      return containsTran(item, formattedQuery);
    });
    setTransmissionList(filteredData);
    setQuery(text);
    if (text == "") {
      setTransmissionList(transmissionListTemp);
    }
  };

  const containsTran = (item, query) => {
    if (item != null) {
      if (item.transmission.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const makeHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(makeListTemp, (item) => {
      return containsMake(item, formattedQuery);
    });
    setMakeList(filteredData);
    setQuery(text);
    if (text == "") {
      setMakeList(makeListTemp);
    }
  };

  const containsMake = (item, query) => {
    console.log("====================================");
    console.log(item);
    console.log("====================================");
    if (item != null) {
      if (item.make.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const modalHandleSearch = (text) => {
    console.log("====================================");
    console.log(modalListTemp);
    console.log("====================================");
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(modalListTemp, (item) => {
      return containsModal(item, formattedQuery);
    });
    setModalList(filteredData);

    setQuery(text);
    if (text == "") {
      setModalList(modalListTemp);
    }
  };

  const containsModal = (item, query) => {
    console.log("====================================");
    console.log(item);
    console.log("====================================");
    if (item != null) {
      if (item.model.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const exteriorHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(exteriorListTemp, (item) => {
      return containsExterior(item, formattedQuery);
    });
    setExteriorList(filteredData);
    setQuery(text);
    if (text == "") {
      setExteriorList(modalListTemp);
    }
  };

  const containsExterior = (item, query) => {
    if (item != null) {
      if (item.exteriorColor.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const interiorHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(interiorListTemp, (item) => {
      return containsInterior(item, formattedQuery);
    });
    setInteriorList(filteredData);
    setQuery(text);
    if (text == "") {
      setInteriorList(interiorListTemp);
    }
  };

  const containsInterior = (item, query) => {
    if (item != null) {
      if (item.interiorColor.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const doorHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(doorsListTemp, (item) => {
      return containsDoor(item, formattedQuery);
    });
    setDoorsList(filteredData);
    setQuery(text);
    if (text == "") {
      setDoorsList(doorsListTemp);
    }
  };

  const containsDoor = (item, query) => {
    if (item != null) {
      if (item.door.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const drivelineHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(drivelineListTemp, (item) => {
      return containsDriveline(item, formattedQuery);
    });
    setDrivelineList(filteredData);
    setQuery(text);
    if (text == "") {
      setDrivelineList(drivelineListTemp);
    }
  };

  const containsDriveline = (item, query) => {
    if (item != null) {
      if (item.driveType.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const fuelHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fuelListTemp, (item) => {
      return containsFuel(item, formattedQuery);
    });
    setFuelList(filteredData);
    setQuery(text);
    if (text == "") {
      setFuelList(fuelListTemp);
    }
  };

  const containsFuel = (item, query) => {
    if (item != null) {
      if (item.fuelType.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const yearHandleSearch = (text) => {
    const formattedQuery = text.toString().toLowerCase();
    const filteredData = filter(yearListTemp, (item) => {
      return containsYear(item, formattedQuery);
    });
    setYearList(filteredData);
    setQuery(text);
    if (text == "") {
      setYearList(yearListTemp);
    }
  };

  const containsYear = (item, query) => {
    if (item != null && item.value != null) {
      if (item.value.toString().toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const styleHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(styleListTemp, (item) => {
      return containsStyle(item, formattedQuery);
    });
    setStyleList(filteredData);
    setQuery(text);
    if (text == "") {
      setStyleList(styleListTemp);
    }
  };

  const containsStyle = (item, query) => {
    if (item != null) {
      if (item.bodyStyle.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const engineHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(engineListTemp, (item) => {
      return containsEngine(item, formattedQuery);
    });
    setEngineList(filteredData);
    setQuery(text);
    if (text == "") {
      setEngineList(engineListTemp);
    }
  };

  const containsEngine = (item, query) => {
    if (item != null) {
      if (item.engine.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  const categoryHandleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(categoryListTemp, (item) => {
      return containCategory(item, formattedQuery);
    });
    setCategoryList(filteredData);
    setQuery(text);
    if (text == "") {
      setCategoryList(categoryListTemp);
    }
  };

  const containCategory = (item, query) => {
    if (item != null) {
      if (item.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          <View //Header
            style={styles.header}
          >
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="chevron-back" size={25} color={black} />
            </TouchableOpacity>
            <Text1 style={{ color: blackThree, fontSize: 23 }}>
              Vehicle Details
            </Text1>

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

          <View style={{ height: hp("2") }}></View>

          <View style={{ height: hp("3") }}></View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: 'center',
              justifyContent: "space-between",
              marginHorizontal: wp("5"),
            }}
          >
            <TextField
              showHeading={true}
              headingText="Vin"
              // ref={passwordRef}
              isFieldValid={true}
              returnKeyType="next"
              autoCapitalize="none"
              placeholder={"vin"}
              fieldValue={vim}
              keyboardType={"default"}
              onSubmitEditing={() => {
                //   onSubmitPasswordEditingFunction();
              }}
              // autoFocus={true}
              // keyboardType={"numeric"}
              blurOnSubmit={false}
              onChangeField={(text) => {
                setVim(text);
              }}
              style={{ width: wp("70%"), aspectRatio: 5 }}
              textStyle={{ paddingLeft: wp("2") }}
            />
            <TouchableOpacity
              onPress={() => onCalculateVim()}
              style={{
                width: wp("18%"),
                aspectRatio: 1.3,
                borderRadius: 10,
                alignSelf: "flex-end",
                backgroundColor: mainBlue,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text1 style={{ color: white, fontSize: 16 }}>Decode</Text1>
            </TouchableOpacity>
          </View>
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Stock Number"
            // ref={passwordRef}
            isFieldValid={isStockNumberValid}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Stock Number"}
            fieldValue={stockNumber}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            blurOnSubmit={false}
            onChangeField={(text) => setStockNumber(text)}
          />
          <View style={{ height: hp("2") }}></View>

          <ModalComponent
            headingText="Make"
            modalText="Make"
            isVisible={isMakeVisible}
            onPressClose={() => setIsMakeVisible(false)}
            onPressOpen={() => setIsMakeVisible(true)}
            placeHolder={"Make"}
            list={makeList}
            value={makeValue}
            onSelectItem={(index) => {
              setMakeModel(makeList[index]);
              setMakeValue(makeList[index].make);
              setIsMakeVisible(false);
            }}
            isFieldValid={isMakeValid}
            onHandleSearch={(text) => makeHandleSearch(text)}
            selectedItem={selectedMake}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText={"Model"}
            modalText={"Model"}
            isVisible={isModelVisible}
            onPressClose={() => setIsModelVisible(false)}
            onPressOpen={() => onSelectModel()}
            placeHolder={"Model"}
            list={modalList}
            value={modalValue}
            onSelectItem={(index) => {
              setSelectedModal(modalList[index]);
              setModalValue(modalList[index].model);
              setIsModelVisible(false);
            }}
            onHandleSearch={(text) => modalHandleSearch(text)}
            isFieldValid={isModalValid}
            selectedItem={selectedModal}
          />
          
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Year"
            modalText="Year"
            isVisible={isYearVisible}
            value={yearValue}
            onPressClose={() => setIsYearVisible(false)}
            onPressOpen={() => getYears()}
            onSelectItem={(index) => {
              setSelectedYear(yearList[index]);
              setYearValue(yearList[index].value);
              setIsYearVisible(false);
            }}
            onHandleSearch={(text) => yearHandleSearch(text)}
            isFieldValid={isYearValid}
            placeHolder={"Year"}
            list={yearList}
            selectedItem={selectedYear}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Body Style"
            modalText="Style"
            isVisible={isStyleVisible}
            value={styleValue}
            onPressClose={() => setIsStyleVisible(false)}
            onPressOpen={() => getStyles()}
            onSelectItem={(index) => {
              setSelectedStyle(styleList[index]);
              setStyleValue(styleList[index].bodyStyle);
              setIsStyleVisible(false);
            }}
            onHandleSearch={(text) => styleHandleSearch(text)}
            isFieldValid={isStyleValid}
            placeHolder={"Select Body Style"}
            list={styleList}
            selectedItem={selectedStyle}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Kilometers"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Kilometers"}
            fieldValue={kilometers}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) => setKilometers(text)}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Trim"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Trim"}
            fieldValue={trim}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            // keyboardType={'email-address'}
            blurOnSubmit={false}
            onChangeField={(text) => setTrim(text)}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Transmission"
            modalText="Transmission"
            isVisible={isTransmissionVisible}
            value={transmissionValue}
            onPressClose={() => setIsTransmissionVisible(false)}
            onPressOpen={() => getTransmission()}
            onSelectItem={(index) => {
              setSelectedTransmission(transmissionList[index]);
              setTransmissionValue(transmissionList[index].transmission);
              setIsTransmissionVisible(false);
            }}
            onHandleSearch={(text) => transmissionHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Transmission"}
            list={transmissionList}
            selectedItem={selectedTransmission}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Exterior Color"
            modalText="Exterior Color"
            isVisible={isExteriorVisible}
            value={exteriorValue}
            onPressClose={() => setIsExteriorVisible(false)}
            onPressOpen={() => getExteriorColor()}
            onSelectItem={(index) => {
              setSelectedExterior(exteriorList[index]);
              setExteriorValue(exteriorList[index].exteriorColor);
              setIsExteriorVisible(false);
            }}
            onHandleSearch={(text) => exteriorHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Exterior Color"}
            list={exteriorList}
            selectedItem={selectedExterior}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Interior Color"
            modalText="Interior Color"
            isVisible={isInteriorVisible}
            value={interiorValue}
            onPressClose={() => setIsInteriorVisible(false)}
            onPressOpen={() => getInteriorColor()}
            onSelectItem={(index) => {
              setSelectedInterior(interiorList[index]);
              setInteriorValue(interiorList[index].interiorColor);
              setIsInteriorVisible(false);
            }}
            onHandleSearch={(text) => interiorHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Interior Color"}
            list={interiorList}
            selectedItem={selectedInterior}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Doors"
            modalText="Doors"
            isVisible={isDoorsVisible}
            value={doorsValue}
            onPressClose={() => setIsDoorsVisible(false)}
            onPressOpen={() => getDoors()}
            onSelectItem={(index) => {
              setSelectedDoors(doorsList[index]);
              setDoorsValue(doorsList[index].door);
              setIsDoorsVisible(false);
            }}
            onHandleSearch={(text) => doorHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Doors"}
            list={doorsList}
            selectedItem={selectedDoors}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Driveline"
            modalText="Driveline"
            isVisible={isDrivelineVisible}
            value={drivelineValue}
            onPressClose={() => setIsDrivelineVisible(false)}
            onPressOpen={() => getDriveline()}
            onSelectItem={(index) => {
              setSelectedDriveline(drivelineList[index]);
              setDrivelineValue(drivelineList[index].driveType);
              setIsDrivelineVisible(false);
            }}
            onHandleSearch={(text) => drivelineHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Driveline"}
            list={drivelineList}
            selectedItem={selectedDriveline}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Fuel"
            modalText="Fuel"
            isVisible={isFuelVisible}
            value={fuelValue}
            onPressClose={() => setIsFuelVisible(false)}
            onPressOpen={() => getFuel()}
            onSelectItem={(index) => {
              setSelectedFuel(fuelList[index]);
              setFuelValue(fuelList[index].fuelType);
              setIsFuelVisible(false);
            }}
            onHandleSearch={(text) => fuelHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Fuel Type"}
            list={fuelList}
            selectedItem={selectedFuel}
          />

          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Engine"
            modalText="Engine"
            isVisible={isEngineVisible}
            value={engineValue}
            onPressClose={() => setIsEngineVisible(false)}
            onPressOpen={() => getEngine()}
            onSelectItem={(index) => {
              setSelectedEngine(engineList[index]);
              setEngineValue(engineList[index].engine);
              setIsEngineVisible(false);
            }}
            onHandleSearch={(text) => engineHandleSearch(text)}
            isFieldValid={true}
            placeHolder={"Select Engine Type"}
            list={engineList}
            selectedItem={selectedEngine}
          />

          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Passengers"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Passengers"}
            fieldValue={passengers}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            // keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) =>
              text < 21 ? setPassengers(text) : setPassengers("")
            }
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="City Fuel"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"City Fuel"}
            fieldValue={cityFuel}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) => setCityFuel(text)}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Highway Fuel"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Highway Fuel"}
            fieldValue={highway}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) => (text <= 8 ? setHighway(text) : null)}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="MSRP (for information only)"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"MSRP"}
            fieldValue={MSRP}
            keyboardType={"default"} 
            editable={false}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            // keyboardType={'email-address'}
            blurOnSubmit={false}
            onChangeField={(text) => {setMSRP(text);}}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Invoice Price (for information only)"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next" 
            editable={false}
            autoCapitalize="none"
            placeholder={"Invoice Price"} 
            fieldValue={invoicePrice} 
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Price"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Price"}
            fieldValue={price}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) => setPrice(text)}
          />
          <View style={{height: hp('2')}}></View>
          <TextField
            showHeading={true}
            headingText="Special Price"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'Special Price'}
            fieldValue={specialPrice}
            // keyboardType={'default'}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // secureTextEntry={true}
            // autoFocus={true}
            keyboardType={'numeric'}
            blurOnSubmit={false}
            onChangeField={text => setSpecialPrice(text)}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Inventory Status"
            modalText="Inventory Status"
            isVisible={isInventoryStatusVisible}
            value={inventoryStatusValue}
            onPressClose={() => setIsInventoryStatusVisible(false)}
            onPressOpen={() => setIsInventoryStatusVisible(true)}
            onSelectItem={(index) => {
              setSelectedInventoryStatus(inventoryStatusList[index]);
              setInventoryStatusValue(inventoryStatusList[index]);
              setIsInventoryStatusVisible(false);
            }}
            isFieldValid={true}
            placeHolder={"Select Inventory Status"}
            list={inventoryStatusList}
            selectedItem={selectedInventoryStatus}
          />
          <View style={{ height: hp("2") }}></View>
          <ModalComponent
            headingText="Category"
            modalText="Category"
            isVisible={isCategoryVisible}
            value={categoryValue}
            onPressClose={() => setIsCategoryVisible(false)}
            onPressOpen={() => setIsCategoryVisible(true)}
            onSelectItem={(index) => {
              setSelectedCategory(categoryList[index]);
              setCategoryValue(categoryList[index]);
              setIsCategoryVisible(false);
            }}
            isFieldValid={true}
            onHandleSearch={(text) => categoryHandleSearch(text)}
            placeHolder={"Select Category"}
            list={categoryList}
            selectedItem={selectedCategory}
          />
          <View style={{ height: hp("2") }}></View>
          <TextField
            showHeading={true}
            headingText="Engine Size"
            // ref={passwordRef}
            isFieldValid={true}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={"Engine Size"}
            fieldValue={engineSize}
            keyboardType={"default"}
            onSubmitEditing={() => {
              //   onSubmitPasswordEditingFunction();
            }}
            // autoFocus={true}
            keyboardType={"numeric"}
            blurOnSubmit={false}
            onChangeField={(text) => setEngineSize(text)}
          />

          <View style={{ height: hp("2") }}></View>
          <ButtonNormal
            onPress={() => {
              onStepTwo();
              // navigation.navigate('VehicleDescription');
            }}
            style={{ marginBottom: hp("2") }}
            color={mainBlue}
          >
            Next
          </ButtonNormal>
          <View style={{ height: hp("2") }}></View>
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetails);

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
});

{
  /* <View
style={{
  width: wp('90'),
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}}>
<View // Step 1
  style={{
    borderRadius: 50,
    borderWidth: 2,
    borderColor: mainBlue,
    width: wp('13'),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  }}>
  <View
    style={{
      height: undefined,
      aspectRatio: 1,
      width: wp('10'),
      backgroundColor: mainBlue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    }}>
    <Text1 style={{color: white}}>1</Text1>
  </View>
</View>
<View
  style={{
    height: hp('0.5'),
    backgroundColor: greyish,
    flex: 1,
  }}></View>

<View // Step 2
  style={{
    borderRadius: 50,
    borderWidth: 2,
    borderColor: greyish,
    width: wp('13'),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  }}>
  <View
    style={{
      height: undefined,
      aspectRatio: 1,
      width: wp('10'),
      backgroundColor: greyish,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    }}>
    <Text1 style={{color: white}}>2</Text1>
  </View>
</View>
<View
  style={{
    height: hp('0.5'),
    backgroundColor: greyish,
    flex: 1,
  }}></View>
<View // Step 3
  style={{
    borderRadius: 50,
    borderWidth: 2,
    borderColor: greyish,
    width: wp('13'),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  }}>
  <View
    style={{
      height: undefined,
      aspectRatio: 1,
      width: wp('10'),
      backgroundColor: greyish,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    }}>
    <Text1 style={{color: white}}>3</Text1>
  </View>
</View>
<View
  style={{
    height: hp('0.5'),
    backgroundColor: greyish,
    flex: 1,
  }}></View>
<View // Step 3
  style={{
    borderRadius: 50,
    borderWidth: 2,
    borderColor: greyish,
    width: wp('13'),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  }}>
  <View
    style={{
      height: undefined,
      aspectRatio: 1,
      width: wp('10'),
      backgroundColor: greyish,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    }}>
    <Text1 style={{color: white}}>4</Text1>
  </View>
</View>
</View> */
}
