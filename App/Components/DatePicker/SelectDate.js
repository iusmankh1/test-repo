import React from "react";
import { View } from "react-native";
import { Text2 } from "../TextComponent/TextComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import moment from "moment";
import { useEffect } from "react";

const SelectDate = ({
  headingText,
  selectedDate,
  handleDateChange,
  handleCancel,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [customDate, setCustomDate] = React.useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const convertDateFormat = (date) => {
    if(date.date == "") return "";
    date = date.date;
    let formattedDate = moment(date).format("YYYY-MM-DD");
    return formattedDate;
};

  const handleConfirm = (date) => {
    handleDateChange(date);
    setCustomDate(convertDateFormat(date));
    hideDatePicker();
  };

  useEffect(() => {
    setCustomDate(selectedDate);
  }, [selectedDate]);

  return (
    <View style={{ paddingHorizontal: wp("6") }}>
      <Text2>{headingText}</Text2>
      <Button onPress={showDatePicker}>{customDate ? customDate : "Select date"}</Button>
      <DatePickerModal
        visible={isDatePickerVisible}
        onDismiss={hideDatePicker}
        date={selectedDate ? selectedDate.date : undefined}
        onConfirm={handleConfirm}
        label="Select date"
        mode="single"
        inputFormat="YYYY-MM-DD"
      />
    </View>
  );
};

export default SelectDate;
