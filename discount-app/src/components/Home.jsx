import React from "react";
import Item from "./Item";

function Home({ store, shouldDiscount }) {
  return (
    <div className="home">
      <h2>Store Items</h2>
      <div className="items">
        {store.map((product, index) => (
          <Item
            key={index}
            item={product.item}
            price={product.price}
            discount={product.discount}
            shouldDiscount={shouldDiscount}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
