import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { useNavigation, DrawerNavigationProp } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingsStackParamList = {
  Settings: undefined;
};

type DrawerParamList = {
  HomeStack: undefined;
  SettingsStack: undefined;
};

type SettingsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsStackParamList, 'Settings'>,
  DrawerNavigationProp<DrawerParamList>
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
        />
      </View>
      
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen; 