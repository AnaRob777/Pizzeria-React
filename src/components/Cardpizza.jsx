import React from "react";
import { useCarrito } from "../context/CartContext"; 

const CardPizza = ({ name, price, ingredients, img, desc, id }) => {
  const { agregarAlCarrito } = useCarrito(); 

  
  const pizza = {
    id,
    name,
    price,
    ingredients,
    img,
    desc,
    cantidad: 1,
  };

  return (
    <div className="col-md-4 mt-4">
      <div className="card mb-4">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h3 className="card-title">
            <strong>{name}</strong>
          </h3>
          <p className="card-text">{desc}</p>
          <ul className="list-unstyled mb-3">
            <strong>Ingredientes:</strong>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-secondary">
                - {ingredient}
              </li>
            ))}
          </ul>
          <h5 className="card-text">
            <strong>Precio: ${price.toLocaleString()}</strong>
          </h5>
          <div className="d-flex justify-content-between">
            <button className="btn btn-light border-dark">Ver Más 👀</button>
            <button
              className="btn btn-dark"
              onClick={() => agregarAlCarrito(pizza)} 
            >
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
