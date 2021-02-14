import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../../configs/styles';
import {Gap, TextInput} from '../../components';
import auth from '@react-native-firebase/auth';
import {reducer} from '../../constants/values';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner} from '../../utils';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hide, sethide] = useState(true);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);

  function didLoadFalse() {
    setdisable(false);
    setloading(false);
  }

  function didLoadTrue() {
    setdisable(true);
    setloading(true);
  }

  function didShowHide() {
    sethide(!hide);
  }

  function didLogin() {
    didLoadTrue();
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user.email;
        if (user == 'admin@gmail.com') {
          didLoadFalse();
          dispatch({type: reducer.DATAUSER, value: result});
          dispatch({type: reducer.ISLOGIN, value: true});
          navigation.replace('AdminApp');
        } else {
          didLoadFalse();
          dispatch({type: reducer.DATAUSER, value: result});
          dispatch({type: reducer.ISLOGIN, value: true});
          navigation.replace('MainApp');
        }
      })
      .catch((e) => {
        const error = e.code;
        alert(error);
        didLoadFalse();
      });
  }

  function didRegister() {
    navigation.replace('Register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner loading={loading} />
      <KeyboardAwareScrollView>
        <View style={styles.containerNoneCenter}>
          <Gap height={20} />
          <Image
            style={{width: wp('70%'), height: wp('80%')}}
            source={require(`../../assets/images/launcher_logo.png`)}
          />
          <Gap height={20} />
          <TextInput
            label={'Email'}
            value={email}
            onChangeText={(text) => setemail(text)}
            iconLeft={
              <Icon
                name={'envelope'}
                size={wp('5%')}
                color={colors.primary}
                solid
              />
            }
            placeholder={'masukkan alamat email anda'}
            placeholderTextColor={colors.primary}
          />
          <Gap height={10} />
          <TextInput
            label={'Password'}
            value={password}
            secureTextEntry={hide}
            onChangeText={(text) => setpassword(text)}
            iconLeft={
              <Icon
                name={'lock'}
                size={wp('5%')}
                color={colors.primary}
                solid
              />
            }
            placeholder={'masukkan password anda'}
            placeholderTextColor={colors.primary}
            iconRight={
              <TouchableOpacity onPress={() => didShowHide()}>
                {hide ? (
                  <Icon name={'eye'} size={wp('5%')} color={colors.white} />
                ) : (
                  <Icon
                    name={'eye-slash'}
                    size={wp('5%')}
                    color={colors.white}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <Gap height={20} />
          <TouchableOpacity
            disabled={disable}
            onPress={() => didLogin()}
            style={styles.buttonSolid}>
            <Text style={styles.textBoldWhite}>Login</Text>
          </TouchableOpacity>
          <Gap height={10} />
          <View style={styles.containerNoneRow}>
            <Text style={{color: colors.white}}>belum punya akun?</Text>
            <Gap width={20} />
            <TouchableOpacity
              onPress={() => didRegister()}
              style={styles.buttonSolidMediumSecondary}>
              <Text style={styles.textWhite}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={10} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
