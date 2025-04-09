import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SignatureCapture from "react-native-signature-capture";
import { greyish, mainBlue } from "../../Assets/colors/colors";
import styles from "./styles";
import ViewShot from "react-native-view-shot";
import { devBaseURL } from "../../Config/networkModule";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialIcons";

const axios = require("axios");
const termsArray = [
  "1. I am the only authorized driver for the Vehicle unless additional drivers are listed. I confirm that the Vehicle is in good, safe mechanical condition and will return it in the same condition.",
  "2. I agree to follow all applicable federal, provincial, and municipal laws, rules, and regulations while operating the Vehicle. I will indemnify THE DEALER for any infractions.",
  "3. I will be responsible for any loss or damage to the Vehicle, whether caused by my negligence or not.",
  "4. I confirm that the Vehicle is covered under my insurance policy as a substitute vehicle.",
  "5. For consideration received by THE DEALER, the Vehicle will be considered a Leased Vehicle, and I and any authorized drivers will be considered Lessees under applicable liability laws.",
  "6. I will not operate the Vehicle beyond a 100 km radius of THE DEALER's location without written consent and will not drive outside the province without prior authorization.",
  "7. I will pay for all operating costs, including tolls, fees, and fuel. The Vehicle must be returned with a full tank of gas.",
  "8. I will indemnify THE DEALER against any liabilities, losses, costs, or expenses incurred while the Vehicle is in my custody.",
  "9. I will return the Vehicle to the original location by the agreed time or immediately upon demand.",
  "10. I authorize THE DEALER to process my credit card for a deposit and any additional charges incurred under this agreement, including costs for parking violations, traffic violations, tolls, damages, or theft of the Vehicle.",
  "11. I acknowledge that by providing my driver's license, THE DEALER may obtain a driver's abstract to confirm my legal eligibility to operate the Vehicle.",
];

