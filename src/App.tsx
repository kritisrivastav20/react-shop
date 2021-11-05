import { Component } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Products from "./components/Products";
import { ShoppingCart } from "react-feather";

export default class App extends Component {
  state: any = {
    products: [],
    status: false,
    cart: [],
  };

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart) {
      let arr = this.state.cart;
      cart.forEach((element: any) => {
        if (element.quantity > 0) arr.push(element);
      });
      this.setState({
        cart: arr,
      });
    }
    this.fetchProducts();
  }

  fetchProducts() {
    return fetch(`https://test.ejam.com/api/recruitment/frontendtask1/products`)
      .then((res) => res.json())
      .then((response) => {
        let resp = response.products;
        this.setProducts(resp);
      });
  }

  setProducts(resp: any, action?: any) {
    if (action) {
      resp.forEach((element: any) => {
        if (!element.quantity || element.quantity == 1) element.quantity = 0;
      });
    }
    if (this.state.cart && this.state.cart.length > 0) {
      this.state.cart.forEach((element: any) => {
        let i = resp.findIndex((i: any) => i.id === element.id);
        if (i !== -1) {
          resp[i].quantity = element.quantity;
        }
      });
    }
    this.setState({
      products: resp,
    });
  }

  addToCart = (item: any, action?: string) => {
    let cartItems = this.state.cart;
    let index = this.state.cart.findIndex((i: any) => i.id === item.id);
    if (index === -1 && action === "add") {
      item.quantity = 1;
      cartItems = this.state.cart === 0 ? item : [...this.state.cart, item];
    } else {
      if (action === "remove" && item.quantity > 0 && index !== -1) {
        if (item.quantity == 1) {
          cartItems[index].quantity -= 1;
          cartItems.splice(index, 1);
          this.setState({
            cart: cartItems,
          });
          localStorage.setItem("cart", JSON.stringify(cartItems));
          this.setProducts(this.state.products, "remove");
          return;
        } else {
          cartItems = this.state.cart;
          cartItems[index].quantity -= 1;
        }
      } else {
        if (item.quantity < 10 && action === "add") {
          cartItems = this.state.cart;
          cartItems[index].quantity += 1;
        } else {
          return;
        }
      }
    }
    this.setState({
      cart: cartItems,
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    this.setProducts(this.state.products);
  };

  showModal = (items: any) => {
    if (items === 0) return;
    this.setState({
      status: true,
    });
  };

  closeModal = (status: any) => {
    this.setState({
      status: status,
    });
  };

  render() {
    let items = 0;
    this.state.cart.forEach((element: any) => {
      items += element.quantity;
    });
    return (
      <div>
        <Products products={this.state.products} setCart={this.addToCart} />
        <div className="sticky-wrapper" onClick={() => this.showModal(items)}>
          <ShoppingCart />
          <span style={{ color: "green" }}>{items}</span>
        </div>
        {this.state.status && (
          <div>
            <div className="backdrop"> </div>
            <Cart products={this.state.cart} setCart={this.closeModal} />
          </div>
        )}
      </div>
    );
  }
}
