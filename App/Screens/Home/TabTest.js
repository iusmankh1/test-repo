import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';

const Tab = createBottomTabNavigator();


<Tab.Navigator>
<Tab.Screen name="Home" component={Home} />
<Tab.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
</Tab.Navigator>