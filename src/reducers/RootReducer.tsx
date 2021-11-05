import { combineReducers } from "redux";
import ProductsReducer from "./ProductsReducer";
import CartReducer from "./CartReducer";

const RootReducer = combineReducers({
  Products: ProductsReducer,
  Cart: CartReducer,
});

export default RootReducer;