const LoanerAuthorizationForm = ({ route, navigation, ...props }) => {
  // Use route.params if available, otherwise use empty object
  const { itemData = {} } = route?.params || {};
  const { accessToken, baseUrl, dealer } = props;

  const signatureRef = useRef();
  const screenRef = useRef();

  // Form state
  const [name, setName] = useState(itemData?.first_name || "");
  const [email, setEmail] = useState(itemData?.email || "");
  const [signature, setSignature] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null); // Add this state variable for displaying the signature
  const [errors, setErrors] = useState({});
  const [termsInputs, setTermsInputs] = useState(
    Array(termsArray.length).fill("")
  );
  const [hasSignature, setHasSignature] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeVehicles, setActiveVehicles] = useState(0);
  const [inactiveVehicles, setInactiveVehicles] = useState(0);

  // Time options for the picker
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // Initial form data
  const [formData, setFormData] = useState({
    dealerName: dealer?.dealerName || "",
    make: itemData?.vehicle_make || "",
    model: itemData?.vehicle_model || "",
    color: "",
    modelYear: itemData?.vehicle_year || "",
    vin: itemData?.vehicle_vin || "",
    distance: itemData?.vehicle_kilometers || "",
    distanceUnit: "KM",
    driverInfo: {
      fullName: `${itemData?.first_name || ""} ${
        itemData?.last_name || ""
      }`.trim(),
      dlNumber: itemData?.drivers_license_number || "",
      dlExpiry: itemData?.drivers_license_exp || "",
    },
    date: new Date().toISOString().split("T")[0],
  });

  // Fetch vehicle data on component mount
  useEffect(() => {
    getCarsData();
  }, []);

  // Get available vehicles from API
  const getCarsData = async () => {
    setSpinner(true);
    const link = `${baseUrl || devBaseURL}/applistings`;
    try {
      const response = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = response;
      setListings(data);

      // Count active/inactive vehicles
      let active = 0,
        inactive = 0;
      data.forEach((d) => {
        if (d.active === "1") {
          active++;
        } else {
          inactive++;
        }
      });
      setActiveVehicles(active);
      setInactiveVehicles(inactive);

      setSpinner(false);
    } catch (error) {
      console.error(error);
      if (props.logOut) props.logOut();
      setSpinner(false);
    }
  };

  // Form update handlers
  const updateForm = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateDriverInfo = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      driverInfo: {
        ...prev.driverInfo,
        [field]: value,
      },
    }));
  };

  const handleTermInput = (text, index) => {
    const newTermsInputs = [...termsInputs];
    newTermsInputs[index] = text;
    setTermsInputs(newTermsInputs);
  };

  // VIN input handler with validation
  const handleVinInput = (value) => {
    const formattedVin = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (formattedVin.length <= 17) {
      updateForm("vin", formattedVin);
    }
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation functions
  const validateVIN = (vin) => {
    return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
  };

  const validateDriverLicense = (license) => {
    return /^[A-Z0-9-]{10,}$/i.test(license);
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic form validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Vehicle validation
    if (!selectedListing) {
      newErrors.selectedVehicle = "Please select a vehicle";
    }

    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.modelYear) newErrors.modelYear = "Model year is required";

    if (!formData.vin) {
      newErrors.vin = "VIN is required";
    } else if (!validateVIN(formData.vin)) {
      newErrors.vin = "Invalid VIN format";
    }

    if (!formData.distance) newErrors.distance = "Distance is required";

    // Driver Information validation
    if (!formData.driverInfo.fullName)
      newErrors.fullName = "Full name is required";

    if (!formData.driverInfo.dlNumber) {
      newErrors.dlNumber = "Driver's license number is required";
    } else if (!validateDriverLicense(formData.driverInfo.dlNumber)) {
      newErrors.dlNumber = "Invalid driver's license format";
    }

    if (!formData.driverInfo.dlExpiry)
      newErrors.dlExpiry = "License expiry date is required";

    // Terms validation
    const emptyTerms = termsInputs.some((term) => !term);
    if (emptyTerms) {
      newErrors.terms = "All terms must be acknowledged";
    }

    // Signature validation
    if (!hasSignature) {
      newErrors.signature =
        "Signature is required. Please add your signature and click 'Save' to confirm.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset signature
  const onResetForm = () => {
    signatureRef.current.resetImage();
    setSignature(null);
    setSignatureImage(null);
    setHasSignature(false);
  };

  // Updated createSimplePDF function that includes the signature
  const createSimplePDF = async () => {
    try {
      // The signature comes as base64 data from react-native-signature-capture
      const signatureImg = signature
        ? `<img src="data:image/png;base64,${signature}" style="max-width: 100%; height: auto; border: 1px solid #ddd; margin-top: 10px;" />`
        : '<div style="border: 1px dashed #999; height: 100px; display: flex; justify-content: center; align-items: center; margin-top: 10px;"><p style="color: #999;">No signature provided</p></div>';

      const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #0047AB;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .section {
              margin-bottom: 25px;
              border-bottom: 1px solid #eee;
              padding-bottom: 15px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #0047AB;
            }
            .row {
              display: flex;
              margin-bottom: 10px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              margin-bottom: 5px;
              display: block;
            }
            .value {
              padding: 5px 0;
            }
            .terms {
              margin-bottom: 15px;
            }
            .term-item {
              margin-bottom: 10px;
              padding-left: 20px;
              position: relative;
            }
            .term-item::before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #0047AB;
            }
            .signature-section {
              margin-top: 30px;
            }
            .signature-label {
              font-weight: bold;
              margin-bottom: 10px;
            }
            .signature-date {
              margin-top: 15px;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LOANER AUTHORIZATION</h1>
            <p>Document generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <div class="section-title">CONTACT INFORMATION</div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email || "N/A"}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">VEHICLE INFORMATION</div>
            <div class="field">
              <div class="label">Vehicle:</div>
              <div class="value">${
                selectedListing
                  ? listings.find((car) => car.sid === selectedListing)
                    ? `${
                        listings.find((car) => car.sid === selectedListing)
                          .Year || ""
                      } ${
                        listings.find((car) => car.sid === selectedListing)
                          .vMake || ""
                      } ${
                        listings.find((car) => car.sid === selectedListing)
                          .vModel || ""
                      }`
                    : "Selected Vehicle"
                  : "N/A"
              }</div>
            </div>
            <div class="field">
              <div class="label">Make:</div>
              <div class="value">${formData.make || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Model:</div>
              <div class="value">${formData.model || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Color:</div>
              <div class="value">${formData.color || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Model Year:</div>
              <div class="value">${formData.modelYear || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">VIN:</div>
              <div class="value">${formData.vin || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Distance Travelled:</div>
              <div class="value">${formData.distance || "0"} ${
        formData.distanceUnit
      }</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">TERMS AGREED</div>
            <div class="terms">
              ${termsArray
                .map(
                  (term, index) => `
                <div class="term-item">
                  <div>${term}</div>
                  <div class="value">${
                    termsInputs[index] || "Acknowledged"
                  }</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">DATE AND TIME</div>
            <div class="field">
              <div class="label">Date:</div>
              <div class="value">${formData.date || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Time:</div>
              <div class="value">${selectedTime || "N/A"}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">DRIVER INFORMATION</div>
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${formData.driverInfo.fullName || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">Driver's License Number:</div>
              <div class="value">${formData.driverInfo.dlNumber || "N/A"}</div>
            </div>
            <div class="field">
              <div class="label">License Expiry Date:</div>
              <div class="value">${formData.driverInfo.dlExpiry || "N/A"}</div>
            </div>
          </div>
          
          <div class="signature-section">
            <div class="signature-label">Signature:</div>
            ${signatureImg}
            <div class="signature-date">Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </body>
      </html>
    `;

      const options = {
        html: htmlContent,
        fileName: "LoanerForm_" + new Date().getTime(),
        directory: "Documents",
        base64: false,
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      return pdf.filePath;
    } catch (error) {
      console.error("Error creating PDF:", error);
      Alert.alert("Error", "Failed to create PDF: " + error.message);
      return null;
    }
  };

  // Submit form data to server
  const submitFormData = async (pdfPath) => {
    const pdfUri = `file://${pdfPath}`;
    const data = new FormData();

    try {
      // Add form fields to FormData
      if (itemData && itemData.sid) {
        data.append("sid", itemData.sid.toString());
      }

      data.append(
        "listing_sid",
        selectedListing ? selectedListing.toString() : ""
      );

      // Add name and email
      data.append("name", name);
      data.append("email", email);

      // Handle PDF attachment
      if (pdfUri) {
        data.append("file", {
          uri: pdfUri,
          type: "application/pdf",
          name: "LoanerForm_" + new Date().getTime() + ".pdf",
        });
      }

      // API endpoint
      const url = `${baseUrl || devBaseURL}/lead/testdrive/upload`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error submitting form:", error);

      // Try with alternate URL if primary fails
      try {
        let newUrl = (baseUrl || devBaseURL).replace(".ca", ".com");
        const alternateUrl = `${newUrl}/lead/testdrive/upload`;

        const response = await fetch(alternateUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response from alternate URL:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (secondError) {
        console.error("Error submitting to alternate URL:", secondError);
        throw secondError;
      }
    }
  };

  // Add this function to convert the signature to a base64 image
  // This will be called when the signature is saved
  const onSaveEvent = (result) => {
    if (result && result.encoded) {
      setHasSignature(true);
      setSignature(result.encoded); // This is the base64 string of the signature
      setSignatureImage(`data:image/png;base64,${result.encoded}`); // Set the image source
      console.log("Signature saved successfully");
    }
  };

  // Update the onSubmit function to ensure signature is captured before creating PDF
  const onSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly"
      );
      return;
    }

    try {
      setIsSubmitDisabled(true);

      // Make sure the signature is saved if it exists but hasn't been explicitly saved
      if (signatureRef.current && !hasSignature) {
        signatureRef.current.saveImage();

        // Wait a moment for the signature to be processed
        await new Promise((resolve) => setTimeout(resolve, 500));

        // If still no signature after trying to save, show an error
        if (!signature) {
          Alert.alert(
            "Signature Required",
            "Please add your signature and save it"
          );
          setIsSubmitDisabled(false);
          return;
        }
      }

      // Create PDF with the signature included
      const pdfPath = await createSimplePDF();
      if (!pdfPath) {
        throw new Error("Failed to create PDF");
      }

      console.log("PDF created at:", pdfPath);

      // Submit form data with PDF
      const response = await submitFormData(pdfPath);
      console.log("Form submitted successfully:", response);

      // Show success message
      Alert.alert("Success", "Form submitted successfully", [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setName("");
            setEmail("");
            // onResetForm();

            // Navigate back if navigation is available
            if (navigation && navigation.navigate) {
              navigation.navigate("Customers");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Form submission failed:", error);
      Alert.alert("Error", error.message || "Failed to submit form");
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            showsVerticalScrollIndicator={false}
          >
            <ViewShot
              ref={screenRef}
              options={{
                format: "jpg",
                quality: 0.9,
                backgroundColor: "white",
              }}
              style={styles.contentContainer}
            >
              <Text style={styles.title}>LOANER AUTHORIZATION</Text>

              {/* Simple Name and Email Form */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CONTACT INFORMATION:</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email:</Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
              </View>

              {/* Unsold Cars Picker */}
              <View style={styles.section}>
                <Text style={styles.label}>Select Vehicle:</Text>
                <View
                  style={[
                    styles.pickerContainer,
                    errors.selectedVehicle && styles.inputError,
                  ]}
                >
                  <Picker
                    selectedValue={selectedListing}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedListing(itemValue);
                      if (itemValue) {
                        const selected = listings.find(
                          (car) => car.sid === itemValue
                        );
                        if (selected) {
                          updateForm("make", selected.vMake || "");
                          updateForm("model", selected.vModel || "");
                          updateForm("color", selected.ExteriorColor || "");
                          updateForm("modelYear", selected.Year || "");
                          updateForm("vin", selected.Vin || "");
                          updateForm("distance", selected.Kilometers || "");
                        }
                      }
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Select a vehicle" value="" />
                    {listings
                      .filter((car) => car.Sold === "0")
                      .map((car) => (
                        <Picker.Item
                          key={car.sid}
                          label={`${car.Year} ${car.vMake} ${car.vModel} (ID: ${car.StockNumber})`}
                          value={car.sid}
                        />
                      ))}
                  </Picker>
                </View>
                {errors.selectedVehicle && (
                  <Text style={styles.errorText}>{errors.selectedVehicle}</Text>
                )}
              </View>

              {/* Vehicle Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>VEHICLE INFORMATION:</Text>
                <View style={styles.row}>
                  <View
                    style={[styles.inputContainer, { marginRight: wp("2%") }]}
                  >
                    <Text style={styles.label}>Make:</Text>
                    <TextInput
                      style={[styles.input, errors.make && styles.inputError]}
                      value={formData.make}
                      onChangeText={(value) => updateForm("make", value)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Model:</Text>
                    <TextInput
                      style={[styles.input, errors.model && styles.inputError]}
                      value={formData.model}
                      onChangeText={(value) => updateForm("model", value)}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View
                    style={[styles.inputContainer, { marginRight: wp("2%") }]}
                  >
                    <Text style={styles.label}>Color:</Text>
                    <TextInput
                      style={[styles.input, errors.color && styles.inputError]}
                      value={formData.color}
                      onChangeText={(value) => updateForm("color", value)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Model Year:</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.modelYear && styles.inputError,
                      ]}
                      value={formData.modelYear}
                      onChangeText={(value) => updateForm("modelYear", value)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>VIN:</Text>
                    <TextInput
                      style={[styles.input, errors.vin && styles.inputError]}
                      value={formData.vin}
                      onChangeText={handleVinInput}
                      maxLength={17}
                    />
                    {errors.vin && (
                      <Text style={styles.errorText}>{errors.vin}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.row}>
                  <View
                    style={[styles.inputContainer, { marginRight: wp("2%") }]}
                  >
                    <Text style={styles.label}>Distance Travelled:</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.distance && styles.inputError,
                      ]}
                      value={formData.distance}
                      onChangeText={(value) => updateForm("distance", value)}
                      keyboardType="numeric"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.unitButton}
                    onPress={() =>
                      updateForm(
                        "distanceUnit",
                        formData.distanceUnit === "KM" ? "MIL" : "KM"
                      )
                    }
                  >
                    <Text style={styles.unitButtonText}>
                      {formData.distanceUnit}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  I HEREBY AGREE AS FOLLOWS:
                </Text>
                {termsArray.map((term, index) => (
                  <View key={index} style={styles.termsContainer}>
                    <Text style={styles.terms}>{term}</Text>
                    <TextInput
                      style={[
                        styles.inputText,
                        errors.terms && styles.inputErrorTerms,
                      ]}
                      placeholder=""
                      value={termsInputs[index]}
                      onChangeText={(text) => handleTermInput(text, index)}
                      scrollEnabled
                      multiline={false}
                      editable={true}
                    />
                  </View>
                ))}
              </View>

              {/* Date and Time Section */}
              <View style={styles.section}>
                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date:</Text>
                    <TextInput
                      style={[styles.input, errors.date && styles.inputError]}
                      value={formData.date}
                      onChangeText={(value) => updateForm("date", value)}
                      editable={true}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Time:</Text>
                <View
                  style={[
                    styles.pickerContainer,
                    errors.time && styles.inputError,
                  ]}
                >
                  <Picker
                    selectedValue={selectedTime}
                    onValueChange={(itemValue) => {
                      setSelectedTime(itemValue);
                      updateForm("time", itemValue);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Select time" value="" />
                    {timeOptions.map((time) => (
                      <Picker.Item key={time} label={time} value={time} />
                    ))}
                  </Picker>
                </View>
                {errors.time && (
                  <Text style={styles.errorText}>{errors.time}</Text>
                )}
              </View>

              {/* Driver Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>DRIVER INFORMATION</Text>
                <View style={styles.signatureSection}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.label}>Add Your Signature</Text>
                    {!hasSignature && (
                      <TouchableOpacity onPress={onResetForm}>
                        <Icon name="delete" size={30} color="#FF3B30" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!hasSignature ? (
                    // Show signature pad when no signature is saved
                    <SignatureCapture
                      style={[
                        styles.signatureBox,
                        errors.signature && styles.inputError,
                      ]}
                      ref={signatureRef}
                      onSaveEvent={onSaveEvent}
                      saveImageFileInExtStorage={false}
                      showNativeButtons={false}
                      viewMode="portrait"
                      backgroundColor="white"
                      strokeColor="black"
                      minStrokeWidth={4}
                      maxStrokeWidth={4}
                    />
                  ) : (
                    // Show the saved signature image
                    <View
                      style={[
                        styles.signatureBox,
                        {
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: signatureImage }}
                        style={{
                          width: "100%",
                          height: 150,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  )}

                  {errors.signature && (
                    <Text style={styles.errorText}>{errors.signature}</Text>
                  )}

                  <View style={styles.signatureButtonContainer}>
                    {!hasSignature ? (
                      // Only show Save button when there's no signature yet
                      <TouchableOpacity
                        onPress={() => {
                          signatureRef.current.saveImage();
                          setErrors((prev) => ({
                            ...prev,
                            signature: undefined,
                          }));
                        }}
                        style={[
                          styles.saveButton,
                          { backgroundColor: mainBlue },
                        ]}
                      >
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableOpacity>
                    ) : (
                      // Show Edit button when there's a saved signature
                      <TouchableOpacity
                        onPress={() => {
                          setHasSignature(false);
                          setSignatureImage(null);
                        }}
                        style={[
                          styles.saveButton,
                          { backgroundColor: mainBlue },
                        ]}
                      >
                        <Text style={styles.buttonText}>Edit Signature</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name:</Text>
                  <TextInput
                    style={[styles.input, errors.fullName && styles.inputError]}
                    value={formData.driverInfo.fullName}
                    onChangeText={(value) =>
                      updateDriverInfo("fullName", value)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Driver's License Number:</Text>
                  <TextInput
                    style={[styles.input, errors.dlNumber && styles.inputError]}
                    value={formData.driverInfo.dlNumber}
                    onChangeText={(value) =>
                      updateDriverInfo("dlNumber", value)
                    }
                  />
                  {errors.dlNumber && (
                    <Text style={styles.errorText}>{errors.dlNumber}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>License Expiry Date:</Text>
                  <TextInput
                    style={[styles.input, errors.dlExpiry && styles.inputError]}
                    value={formData.driverInfo.dlExpiry}
                    onChangeText={(value) =>
                      updateDriverInfo("dlExpiry", value)
                    }
                  />
                </View>
              </View>
            </ViewShot>

            {/* Submit Button */}
            <View style={styles.buttonsStyle}>
              <TouchableOpacity
                onPress={onSubmit}
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: isSubmitDisabled ? greyish : mainBlue,
                    opacity: isSubmitDisabled ? 0.7 : 1,
                  },
                ]}
                disabled={isSubmitDisabled}
              >
                <Text style={styles.buttonText}>
                  {isSubmitDisabled ? "Processing..." : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanerAuthorizationForm);
