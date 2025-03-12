import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, Text } from 'react-native';
import HomeStack from './StackNavigator';
import SettingsStack from './SettingsStackNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('window').width * 0.75,
          backgroundColor: '#fff',
        },
        headerShown: false,
        drawerActiveTintColor: '#2196F3',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="SettingsStack" 
        component={SettingsStack} 
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>⚙️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 