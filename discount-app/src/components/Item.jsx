import React from "react";

function Item({ item, price, discount, shouldDiscount }) {
  const finalPrice = shouldDiscount ? price * (1 - discount) : price;
  
  return (
    <div className="item-card">
      <h3>{item}</h3>
      <p className="price">${finalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Item;
