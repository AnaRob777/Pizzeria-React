import React from 'react'
import Cardpizza from './Cardpizza'
import Header from './Header'
import { pizzas } from '../pizzas'

const Home = () => {
  return (
    <section>
      <Header></Header>
      <div class="row">
      {pizzas.map((pizza) => (
        <Cardpizza
          key= {pizza.id} 
          img={pizza.img}
          name={pizza.name}
          desc={pizza.desc}
          price={pizza.price}
          ingredients={pizza.ingredients}
          />
      ))}
      </div>
    </section>
 )}
export default Home
