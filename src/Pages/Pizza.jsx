import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito } from "../context/CartContext"; 
const capitalizarPrimeraLetra = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({
    id: '',
    img: '',
    name: '',
    price: 0,
    desc: '',
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCarrito(); 

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
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
  }, [id]);

  const manejarAgregarAlCarrito = () => {
    const pizzaToAdd = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      ingredients: pizza.ingredients,
      img: pizza.img,
      desc: pizza.desc,
      cantidad: 1, 
    };
    agregarAlCarrito(pizzaToAdd); 
  };

  if (loading) {
    return <p>Cargando información de la pizza...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <img src={pizza.img} alt={pizza.name} className="card-img-top" style={{ objectFit: 'cover', height: '400px' }} /> {/* Aumenté el tamaño de la imagen */}
            <div className="card-body">
              <h3 className="card-title mb-3"><strong>{capitalizarPrimeraLetra(pizza.name)}</strong></h3>
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
                <strong>Precio: ${pizza.price.toLocaleString('es-ES')}</strong>
              </h5>
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark" onClick={manejarAgregarAlCarrito}>Añadir 🛒</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
