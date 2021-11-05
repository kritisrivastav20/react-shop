const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const CartReducer = (state = DefaultState, action: any) => {
  switch (action.type) {
    case "CART_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "CART_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "unable to get pokemon",
      };
    case "CART_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default CartReducer;
