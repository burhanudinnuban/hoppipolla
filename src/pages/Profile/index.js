import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TopBar} from '../../components';
import {styles} from '../../configs/styles';
import {useSelector, useDispatch} from 'react-redux';
import {reducer} from '../../constants/values';
import auth from '@react-native-firebase/auth';
import {Spinner} from '../../utils';
import {Gap, TextInput} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const disable = global.disable;
  const user = global.dataUser.user;

  useEffect(() => {
    return () => {};
  }, []);

  function didLogout() {
    navigation.replace('Login');

    // dispatch({type: reducer.LOADING, value: true});
    // auth()
    //   .signOut()
    //   .then(() => {
    //     navigation.replace('Login');
    //     dispatch({type: reducer.ISLOGIN, value: false});
    //     dispatch({type: reducer.LOADING, value: false});
    //   })
    //   .catch((e) => {
    //     dispatch({type: reducer.LOADING, value: false});
    //     alert('signal is problem');
    //   });
  }

  return (
    <View style={styles.container}>
      <Spinner />
      <TopBar
        component1={<TouchableOpacity></TouchableOpacity>}
        component2={
          <TouchableOpacity>
            <Text style={styles.textBoldWhiteMediumCenter}>Profile</Text>
          </TouchableOpacity>
        }
        component3={
          <TouchableOpacity disabled={disable} onPress={() => didLogout()}>
            <Text style={styles.textBoldRed}>Logout</Text>
          </TouchableOpacity>
        }
      />
      <TextInput
        // label={'Email'}
        value={user.displayName}
        iconLeft={
          <Icon name={'user'} size={wp('5%')} color={colors.primary} solid />
        }
        placeholder={'masukkan alamat email anda'}
        placeholderTextColor={colors.primary}
      />

      <TextInput
        // label={'Email'}
        value={user.photoURL}
        iconLeft={
          <Icon name={'phone'} size={wp('5%')} color={colors.primary} solid />
        }
        placeholder={'masukkan alamat email anda'}
        placeholderTextColor={colors.primary}
      />

      <TextInput
        // label={'Email'}
        value={user.email}
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
      {user.phoneNumber != null ? (
        <TextInput
          // label={'Email'}
          value={user.phoneNumber}
          iconLeft={
            <Icon name={'phone'} size={wp('5%')} color={colors.primary} solid />
          }
          placeholder={'masukkan alamat email anda'}
          placeholderTextColor={colors.primary}
        />
      ) : null}
    </View>
  );
};

export default Profile;
