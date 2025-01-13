import React, { useState } from "react";
import { pizzaCart } from "../pizzas";

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const aumentarCantidad = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCart(updatedCart);
  };

  const disminuirCantidad = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, count: Math.max(item.count - 1, 0) } : item
      )
      .filter((item) => item.count > 0);
    setCart(updatedCart);
  };

  const calculoTotal = () =>
    cart.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Detalle del pedido</h2>
      {cart.length > 0 ? (
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">

              </thead>
              <tbody>
                {cart.map((pizza) => (
                  <tr key={pizza.id}>
                    <td>
                      <img
                        src={pizza.img}
                        alt={pizza.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{pizza.name}</td>
                    <td>${pizza.price.toLocaleString()}</td>
                    <td>{pizza.count}</td>
                    <td>${(pizza.price * pizza.count).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => aumentarCantidad(pizza.id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => disminuirCantidad(pizza.id)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-12 text-end">
            <h4>Total: ${calculoTotal().toLocaleString()}</h4>
            <button className="btn btn-primary mt-3">Pagar</button>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          Tu carrito está vacío.
        </div>
      )}
    </div>
  );
};

export default Cart;
