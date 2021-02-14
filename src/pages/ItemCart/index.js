import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Gap, TopBar} from '../../components';
import {styles} from '../../configs/styles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../../constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {cartAction} from '../../constants/values';
import firestore from '@react-native-firebase/firestore';
const currencyFormatter = require('currency-formatter');

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const cartReducer = useSelector((state) => state.cartReducer.cart);
  const user = global.dataUser;
  const [dataItem, setdataItem] = useState([]);

  function didAddItem(item) {
    const data = {
      ...item,
      bayar: 'success',
    };
    firestore()
      .collection('history')
      .doc(item.idproduct)
      .set(data)
      .then(() => {
        firestore()
          .collection('cart')
          .doc(item.idproduct)
          .delete()
          .then(() => {
            console.log('User deleted!');
          });
      });
  }

  function didPlusItem(item) {
    firestore()
      .collection('cart')
      .doc(item.idproduct)
      .update({
        qty: parseInt(item.qty) + 1,
        price: parseInt(item.price),
        priceTotal: parseInt(item.price) * (parseInt(item.qty) + 1),
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  function didMinItem(item) {
    if (item.qty <= 1) {
      firestore()
        .collection('cart')
        .doc(item.idproduct)
        .delete()
        .then(() => {
          console.log('User deleted!');
        });
    } else if (item.qty != 1) {
      firestore()
        .collection('cart')
        .doc(item.idproduct)
        .update({
          qty: parseInt(item.qty) - 1,
          price: parseInt(item.price),
          priceTotal: parseInt(item.price) * (parseInt(item.qty) - 1),
        })
        .then(() => {
          console.log('User updated!');
        });
    }
  }

  useEffect(() => {
    const getItem = firestore()
      .collection('cart')
      .onSnapshot((querySnapshot) => {
        const item = querySnapshot.docs.map((documentSnapshot) => {
          return {
            idproduct: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
        });
        setdataItem(item);
      });
    return () => {
      getItem();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TopBar
        component2={
          <TouchableOpacity>
            <Text style={styles.textBoldWhiteMediumCenter}>Cart</Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={dataItem}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listCart}>
            <View
              style={{
                height: wp('20%'),
                width: wp('20%'),
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Icon
                name={'user'}
                size={wp('6.5%')}
                color={colors.darkGray}
                solid
              />
            </View>
            <Gap width={10} />
            <View style={styles.containerNoneLeftProduct}>
              <Text style={styles.textBoldWhiteMediumCenter}>{item.nama}</Text>
              <Text style={styles.textWhiteCenter}>
                {currencyFormatter.format(item.priceTotal, {
                  locale: 'id-ID',
                })}
              </Text>
              <Text style={styles.textWhiteCenter}>{item.desc}</Text>
              <Gap height={5} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.containerNoneRow}>
                <TouchableOpacity onPress={() => didMinItem(item)}>
                  <Icon
                    name={'minus-circle'}
                    size={20}
                    color={colors.white}
                    brand
                  />
                </TouchableOpacity>
                <Gap width={15} />
                <Text style={styles.textWhite}>{item.qty}</Text>
                <Gap width={15} />
                <TouchableOpacity onPress={() => didPlusItem(item)}>
                  <Icon
                    name={'plus-circle'}
                    size={20}
                    color={colors.white}
                    brand
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textBoldWhite}>meja = {item.meja}</Text>
              <Gap height={10} />
              {item.bayar != 'success' ? (
                <TouchableOpacity
                  onPress={() => didAddItem(item)}
                  style={styles.buttonSolidMedium}>
                  <Text style={styles.textBoldWhiteMediumCenter}>Bayar</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.textPrimary}>{item.bayar}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default History;
