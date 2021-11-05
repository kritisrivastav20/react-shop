import { useState } from "react";
import { ProductProps } from "../model";
import "./styles.css";
import { XCircle } from "react-feather";
import { Link } from "react-router-dom";

function Cart({ products, setCart }: ProductProps) {
  const [page, openPage] = useState(false);

  const handleChange = () => {
    page === false ? openPage(true) : openPage(false);
  };

  const clist = products.map((list, idx) => (
    <div className="cart-container" key={idx}>
      <img src={list.imageUrl} alt="item" />
      <div>
        <span className="item-name">{list.name}</span> <br />
        <span className="item-desc">{list.description}</span> <br />
        <span className="item-price">
          Price: ${list.price} | Qty: {list.quantity}
        </span>
      </div>
    </div>
  ));

  return (
    <div className="cart">
      {clist}
      <Link className="link" to="/checkout">
        Checkout
      </Link>
      <XCircle className="close-icon" onClick={() => setCart(false)} />
    </div>
  );
}

export default Cart;
