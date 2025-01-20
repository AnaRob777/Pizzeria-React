import React, { useEffect, useState } from 'react';
import Cardpizza from './Cardpizza';
import Header from './Header';
import Pizza from './Pizza';

const Home = () => {

  const [pizzas,setPizzas] = useState([])
 
  const getPizzas = async () => {
  
      const url = "http://localhost:5001/api/pizzas"
      const response = await fetch(url)
      const data = await response.json()
      setPizzas(data)
  }
  useEffect(() => {
      getPizzas()
  }, [])

  return (
    <section>
      <Header />
      <div className="row">
      
        {pizzas.map((pizza) => (
          <Cardpizza
            key={pizza.id}
            img={pizza.img}
            name={pizza.name}
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
