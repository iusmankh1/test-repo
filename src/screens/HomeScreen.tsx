import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, DrawerNavigationProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type DrawerParamList = {
  HomeStack: undefined;
  SettingsStack: undefined;
};

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.description}>Welcome to the React Native Drawer Navigation Test</Text>
      <Button 
        title="Open Drawer" 
        onPress={() => navigation.openDrawer()} 
      />
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate('Details')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen; 