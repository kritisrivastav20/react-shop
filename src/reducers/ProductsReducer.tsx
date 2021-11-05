const DefaultState = {
  loading: false,
  data: {},
  errorMsg: "",
};

const ProductsReducer = (state = DefaultState, action: any) => {
  switch (action.type) {
    case "PRODUCTS_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "PRODUCTS_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "unable to find PRODUCTS",
      };
    case "PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMsg: "",
        data: {
          ...state.data,
          [action.products]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default ProductsReducer;
