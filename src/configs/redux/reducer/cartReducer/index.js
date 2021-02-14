import {cartAction} from '../../../../constants/values';

const initialStateRoot = {
  cart: [],
  totalPrice: 0,
};

const cartReducer = (state = initialStateRoot, action) => {
  switch (action.type) {
    case cartAction.ADDCART:
      return {
        ...state,
        cart: [action.value, ...state.cart],
      };
    case cartAction.PLUSCART:
      const indexUpdate = state.cart.findIndex(
        (item) => item.idproduct == action.value[0].idproduct,
      );
      let newCartUpdate = state.cart;
      newCartUpdate[indexUpdate].qty = action.value[0].qty;
      return {
        ...state,
        cart: [...newCartUpdate],
      };
    case cartAction.MINCART:
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

export default cartReducer;
