import React from 'react';
import vitaminA from '../assets/vitaminA.jpeg'

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img className="small" src={vitaminA} alt={product.name} />
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
