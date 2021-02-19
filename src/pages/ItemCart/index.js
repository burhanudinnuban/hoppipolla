import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
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
import {Spinner} from '../../utils';
const currencyFormatter = require('currency-formatter');

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const [loading, setloading] = useState(false);
  const user = global.dataUser.user;
  const [dataItem, setdataItem] = useState([]);
  const [itemDetail, setitemDetail] = useState([]);
  const [resultExist, setresultExist] = useState(false);
  const [result1, setresult] = useState([]);
  const [exist, setexist] = useState(false);

  function didAddItem() {
    setloading(true);
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    if (resultExist) {
      firestore()
        .collection('history')
        .doc(user.uid)
        .set({
          data: [
            {
              ...itemDetail,
              timestamp: `${date}/${month}/${year}`,
              status_payment: 'success',
            },
            ...result1,
          ],
        })
        .then(() => {
          firestore()
            .collection('cart')
            .doc(user.uid)
            .delete()
            .then(() => {
              setloading(false);
              setdataItem([]);
              setitemDetail([]);
            });
        });
    } else {
      firestore()
        .collection('history')
        .doc(user.uid)
        .set({
          data: [
            {
              dataItem: [...dataItem],
              status_payment: 'success',
              timestamp: `${date}/${month}/${year}`,
              priceTotal: itemDetail.priceTotal,
              totalQty: itemDetail.totalQty,
            },
          ],
        })
        .then(() => {
          firestore()
            .collection('cart')
            .doc(user.uid)
            .delete()
            .then(() => {
              setloading(false);
              setdataItem([]);
              setitemDetail([]);
            });
        });
    }
  }

  function didPlusItem(item) {
    setloading(true);
    const indexUpdate = dataItem.findIndex(
      (items) => items.idproduct == item.idproduct,
    );
    let newCartUpdate = dataItem;
    newCartUpdate[indexUpdate].qty = parseInt(dataItem[indexUpdate].qty) + 1;
    firestore()
      .collection('cart')
      .doc(user.uid)
      .set(
        {
          cart: [...newCartUpdate],
          priceTotal:
            parseInt(itemDetail.priceTotal) +
            parseInt(dataItem[indexUpdate].price),
          totalQty: parseInt(itemDetail.totalQty) + 1,
        },
        {merge: true},
      )
      .then(() => {
        setloading(false);
      });
  }

  function didMinItem() {
    setloading(true);

    firestore()
      .collection('cart')
      .doc(user.uid)
      .delete()
      .then(() => {
        setloading(false);
        setdataItem([]);
        setitemDetail([]);
      });
    // if (item.qty > 0) {
    //   firestore()
    //     .collection('cart')
    //     .doc(user.uid)
    //     .set(
    //       {
    //         cart: [...newCartUpdate],
    //         priceTotal:
    //           parseInt(itemDetail.priceTotal) -
    //           parseInt(dataItem[indexUpdate].price),
    //         totalQty: parseInt(itemDetail.totalQty) - 1,
    //       },
    //       {merge: true},
    //     )
    //     .then(() => {
    //       setloading(false);
    //     });
    // }
    // if (item.qty < 2) {
    //   firestore()
    //     .collection('cart')
    //     .doc(user.uid)
    //     .update({
    //       cart: firestore.FieldValue.arrayRemove(item.idproduct),
    //     })
    //     .then(() => {
    //       firestore()
    //         .collection('cart')
    //         .doc(user.uid)
    //         .set(
    //           {
    //             priceTotal:
    //               parseInt(itemDetail.priceTotal) -
    //               parseInt(dataItem[indexUpdate].price),
    //             totalQty: parseInt(itemDetail.totalQty) - 1,
    //           },
    //           {merge: true},
    //         )
    //         .then(() => {
    //           setloading(false);
    //         });

    //       setloading(false);
    //     });
    // }
  }

  useEffect(() => {
    firestore()
      .collection('cart')
      .doc(user.uid)
      .onSnapshot((result) => {
        setexist(result.exists);
        if (result.data()) {
          const cart = result.data().cart;
          const cartDetail = result.data();
          setdataItem(cart);
          setitemDetail(cartDetail);
        }
      });

    firestore()
      .collection('history')
      .doc(user.uid)
      .onSnapshot((result) => {
        setresultExist(result.exists);
        if (result.data()) {
          const cartDetail = result.data().data;
          setresult(cartDetail);
        }
      });
    return () => {
      null;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Spinner loading={loading} />
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
              {item.picture == '' ? (
                <Icon
                  name={'user'}
                  size={wp('6.5%')}
                  color={colors.darkGray}
                  solid
                />
              ) : (
                <Image
                  style={{
                    height: wp('20%'),
                    width: wp('20%'),
                    borderRadius: 10,
                  }}
                  source={{uri: `${item.picture}`}}
                />
              )}
            </View>
            <Gap width={10} />
            <View style={styles.containerNoneLeftProduct}>
              <Text style={styles.textBoldWhiteMediumCenter}>{item.nama}</Text>
              <Text style={styles.textWhiteCenter}>
                {currencyFormatter.format(item.price, {
                  locale: 'id-ID',
                })}
              </Text>
              <Text style={styles.textWhiteCenter}>{item.desc}</Text>
              <Gap height={5} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.containerNoneRow}>
                {/* <TouchableOpacity onPress={() => didMinItem(item)}>
                  <Icon
                    name={'minus-circle'}
                    size={20}
                    color={colors.white}
                    brand
                  />
                </TouchableOpacity> */}
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
            </View>
          </TouchableOpacity>
        )}
      />
      {exist ? (
        <View style={styles.containerNoneCenter}>
          <Text style={styles.textBoldWhiteLarge}>
            {currencyFormatter.format(itemDetail.priceTotal, {
              locale: 'id-ID',
            })}
          </Text>
          <Text style={styles.textBoldWhiteMediumCenter}>
            Total Item = {itemDetail.totalQty}
          </Text>
          <Gap height={10} />

          <TouchableOpacity onPress={() => didMinItem()}>
            <Icon name={'trash'} size={30} color={colors.redDark} brand />
          </TouchableOpacity>
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => didAddItem()}
            style={styles.buttonSolid}>
            <View style={styles.containerNoneRow}>
              <Text style={styles.textBoldWhiteMediumCenter}>Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.textBoldWhiteLarge}>Data cart kosong</Text>
      )}

      <Gap height={10} />
    </View>
  );
};

export default History;
