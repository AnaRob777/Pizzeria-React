import React, { useEffect, useState } from 'react';

const Pizza = () => {
  const [pizza, setPizza] = useState({
    img: '',
    name: '',
    price: 0,
    desc: '',
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/pizzas/p001");
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la pizza');
      }
      const data = await response.json();
      setPizza(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p>Cargando información de la pizza...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mb-4">
            <img src={pizza.img} alt={pizza.name} className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title mb-3"><strong>{pizza.name}</strong></h3>
              <p className="card-text">{pizza.desc}</p>
              <h5 className="mt-4"><strong>Ingredientes:</strong></h5>
              <ul className="list-unstyled mb-3">
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-secondary">
                    - {ingredient}
                  </li>
                ))}
              </ul>
              <h5 className="card-text mb-3">
                <strong>Precio: ${pizza.price.toLocaleString()}</strong>
              </h5>
              <div className="d-flex justify-content-between">
                <button className="btn btn-light border-dark">Ver Más 👀</button>
                <button className="btn btn-dark">Añadir 🛒</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
