import axios from "axios";
import { ProductProps } from "../model";
export const GetProducts = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "PRODUCTS_LOADING",
    });
    const res = await axios.get(
      `https://test.ejam.com/api/recruitment/frontendtask1/products`
    );

    dispatch({
      type: "PRODUCTS_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "PRODUCTS_FAIL",
    });
  }
};

export const GetCart = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "CART_LOADING",
    });

    const res = JSON.parse(localStorage.getItem("cart") as string);

    dispatch({
      type: "CART_SUCCESS",
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: "CART_FAIL",
    });
  }
};
