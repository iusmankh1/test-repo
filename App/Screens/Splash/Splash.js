import React from 'react';
import {mainBlue} from '../../Assets/colors/colors';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

const Splash = props => {
  const {navigation} = props;
  // useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: mainBlue}}>
      
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width:"100%", alignItems:"center", width: "100%",}}>
          
            <Image style={{
                width: 120,
                height:80,}}
                source={require('../../Assets/images/Car.png')}
                >
            </Image>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
            <Image 
            style={{
                width: 300,
                height: 80,}}
                source={require('../../Assets/images/title_logo.png')}
                resizeMode={'contain'}
                >
            </Image>
            </TouchableOpacity>
        </View>
      </View>
    
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default Splash;
