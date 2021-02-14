import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  containerInputText: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 2,
    width: wp('75%'),
    height: hp('5%'),
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  InputText: {
    width: wp('55%'),
    height: hp('5%'),
    color: colors.white,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNoneCenter: {
    flex: 1,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNoneCenterProduct: {
    flex: 1,
    alignItems: 'center',
  },
  containerNoneLeftProduct: {
    flex: 1,
    alignItems: 'flex-start',
  },
  containerNoneRowBottom: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: hp('5%'),
    alignItems: 'center',
  },
  containerNoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerTopBar: {
    width: wp('100%'),
    height: hp('7.5%'),
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerTopBarComponent1: {flex: 1, alignItems: 'center'},
  containerTopBarComponent2: {flex: 3, alignItems: 'center'},
  containerTopBarComponent3: {flex: 1, alignItems: 'center'},
  containerComponentLeftRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  textWhite: {
    color: colors.white,
    maxWidth: wp('75%'),
  },
  textPrimary: {
    color: colors.primary,
    maxWidth: wp('75%'),
  },
  textWhiteCenter: {
    color: colors.white,
    maxWidth: wp('75%'),
    textAlign: 'center',
  },
  textBoldWhite: {
    color: colors.white,
    fontWeight: 'bold',
  },
  textBoldBlue: {
    color: colors.blue,
    fontWeight: 'bold',
  },
  textBoldWhiteLarge: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: wp('7%'),
  },
  textBoldWhiteMediumCenter: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  textBoldRed: {
    color: colors.redDark,
    fontWeight: 'bold',
  },
  textBoldRedMedium: {
    color: colors.redDark,
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  buttonOutlineSmall: {
    borderRadius: 15,
    borderWidth: 2,
    width: wp('20%'),
    height: hp('3.5%'),
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonOutlineMedium: {
    borderRadius: 15,
    borderWidth: 2,
    width: wp('30%'),
    height: hp('4%'),
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonSolidMedium: {
    borderRadius: 15,
    backgroundColor: colors.blue,
    width: wp('30%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonSolidMediumSecondary: {
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    width: wp('30%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonSolid: {
    borderRadius: 15,
    width: wp('75%'),
    height: hp('5%'),
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  listProduct: {
    width: wp('40%'),
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    margin: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },
  listCart: {
    flexDirection: 'row',
    width: wp('100%'),
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingRight: 10,
  },
  buttonSolidSecondary: {
    borderRadius: 15,
    width: wp('75%'),
    height: hp('5%'),
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  containerAddPhotoIcon: {position: 'absolute', bottom: 0, right: 0},
});
