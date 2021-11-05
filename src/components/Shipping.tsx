import React from "react";
import Alert from "react-bootstrap/Alert";

export default class Shipping extends React.Component {
  state = {
    fullName: "",
    address: "",
    cardNumber: "",
    cardCvv: "",
    expiry: "",
    confirmed: false,
  };

  change = (e: any, name: string) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    this.sendConfirmation();
  };

  sendConfirmation() {
    fetch("https://test.ejam.com/api/recruitment/frontendtask1/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          confirmed: true,
        });
      });
    localStorage.clear();
  }

  render() {
    return (
      <div className="form-container ">
        <h1 style={{ color: "gray" }}>CHECKOUT</h1>
        <form name="checkoutForm" onSubmit={(e) => this.onSubmit(e)}>
          <input
            name="fullName"
            className="form-items"
            placeholder="Full name"
            onChange={(e) => this.change(e, "fullName")}
            required
          />
          <br />
          <input
            className="form-items"
            name="address"
            placeholder="Address"
            onChange={(e) => this.change(e, "address")}
            required
          />
          <br />
          <input
            name="cardNumber"
            className="form-items"
            placeholder="Card Number"
            onChange={(e) => this.change(e, "cardNumber")}
            required
          />
          <br />
          <input
            name="CVV"
            className="form-items"
            type="numeric"
            placeholder="CVV"
            onChange={(e) => this.change(e, "cardCvv")}
            required
          />
          <br />
          <input
            name="Expiry"
            className="form-items"
            placeholder="Expiry date"
            onChange={(e) => this.change(e, "expiry")}
            required
          />
          <br />
          <button className="button-checkout" type="submit">
            Confirm order
          </button>
        </form>
        {this.state.confirmed && (
          <Alert color="primary" style={{ padding: "8px" }}>
            Order placed successfully!
            <Alert.Link href="/">Go to Home</Alert.Link>
          </Alert>
        )}
      </div>
    );
  }
}
