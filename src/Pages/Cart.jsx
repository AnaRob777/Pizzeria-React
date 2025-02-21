import React, { useState } from "react";
import { useCarrito } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidadProducto, calcularPrecioTotal, clearCart } = useCarrito();
  const { token } = useUser();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const aumentarCantidad = (id) => {
    actualizarCantidadProducto(id, 1);
  };

  const disminuirCantidad = (id, cantidad) => {
    if (cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      actualizarCantidadProducto(id, -1);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: carrito }),
      });
      if (!response.ok) {
        throw new Error("Error en el proceso de compra");
      }
      const data = await response.json();
      // Si la compra se realizó con éxito:
      setCheckoutSuccess(true);
      setCheckoutError("");
      // Limpia el carrito si el contexto lo permite
      if (clearCart) {
        clearCart();
      }
    } catch (error) {
      setCheckoutError("Error al realizar la compra. Inténtalo nuevamente.");
      setCheckoutSuccess(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Detalle del pedido</h2>
      {carrito.length > 0 ? (
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-hover">
              <tbody>
                {carrito.map((pizza) => (
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
                    <td>{pizza.cantidad}</td>
                    <td>${(pizza.price * pizza.cantidad).toLocaleString("es-ES")}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => aumentarCantidad(pizza.id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => disminuirCantidad(pizza.id, pizza.cantidad)}
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
            <h4>Total: ${calcularPrecioTotal().toLocaleString("es-ES")}</h4>
            <button
              className="btn btn-primary mt-3"
              disabled={!token}
              onClick={handleCheckout}
            >
              Pagar
            </button>
            {!token && (
              <p className="text-danger mt-2">
                Debes iniciar sesión para poder realizar el pago.
              </p>
            )}
            {checkoutSuccess && (
              <div className="alert alert-success mt-3">
                ¡Compra realizada con éxito!
              </div>
            )}
            {checkoutError && (
              <div className="alert alert-danger mt-3">
                {checkoutError}
              </div>
            )}
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
