import React from "react";
import { useCarrito } from "../context/CartContext"; 

const Cart = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidadProducto, calcularPrecioTotal } = useCarrito(); 

  const aumentarCantidad = (id) => {
    actualizarCantidadProducto(id, 1); 
  }

  const disminuirCantidad = (id, cantidad) => {
    if (cantidad === 1) {
      eliminarDelCarrito(id); 
    } else {
      actualizarCantidadProducto(id, -1); 
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Detalle del pedido</h2>
      {carrito.length > 0 ? (
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
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
                    <td>${pizza.price.toLocaleString()}</td>
                    <td>{pizza.cantidad}</td>
                    <td>${(pizza.price * pizza.cantidad).toLocaleString()}</td>
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
            <h4>Total: ${calcularPrecioTotal().toLocaleString()}</h4>
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
