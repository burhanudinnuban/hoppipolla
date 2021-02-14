import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);
  const [email, setemail] = useState('');
  const [nama, setnama] = useState('');
  const [password, setpassword] = useState('');
  const [photo, setphoto] = useState('');
  const [hide, sethide] = useState(true);

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

  async function didUpdateProfile() {
    const update = {
      displayName: nama,
      photoURL: photo,
    };

    auth()
      .currentUser.updateProfile(update)
      .then(() => {
        auth().onAuthStateChanged(() => {
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
        });
      });
  }

  function didRegister() {
    didLoadTrue();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        didUpdateProfile(result);
      })
      .catch((error) => {
        didLoadFalse();
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
      });
  }

  function didLogin() {
    navigation.replace('Login');
  }
  return (
    <View style={styles.container}>
      <Spinner loading={loading} />
      <KeyboardAwareScrollView>
        <View style={styles.containerNoneCenter}>
          <Gap height={20} />
          <TouchableOpacity>
            <Icon
              name={'user-circle'}
              size={wp('25%')}
              color={colors.primary}
              solid
            />
            <View style={styles.containerAddPhotoIcon}>
              <Icon
                name={'plus-circle'}
                size={wp('8%')}
                color={colors.white}
                solid
              />
            </View>
          </TouchableOpacity>
          <Gap height={20} />
          <Text style={styles.textBoldWhiteLarge}>REGISTER</Text>
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
            label={'Nama Lengkap'}
            value={nama}
            onChangeText={(text) => setnama(text)}
            iconLeft={
              <Icon
                name={'user'}
                size={wp('5%')}
                color={colors.primary}
                solid
              />
            }
            placeholder={'masukkan nama lengkap anda'}
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
            onPress={() => didRegister()}
            style={styles.buttonSolidSecondary}>
            <Text style={styles.textBoldWhite}>Register</Text>
          </TouchableOpacity>
          <Gap height={10} />
          <View style={styles.containerNoneRow}>
            <Text style={styles.textWhite}>sudah punya akun?</Text>
            <Gap width={20} />
            <TouchableOpacity
              onPress={() => didLogin()}
              style={styles.buttonSolidMedium}>
              <Text style={styles.textWhite}>Login sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;
