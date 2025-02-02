import React, { createContext, useContext, useState } from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

 
  const agregarAlCarrito = (pizza) => {
    const pizzaExistente = carrito.find((item) => item.id === pizza.id);

    if (pizzaExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === pizza.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, pizza]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((pizza) => pizza.id !== id));
  };

  const actualizarCantidadProducto = (id, cantidad) => {
    setCarrito(
      carrito.map((pizza) =>
        pizza.id === id
          ? { ...pizza, cantidad: pizza.cantidad + cantidad }
          : pizza
      )
    );
  };

  const calcularPrecioTotal = () => {
    return carrito.reduce(
      (total, pizza) => total + pizza.price * pizza.cantidad,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidadProducto,
        calcularPrecioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCarrito = () => {
  return useContext(CartContext);
};
