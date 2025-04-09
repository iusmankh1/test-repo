import { StyleSheet, Platform } from "react-native";
import {
  greyish,
  mainBlue,
  backgroundColor,
  white,
} from "../../Assets/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },
  container: {
    flex: 1,
    backgroundColor: white,
  },
  contentContainer: {
    backgroundColor: white,
    padding: wp("4%"),
    paddingBottom: hp("4%"),
  },
  picker: Platform.select({
    ios: {
      width: "100%",
      // height: 180,
      color: "#000000",
    },
    android: {
      width: "100%",
      // height: 50,
      color: "#000000",
    },
  }),
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: white,
    overflow: "hidden",
    marginBottom: hp("1%"),
    ...Platform.select({
      ios: {
        paddingVertical: 0,
      },
      android: {
        height: 50,
        justifyContent: "center",
      },
    }),
  },
  pickerItem: Platform.select({
    ios: {
      fontSize: wp("4%"),
      color: "#000000",
      height: 120,
    },
    android: {
      fontSize: wp("4%"),
      color: "#000000",
    },
  }),
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: hp("3%"),
    color: "#121212",
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: hp("2%"),
    backgroundColor: white,
    borderRadius: 8,
    padding: wp("4%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    marginBottom: hp("2%"),
    color: "#121212",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
    gap: wp("4%"),
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: wp("3.8%"),
    marginBottom: hp("1%"),
    marginTop: hp("1%"),
    color: "#121212",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: wp("3%"),
    paddingVertical: Platform.OS === 'ios' ? hp("1.5%") : hp("1%"),
    fontSize: wp("4%"),
    color: "#121212",
    backgroundColor: white,
    height: Platform.OS === 'ios' ? 45 : 50,
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: wp("3.2%"),
    marginTop: hp("0.5%"),
  },
  terms: {
    fontSize: wp("3.8%"),
    marginBottom: hp("1%"),
    lineHeight: wp("5.5%"),
    color: "#121212",
  },
  termsContainer: {
    marginBottom: hp("2%"),
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    color: "#121212",
  },
  signatureSection: {
    marginBottom: hp("2%"),
    width: "100%",
  },
  signatureBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: hp("1%"),
    width: "100%",
    height: hp("25%"),
    backgroundColor: white,
  },
  signatureButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: hp("1%"),
    gap: wp("3%"),
  },
  saveButton: {
    padding: wp("3%"),
    borderRadius: 8,
    minWidth: wp("30%"),
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  buttonText: {
    color: white,
    fontWeight: "600",
    fontSize: wp("4%"),
  },
  buttonsStyle: {
    flexDirection: "row",
    marginVertical: hp("2%"),
    marginHorizontal: hp("2.5%"),
    justifyContent: "center",
    width: "90%",
  },
  buttonStyle: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  unitButton: {
    backgroundColor: mainBlue,
    padding: wp("3%"),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: wp("15%"),
    height: Platform.OS === 'ios' ? 45 : 50,
    marginTop: 35,
  },
  unitButtonText: {
    color: white,
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  text: {
    color: "#121212",
    fontSize: wp("4%"),
    fontWeight: "500",
    marginBottom: hp("1%"),
  },
  inputErrorTerms: {
    borderBottomColor: "#FF3B30",
  },
});

export default styles;