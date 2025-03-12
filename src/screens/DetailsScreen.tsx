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

type DetailsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Details'>,
  DrawerNavigationProp<DrawerParamList>
>;

const DetailsScreen = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.description}>This is the details screen of the application.</Text>
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
      <Button 
        title="Open Drawer" 
        onPress={() => navigation.openDrawer()} 
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

export default DetailsScreen; 