import React from "react";

const CardPizza = ({ name, price, ingredients, img, desc}) => {
  return (
    <div className="col-md-4 mt-4">
      <div className="card mb-4">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h3 className="card-title"> <strong>{name}</strong></h3>
          <br/>
          <p className="card-text">{desc}</p>
          <br/>
          <ul className="list-unstyled mb-3">
            <strong>Ingredientes:</strong>
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-secondary">
                - {ingredient}
              </li>
            ))}
          </ul>
            <br />
          <h5 className="card-text">
            <strong>Precio: ${price.toLocaleString()}</strong>
          </h5>
          <div className="d-flex justify-content-between">
            <button className="btn btn-light border-dark">Ver Más 👀</button>
            <button className="btn btn-dark">Añadir 🛒</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
