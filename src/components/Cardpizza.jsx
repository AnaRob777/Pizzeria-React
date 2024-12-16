const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <div className="col-md-4 mt-4">
      <div className="card mb-4">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h3 className="card-title"> <strong>{name}</strong></h3>
          <br />
          <h4 className="card-text">Ingredientes:</h4>
            <div>
            {ingredients.join(",")}
            </div>
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
