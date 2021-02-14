import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Gap, TopBar} from '../../components';
import {styles} from '../../configs/styles';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {cartAction, reducer} from '../../constants/values';
import firestore from '@react-native-firebase/firestore';
const currencyFormatter = require('currency-formatter');

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const cartReducer = useSelector((state) => state.cartReducer.cart);
  const [pilihanMeja, setpilihanMeja] = useState('');
  const user = global.dataUser;
  const [dataItem, setdataItem] = useState([]);
  const meja = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ];

  function didAddItem(item) {
    const data = {
      ...item,
      bayar: 'waiting',
      meja: pilihanMeja,
      priceTotal: item.price,
    };

    if (pilihanMeja != '') {
      firestore()
        .collection('cart')
        .doc(item.idproduct)
        .set(data)
        .then((result) => {
          setpilihanMeja('');
          alert(`${item.nama} sudah ditambahkan ke keranjang`);
        });
    } else {
      alert('pilih meja anda');
    }
  }

  useEffect(() => {
    const getItem = firestore()
      .collection('product')
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
            <Text style={styles.textBoldWhiteMediumCenter}>Home</Text>
          </TouchableOpacity>
        }
      />
      <FlatList
        data={dataItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listProduct}>
            <View
              style={{
                height: wp('40%'),
                width: wp('40%'),
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
            <View style={styles.containerNoneCenterProduct}>
              <Text style={styles.textBoldWhiteMediumCenter}>{item.nama}</Text>
              <Text style={styles.textWhiteCenter}>
                {currencyFormatter.format(item.price, {
                  locale: 'id-ID',
                })}
              </Text>
              <Text style={styles.textWhiteCenter}>{item.desc}</Text>
              <Gap height={5} />
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <View style={styles.containerNoneRow}>
                  <Text style={styles.textBoldRed}>meja =</Text>
                  <Gap width={5} />
                  <TextInput
                    style={{
                      height: wp('10%'),
                      width: wp('20%'),
                      color: colors.black,
                      textAlign: 'center',
                    }}
                    value={pilihanMeja}
                    placeholder={'no.meja'}
                    onChangeText={(pilihmeja) => {
                      setpilihanMeja(pilihmeja);
                    }}
                    keyboardType={'number-pad'}
                  />
                  <Gap width={10} />
                  <Icon name={'sort'} size={20} color={colors.primary} brand />
                </View>
              </TouchableOpacity>
              <Gap height={5} />
              <TouchableOpacity
                onPress={() => didAddItem(item)}
                style={styles.buttonSolidMedium}>
                <Text style={styles.textBoldWhiteMediumCenter}>Pesan</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
