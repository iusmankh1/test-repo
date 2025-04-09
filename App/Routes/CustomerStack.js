import React, {useEffect} from 'react';
import Splash from '../Screens/Splash/Splash';
import {createStackNavigator} from '@react-navigation/stack';
import AddCustomer from '../Screens/Customer/AddCustomer';
import Customers from '../Screens/Customer/Customers';
import CustomerDetail from '../Screens/Customer/CustomerDetail';
import PictureClickerScreen from '../Screens/PictureClick/PictureClicker';
import LoanerAuthorizationForm from '../Screens/LoanAuthorizationForm/LoanerAuthorizationForm';
const Stack = createStackNavigator();
const CustomerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Customers"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="LoanerAuthorizationForm" component={LoanerAuthorizationForm} />
      <Stack.Screen name="Customers" component={Customers} />
      <Stack.Screen name="Add Customer" component={AddCustomer} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
      <Stack.Screen name="PictureClicker" component={PictureClickerScreen} />
    </Stack.Navigator>
  );
};

export default CustomerStack;
