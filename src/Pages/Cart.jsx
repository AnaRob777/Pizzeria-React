import React from "react";
import { useCarrito } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidadProducto, calcularPrecioTotal } = useCarrito(); 
  const { token } = useUser(); 

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
            >
              Pagar
            </button>
            {!token && (
              <p className="text-danger mt-2">
                Debes iniciar sesión para poder realizar el pago.
              </p>
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
