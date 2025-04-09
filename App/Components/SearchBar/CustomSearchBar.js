import * as React from "react";
import { View, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Svg, { Path } from "react-native-svg";

const SearchIcon = ({ color = "#19191a", size = 15 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClearIcon = ({ color = "#19191a", size = 15 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 6L18 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: (darkMode) => ({
    height: 40,
    width: "90%",
    borderRadius: 12,
    backgroundColor: darkMode ? "#19191a" : "#fdfdfd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
  }),
  textInputStyle: (darkMode) => ({
    width: "80%",
    color: darkMode ? "#fdfdfd" : "#19191a",
    paddingLeft: 8,
    paddingRight: 8,
  }),
  spinnerContainer: {
    marginLeft: 8,
  },
  searchContainer: {
    marginLeft: 8,
  },
  clearIconContainer: {
    marginRight: 8,
  },
});

export default class CustomSearchBar extends React.Component {
  inputRef = null;

  handleSearchBarPress = () => {
    this.inputRef?.focus();
    this.props.onPress && this.props.onPress();
  };

  handleOnClearPress = () => {
    this.inputRef?.clear();
    this.props.onClearPress && this.props.onClearPress();
  };

  renderSpinner = () => {
    const {
      darkMode = false,
      spinnerSize = 15,
      spinnerColor = darkMode ? "#fdfdfd" : "#19191a",
      spinnerVisibility = false,
    } = this.props;

    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          size={spinnerSize}
          color={spinnerColor}
          animating={spinnerVisibility}
        />
      </View>
    );
  };

  renderSearchIcon = () => {
    const {
      onSearchPress,
      darkMode = false,
      searchIconComponent,
    } = this.props;

    return (
      <RNBounceable style={styles.searchContainer} onPress={onSearchPress}>
        {searchIconComponent || (
          <SearchIcon color={darkMode ? "#fdfdfd" : "#19191a"} />
        )}
      </RNBounceable>
    );
  };

  renderTextInput = () => {
    const {
      onBlur,
      onFocus,
      textInputStyle,
      darkMode = false,
      placeholder = "Search here...",
      placeholderTextColor,
    } = this.props;

    let _placeholderTextColor = placeholderTextColor;
    if (!placeholderTextColor) {
      _placeholderTextColor = darkMode ? "#fdfdfd" : "#19191a";
    }

    return (
      <TextInput
        placeholderTextColor={_placeholderTextColor}
        {...this.props}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={(ref) => (this.inputRef = ref)}
        style={[styles.textInputStyle(darkMode), textInputStyle]}
        placeholder={placeholder}
      />
    );
  };

  renderClearIcon = () => {
    const {
      darkMode = false,
      clearIconComponent,
    } = this.props;

    return (
      <RNBounceable
        bounceEffect={0.8}
        style={styles.clearIconContainer}
        onPress={this.handleOnClearPress}
      >
        {clearIconComponent || (
          <ClearIcon color={darkMode ? "#fdfdfd" : "#19191a"} />
        )}
      </RNBounceable>
    );
  };

  render() {
    const { style, darkMode = false, spinnerVisibility } = this.props;

    return (
      <RNBounceable
        {...this.props}
        bounceEffect={0.97}
        style={[styles.container(darkMode), style]}
        onPress={this.handleSearchBarPress}
      >
        {spinnerVisibility ? this.renderSpinner() : this.renderSearchIcon()}
        {this.renderTextInput()}
        {this.renderClearIcon()}
      </RNBounceable>
    );
  }
} 