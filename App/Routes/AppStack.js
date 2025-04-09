import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Splash from '../Screens/Splash/Splash';
import Home from '../Screens/Home/Home';
import VehicleDetails from '../Screens/AddManualData/VehicleDetails/VehicleDetails';
import VehicleDescription from '../Screens/AddManualData/VehicleDescription/VehicleDescription';
import {createStackNavigator} from '@react-navigation/stack';
import CarDetail from '../Screens/CarDetail/CarDetail';
import FeaturesAndOptions from '../Screens/AddManualData/FeatureAndOptions/FeaturesAndOptions';
import WebsiteDisplay from '../Screens/AddManualData/WebsiteDisplay/WebsiteDisplay';
import AddPhotos from '../Screens/AddManualData/Photos/AddPhotos';
import BarcodeScannerScreen from '../Screens/BarcodeScann/BarcodeScanner';
import Inquiry from '../Screens/Inquiry/Inquiry';
import AddCustomer from '../Screens/Customer/AddCustomer';
import Customers from '../Screens/Customer/Customers';
import CustomerDetail from '../Screens/Customer/CustomerDetail';
// import NewBarcodeScanner from '../Screens/BarcodeScann/NewBarcodeScanner';
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      <Stack.Screen name="FeaturesAndOptions" component={FeaturesAndOptions} />
      <Stack.Screen name="VehicleDescription" component={VehicleDescription} />
      <Stack.Screen name="WebsiteDisplay" component={WebsiteDisplay} />
      <Stack.Screen name="CarDetail" component={CarDetail} />
      <Stack.Screen name="AddPhotos" component={AddPhotos} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
      <Stack.Screen name="Inquiry" component={Inquiry} />
    </Stack.Navigator>
  );
};

export default AppStack;
