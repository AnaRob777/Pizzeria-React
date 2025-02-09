import React, { useEffect, useState } from 'react';
import Cardpizza from '../components/Cardpizza';
import Header from '../components/Header';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  const getPizzas = async () => {
    const url = "http://localhost:5000/api/pizzas";
    const response = await fetch(url);
    const data = await response.json();
    setPizzas(data);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  const capitalizarPrimeraLetra = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <section>
      <Header />
      <div className="row">
        {pizzas.map((pizza) => (
          <Cardpizza
            key={pizza.id}
            id={pizza.id}
            img={pizza.img}
            name={capitalizarPrimeraLetra(pizza.name)}
            desc={pizza.desc}
            price={pizza.price}
            ingredients={pizza.ingredients}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
