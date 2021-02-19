import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../../configs/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const isLogIn = global.isLogIn;
  const isFirstLaunch = global.isFirstLaunch;

  useEffect(() => {
    setTimeout(() => {
      if (isFirstLaunch == false) {
        navigation.replace('OnBoarding');
      } else {
        if (isLogIn == false) {
          navigation.replace('Login');
        } else {
          navigation.replace('MainApp');
        }
      }
    }, 2500);
    return () => {};
  }, [isFirstLaunch, isLogIn, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerCenterWhite}>
        <Image
          style={{width: wp('80%'), height: wp('80%')}}
          source={require(`../../assets/images/launcher.png`)}
        />
        <Image
          style={{width: wp('80%'), height: wp('27%')}}
          source={require(`../../assets/images/logo_name.png`)}
        />
      </View>
    </View>
  );
};

export default Splash;
