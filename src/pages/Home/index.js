import React, {useEffect, useState} from 'react';
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

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const cartReducer = useSelector((state) => state.cartReducer.cart);
  const user = global.dataUser;
  const [dataItem, setdataItem] = useState([]);
  let [idProduct, setidProduct] = useState('');
  const [selectedValue, setSelectedValue] = useState('java');
  const meja = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ];

  function didAddItem(item) {
    firestore()
      .collection('cart')
      .doc(item.idproduct)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.data() != null) {
          firestore()
            .collection('cart')
            .doc(querySnapshot.data().idproduct)
            .update({
              qty: parseInt(item.qty) + 1,
              price: parseInt(item.price) * (parseInt(item.qty) + 1),
            })
            .then(() => {
              console.log('User updated!');
            });
        } else {
          const data = {
            ...item,
            bayar: 'waiting',
          };
          firestore()
            .collection('cart')
            .doc(item.idproduct)
            .set(data)
            .then((result) => {
              console.log('data sukses ditambahkan');
            });
        }
      });
  }

  function didPlusItem(item) {
    dispatch({
      type: cartAction.PLUSCART,
      value: {...item, qty: item.qty + 1},
    });
  }

  useEffect(() => {
    const unsubscribe = firestore()
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

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TopBar
        component2={
          <TouchableOpacity>
            <Text style={styles.textBoldWhite}>Home</Text>
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
              <Text style={styles.textWhiteCenter}>{item.price}</Text>
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
