import { ProductProps } from "../model";
import { Card, Button } from "react-bootstrap";
import "./styles.css";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

function Products({ products, setCart }: ProductProps) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    let ENDPOINT = "wss://test.ejam.com";
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        applicantAuth: "cV874bxX9TmbBp2H8vsZkFaZ",
      },
    });

    socket.on("UPDATE_VIEWERS", (data) => {
      setResponse(data);
    });
  }, []);

  let data = Array.from(products);
  const plist = data.map((list, idx) => (
    <Card key={idx} className="card-item">
      <Card.Img variant="top" src={list.imageUrl} />
      <Card.Body>
        <Card.Title>{list.name}</Card.Title>
        <Card.Text className="description">{list.description}</Card.Text>
        {list.quantity ? (
          <div>
            <Button
              className="actions"
              variant="primary"
              onClick={() => setCart(list, "remove")}
            >
              -
            </Button>
            <span>{list.quantity}</span>
            <Button
              className="actions"
              variant="primary"
              onClick={() => setCart(list, "add")}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            className="button"
            variant="primary"
            onClick={() => setCart(list, "add")}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  ));

  return (
    <div className="container">
      {plist}
      <div className="sticky-wrapper1">{response}</div>
    </div>
  );
}

export default Products;
