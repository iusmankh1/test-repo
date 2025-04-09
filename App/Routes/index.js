import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VehicleDetails from '../Screens/AddManualData/VehicleDetails/VehicleDetails';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';

import React from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {connect} from 'react-redux';
import Customers from '../Screens/Customer/Customers';
import AddCustomer from '../Screens/Customer/AddCustomer';
import CustomerStack from './CustomerStack';
const Tab = createBottomTabNavigator();

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: true,
    };
  }

  render() {
    return this.props.accessToken == null ? (
      <AuthStack />
    ) : (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={AppStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Listings"
          component={AppStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Customers"
          component={CustomerStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.authReducer.uid,
    accessToken: state.authReducer.accessToken,
  };
};

export default connect(mapStateToProps, null)(Router);
