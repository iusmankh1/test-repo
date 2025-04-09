import { View, Text } from "react-native";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextField from "../../Components/TextFieldComponent/TextField";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
    mainBlue,
    backgroundColor,
    white,
    black,
    greyish,
    blackThree,
} from "../../Assets/colors/colors";
import SelectPopup from "../../Components/SelectPopup/SelectPopup";
import ButtonNormal from "../../Components/ButtonComponent/ButtonNormal";
import RadioGroup from "react-native-radio-buttons-group";
import SelectDate from "../../Components/DatePicker/SelectDate";
import { connect } from "react-redux";
import { devBaseURL } from "../../Config/networkModule";
import axios from "axios";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const AddCustomer = (props) => {
    const { navigation, accessToken, baseUrl } = props;

  const isFocused = useIsFocused();
    const [spinner, setSpinner] = React.useState(false);
    const [is_customer, setIsCustomer] = React.useState('1');
    const [gender, setGender] = React.useState("");
    const [salutation, setSalutation] = React.useState("");
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone_number, setPhoneNumber] = React.useState("");
    const [phone_number_2, setPhoneNumber2] = React.useState("");
    const [phone_number_3, setPhoneNumber3] = React.useState("");
    const [fax_number, setFaxNumber] = React.useState("");
    const [company_name, setCompanyName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [address_2, setAddress2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [postal_code, setPostalCode] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [social_insurance, setSocialInsurance] = React.useState("");
    const [date_birth, setDateBirth] = React.useState("");
    const [drivers_license_number, setDriversLicenseNumber] =
        React.useState("");
    const [drivers_license_state, setDriversLicenseState] = React.useState("");
    const [drivers_license_exp, setDriversLicenseExp] = React.useState("");
    const [residence_duration_year, setResidenceDurationYear] =
        React.useState("");
    const [residence_duration_month, setResidenceDurationMonth] =
        React.useState("");
    const [residence_status, setResidenceStatus] = React.useState("");
    const [residence_payment, setResidencePayment] = React.useState("");
    const [lead_type, setLeadType] = React.useState("");
    const [first_visit_date, setFirstVisitDate] = React.useState("");
    const [deal_date, setDealDate] = React.useState("");

    //list options
    const radioButtons = React.useMemo(() => ([
        {
            id: '0', // acts as primary key, should be unique and non-empty string
            label: 'Lead',
            value: 'lead'
        },
        {
            id: '1',
            label: 'Customer',
            value: 'customer'
        }
    ]), []);

    const [genderList, setGenderList] = React.useState([
        "Male",
        "Female",
        "Third Gender",
    ]);
    const [salutationList, setSalutationList] = React.useState([
        "Dr.",
        "Miss.",
        "Mr.",
        "Mrs.",
        "Ms.",
    ]);
    const [provinceList, setProvinceList] = React.useState([
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland",
        "Northwest Territories",
        "Nova Scotia",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon Territory",
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan ",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ]);
    const [residenceDurationYearList, setResidenceDurationYearList] =
        React.useState([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "12+",
        ]);
        const [residenceDurationMonthList, setResidenceDurationMonthList] =
            React.useState([
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ]);
            const [residenceStatusList, setResidenceStatusList] =
                React.useState(["Own", "Rent", "Other"]);
    const [leadTypeList, setLeadTypeList] = React.useState([
        "Internet",
        "TV",
        "Radio",
        "Newspaper",
        "Email",
        "Walk-In",
        "Facebook",
        "Website",
        "Phone Call",
        "Online Application",
        "Refferal",
        "Auto Trader",
        "CarGurus",
        "Carpages",
        "Canada Drives",
        "Kijiji",
    ]);

    //list visibility
    const [isGenderVisible, setIsGenderVisible] = React.useState(false);
    const [isSalutationVisible, setIsSalutationVisible] = React.useState(false);
    const [isProvinceVisible, setIsProvinceVisible] = React.useState(false);
    const [isDriversLicenseStateVisible, setIsDriversLicenseStateVisible] =
        React.useState(false);
    const [isResidenceDurationYearVisible, setIsResidenceDurationYearVisible] =
        React.useState(false);
    const [isResidenceDurationMonthVisible, setIsResidenceDurationMonthVisible] =
        React.useState(false);
    const [isResidenceStatusVisible, setIsResidenceStatusVisible] =
        React.useState(false);
    const [isLeadTypeVisible, setIsLeadTypeVisible] = React.useState(false);

    //for validation
    const [isFirstNameValid, setIsFirstNameValid] = React.useState(true);
    const [isLastNameValid, setIsLastNameValid] = React.useState(true);
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isLeadTypeValid, setIsLeadTypeValid] = React.useState(true);

    useEffect(() => {
        if(props.route.params) {
            if(props.route.params.onCreate == true) {
                if(props.route.params.payload) {
                    let data = props.route.params.payload;
                    setData(data);
                } else {
                    setDefault();
                }
            }else{
                let data = props.route.params.payload;
                setData(data);
            }
        }
    }, [isFocused]);

    const setData = (data) => {
        setIsCustomer(data.is_customer ?? 1);
        setSalutation(data.salutation ?? "");
        setGender(data.gender ?? "");
        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
        setEmail(data.email ?? "");
        setPhoneNumber(data.phone_number ?? "");
        setPhoneNumber2(data.phone_number_2 ?? "");
        setPhoneNumber3(data.phone_number_3 ?? "");
        setFaxNumber(data.fax_number ?? "");
        setCompanyName(data.company_name ?? "");
        setAddress(data.address ?? "");
        setAddress2(data.address_2 ?? "");
        setCity(data.city ?? "");
        setProvince(data.province ?? "");
        setPostalCode(data.postal_code ?? "");
        setCountry(data.country ?? "");
        setSocialInsurance(data.social_insurance ?? "");
        setDateBirth(data.date_birth ?? "");
        setDriversLicenseNumber(data.drivers_license_number ?? "");
        setDriversLicenseState(data.drivers_license_state ?? "");
        setDriversLicenseExp(data.drivers_license_exp ?? "");
        setResidenceDurationYear(data.residence_duration_year ?? "");
        setResidenceDurationMonth(data.residence_duration_month ?? "");
        setResidenceStatus(data.residence_status ?? "");
        setResidencePayment(data.residence_payment ?? "");
        setLeadType(data.lead_type ?? "");
        setFirstVisitDate(data.first_visit_date ?? "");
        setDealDate(data.deal_date ?? "");
    };

    const setDefault = () => {
        setIsCustomer('1');
        setSalutation("");
        setGender("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setPhoneNumber2("");
        setPhoneNumber3("");
        setFaxNumber("");
        setCompanyName("");
        setAddress("");
        setAddress2("");
        setCity("");
        setProvince("");
        setPostalCode("");
        setCountry("");
        setSocialInsurance("");
        setDateBirth("");
        setDriversLicenseNumber("");
        setDriversLicenseState("");
        setDriversLicenseExp("");
        setResidenceDurationYear("");
        setResidenceDurationMonth("");
        setResidenceStatus("");
        setResidencePayment("");
        setLeadType("");
        setFirstVisitDate("");
        setDealDate("");
    }


    const submitCustomer = () => {
        setSpinner(true);
        //validate
        let error = [];
        if (first_name == "") {
            setIsFirstNameValid(false);
            error.push("Please fill first name.");
        }

        if (last_name == "") {
            setIsLastNameValid(false);
            error.push("Please fill last name.");
        }

        if (email == "") {
            setIsEmailValid(false);
            error.push("Please fill email.");
        }

        if (lead_type == "") {
            setIsLeadTypeValid(false);
            error.push("Please set lead type.");
        }

        if (error.length > 0) {
            let errorMsg = error.join(" ");
            setSpinner(false);
            alert(errorMsg);
        } else {
            let data = {
                is_customer: is_customer,
                salutation: salutation,
                gender: gender,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                phone_number_2: phone_number_2,
                phone_number_3: phone_number_3,
                fax_number: fax_number,
                company_name: company_name,
                address: address,
                address_2: address_2,
                city: city,
                province: province,
                postal_code: postal_code,
                country: country,
                social_insurance: social_insurance,
                date_birth: date_birth,
                drivers_license_number: drivers_license_number,
                drivers_license_state: drivers_license_state,
                drivers_license_exp: drivers_license_exp,
                residence_duration_year: residence_duration_year,
                residence_duration_month: residence_duration_month,
                residence_status: residence_status,
                residence_payment: residence_payment,
                lead_type: lead_type,
                first_visit_date: first_visit_date,
                deal_date: deal_date,
            };

            //change endpoint in case of update
            let link = '';
            let method = '';
            if(props.route.params) {
                if(props.route.params.onCreate == true) {
                    link = `${(baseUrl || devBaseURL)}/appleadcustomer`;
                    method = 'post';
                }else{
                    link = `${(baseUrl || devBaseURL)}/appleadcustomer/${props.route.params.editId}`;
                    method = 'put';
                }
            }
            console.log(data.date_birth);
            var config = {
                method: method,
                url: link,
                headers: { 
                  'Authorization': `Bearer ${accessToken}`,
                },
                data : data
            };

            axios(config).then(function (response) {
                setSpinner(false);
                console.log('DONE');
                navigation.navigate("Customers");
            }).catch(function (error) {
                console.log(error);
                try {
                    alert(error.response.data.message);
                } catch (error) {
                    alert(error);
                }
                setSpinner(false);
            });
        }
    };

    const convertDateFormat = (date) => {
        if(date.date == "") return "";
        date = date.date;
        let formattedDate = moment(date).format("YYYY-MM-DD");
        return formattedDate;
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

                    <View>
                        <View style={{ paddingLeft: 20, marginTop: 20 }}>
                        <RadioGroup 
                            radioButtons={radioButtons} 
                            onPress={setIsCustomer}
                            selectedId={is_customer}
                            layout="row"
                        />
                        </View>

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Gender"
                            modalText="Gender"
                            isVisible={isGenderVisible}
                            value={gender}
                            onPressClose={() => setIsGenderVisible(false)}
                            onPressOpen={() => setIsGenderVisible(true)}
                            onSelectItem={(item) => {
                                setGender(item);
                                setIsGenderVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select gender"}
                            list={genderList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Salutation"
                            modalText="Salutation"
                            isVisible={isSalutationVisible}
                            value={salutation}
                            onPressClose={() => setIsSalutationVisible(false)}
                            onPressOpen={() => setIsSalutationVisible(true)}
                            onSelectItem={(item) => {
                                setSalutation(item);
                                setIsSalutationVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select salutation"}
                            list={salutationList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="First Name"
                            // ref={passwordRef}
                            isFieldValid={isFirstNameValid}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"First Name"}
                            fieldValue={first_name}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setFirstName(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Last Name"
                            // ref={passwordRef}
                            isFieldValid={isLastNameValid}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Last Name"}
                            fieldValue={last_name}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setLastName(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Email"
                            // ref={passwordRef}
                            isFieldValid={isEmailValid}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Email"}
                            fieldValue={email}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setEmail(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Phone Number"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Phone Number"}
                            fieldValue={phone_number}
                            // keyboardType={"default"}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setPhoneNumber(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Business Number"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Business Number"}
                            fieldValue={phone_number_2}
                            // keyboardType={"default"}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setPhoneNumber2(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Cell Number"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Cell Number"}
                            fieldValue={phone_number_3}
                            // keyboardType={"default"}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setPhoneNumber3(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Fax Number"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Fax Number"}
                            fieldValue={fax_number}
                            // keyboardType={"default"}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setFaxNumber(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Company Name"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Company Name"}
                            fieldValue={company_name}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setCompanyName(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Address"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Address"}
                            fieldValue={address}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setAddress(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Address 2"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Address 2"}
                            fieldValue={address_2}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setAddress2(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="City"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"City"}
                            fieldValue={city}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setCity(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Province"
                            modalText="Province"
                            isVisible={isProvinceVisible}
                            value={province}
                            onPressClose={() => setIsProvinceVisible(false)}
                            onPressOpen={() => setIsProvinceVisible(true)}
                            onSelectItem={(item) => {
                                setProvince(item);
                                setIsProvinceVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select province"}
                            list={provinceList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Postal Code"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Postal Code"}
                            fieldValue={postal_code}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setPostalCode(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Country"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Country"}
                            fieldValue={country}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setCountry(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Social Insurance"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Social Insurance"}
                            fieldValue={social_insurance}
                            //   keyboardType={"default"}
                            keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setSocialInsurance(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectDate
                            headingText={"Date of Birth"}
                            selectedDate={date_birth}
                            handleDateChange={(date) => setDateBirth(convertDateFormat(date))}
                            handleCancel={() => {console.log("object");}}
                        />

                        {/* <TextField
                            showHeading={true}
                            headingText="Date of Birth"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Date of Birth"}
                            fieldValue={date_birth}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setDateBirth(text)}
                        /> */}

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Drivers License Number"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Drivers License Number"}
                            fieldValue={drivers_license_number}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setDriversLicenseNumber(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Drivers License State"
                            modalText="Drivers License State"
                            isVisible={isDriversLicenseStateVisible}
                            value={drivers_license_state}
                            onPressClose={() => setIsDriversLicenseStateVisible(false)}
                            onPressOpen={() => setIsDriversLicenseStateVisible(true)}
                            onSelectItem={(item) => {
                                setDriversLicenseState(item);
                                setIsDriversLicenseStateVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select drivers license state"}
                            list={provinceList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectDate
                            headingText={"Drivers License Expiry"}
                            selectedDate={drivers_license_exp}
                            handleDateChange={(date) => setDriversLicenseExp(convertDateFormat(date))}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Residence Duration Year"
                            modalText="Residence Duration Year"
                            isVisible={isResidenceDurationYearVisible}
                            value={residence_duration_year}
                            onPressClose={() => setIsResidenceDurationYearVisible(false)}
                            onPressOpen={() => setIsResidenceDurationYearVisible(true)}
                            onSelectItem={(item) => {
                                setResidenceDurationYear(item);
                                setIsResidenceDurationYearVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select residence duration year"}
                            list={residenceDurationYearList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Residence Duration Month"
                            modalText="Residence Duration Month"
                            isVisible={isResidenceDurationMonthVisible}
                            value={residence_duration_month}
                            onPressClose={() => setIsResidenceDurationMonthVisible(false)}
                            onPressOpen={() => setIsResidenceDurationMonthVisible(true)}
                            onSelectItem={(item) => {
                                setResidenceDurationMonth(item);
                                setIsResidenceDurationMonthVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select residence duration month"}
                            list={residenceDurationMonthList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Residence Status"
                            modalText="Residence Status"
                            isVisible={isResidenceStatusVisible}
                            value={residence_status}
                            onPressClose={() => setIsResidenceStatusVisible(false)}
                            onPressOpen={() => setIsResidenceStatusVisible(true)}
                            onSelectItem={(item) => {
                                setResidenceStatus(item);
                                setIsResidenceStatusVisible(false);
                            }}
                            isFieldValid={true}
                            placeHolder={"Select residence status"}
                            list={residenceStatusList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <TextField
                            showHeading={true}
                            headingText="Residence Payment"
                            // ref={passwordRef}
                            isFieldValid={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            placeholder={"Residence Payment"}
                            fieldValue={residence_payment}
                            keyboardType={"default"}
                            // keyboardType={"numeric"}
                            blurOnSubmit={false}
                            onChangeField={(text) => setResidencePayment(text)}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectPopup
                            headingText="Lead Type"
                            modalText="Lead Type"
                            isVisible={isLeadTypeVisible}
                            value={lead_type}
                            onPressClose={() => setIsLeadTypeVisible(false)}
                            onPressOpen={() => setIsLeadTypeVisible(true)}
                            onSelectItem={(item) => {
                                setLeadType(item);
                                setIsLeadTypeVisible(false);
                            }}
                            isFieldValid={isLeadTypeValid}
                            placeHolder={"Select lead type"}
                            list={leadTypeList}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectDate
                            headingText={"First Visit Date"}
                            selectedDate={first_visit_date}
                            handleDateChange={(date) => setFirstVisitDate(convertDateFormat(date))}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <SelectDate
                            headingText={"Deal Date"}
                            selectedDate={deal_date}
                            handleDateChange={(date) => setDealDate(convertDateFormat(date))}
                        />

                        <View style={{ height: hp("2") }}></View>

                        <ButtonNormal
                            onPress={() => {
                                submitCustomer();
                                // navigation.navigate('VehicleDescription');
                            }}
                            style={{ marginBottom: hp("2") }}
                            color={mainBlue}
                        >
                            Submit
                        </ButtonNormal>
                    </View>
                </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
