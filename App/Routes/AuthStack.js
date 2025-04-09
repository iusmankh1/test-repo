import React from 'react';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import Splash from '../Screens/Splash/Splash';
import Home from '../Screens/Home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import CarDetail from '../Screens/CarDetail/CarDetail';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
