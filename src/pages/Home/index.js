import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
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
import {Spinner} from '../../utils';
const currencyFormatter = require('currency-formatter');

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [loading, setloading] = useState(false);
  const cartReducer = useSelector((state) => state.cartReducer.cart);
  const [pilihanMeja, setpilihanMeja] = useState('');
  const user = global.dataUser.user;
  const [dataItem, setdataItem] = useState([]);
  const [dataCartLoad, setdataCartLoad] = useState([]);
  const [cartExit, setcartExit] = useState(false);
  const meja = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ];

  function didAddItem(item) {
    setloading(true);
    const data = {
      cart: [
        {
          ...item,
          bayar: 'waiting',
          meja: pilihanMeja,
        },
      ],
      totalQty: item.qty,
      priceTotal: item.price,
    };

    if (cartExit) {
      firestore()
        .collection('cart')
        .doc(user.uid)
        .set({
          cart: [...dataCartLoad.cart, item],
          priceTotal: parseInt(dataCartLoad.priceTotal) + parseInt(item.price),
          totalQty: parseInt(dataCartLoad.totalQty) + 1,
        })
        .then(() => {
          setloading(false);
          alert(`${item.nama} sudah ditambahkan ke keranjang`);
        });
    } else {
      if (pilihanMeja != '') {
        firestore()
          .collection('cart')
          .doc(user.uid)
          .set(data)
          .then(() => {
            setloading(false);
            alert(`${item.nama} sudah ditambahkan ke keranjang`);
          });
      } else {
        setloading(false);
        alert('pilih meja anda');
      }
    }
  }

  useEffect(() => {
    setloading(true);
    firestore()
      .collection('product')
      .onSnapshot((querySnapshot) => {
        firestore()
          .collection('cart')
          .doc(user.uid)
          .onSnapshot((result) => {
            setloading(false);
            setcartExit(result.exists);
            if (result.data()) {
              const cartDetail = result.data();
              setdataCartLoad(cartDetail);
            }
          });
        const item = querySnapshot.docs.map((documentSnapshot) => {
          return {
            idproduct: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
        });
        setdataItem(item);
      });

    return () => {
      null;
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
      <Spinner loading={loading} />
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
              {item.picture == null || undefined ? (
                <Icon
                  name={'user'}
                  size={wp('6.5%')}
                  color={colors.darkGray}
                  solid
                />
              ) : (
                <Image
                  style={{
                    height: wp('40%'),
                    width: wp('40%'),
                    borderRadius: 10,
                  }}
                  source={{uri: `${item.picture}`}}
                />
              )}
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
                <Text style={styles.textBoldWhiteMediumCenter}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
