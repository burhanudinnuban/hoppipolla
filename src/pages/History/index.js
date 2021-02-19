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
  const [dataDetail, setdataDetail] = useState();
  const global = useSelector((state) => state.global);
  const user = global.dataUser.user;

  useEffect(() => {
    firestore()
      .collection('history')
      .doc(user.uid)
      .onSnapshot((result) => {
        if (result.data()) {
          const cartDetail = result.data().data;
          setdataDetail(cartDetail);
        }
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
            <Text style={styles.textBoldWhiteMediumCenter}>History</Text>
          </TouchableOpacity>
        }
      />
      {dataDetail != null || undefined ? (
        <FlatList
          data={dataDetail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.listHistory}>
              <Text style={styles.textBoldRed}>{item.timestamp}</Text>
              <Text style={styles.textBoldBlack}>QTY = {item.totalQty}</Text>
              <Text style={styles.textBoldBlack}>
                TOTAL ={' '}
                {currencyFormatter.format(item.priceTotal, {
                  locale: 'id-ID',
                })}
              </Text>
              <Text style={styles.textBoldGreen}>
                status Payment {item.status_payment}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.textBoldWhiteLarge}>Data History Kosong</Text>
      )}
    </View>
  );
};

export default History;
