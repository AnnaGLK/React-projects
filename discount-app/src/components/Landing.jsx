import React from "react";

function Landing({ user, store }) {
  const hottestItem = store.find(product => product.hottest);
  return (
    <div className="landing">
      <h1>Welcome, {user}</h1>
      {hottestItem && (
        <p>
          Hottest Item: <strong>{hottestItem.item}</strong> - ${hottestItem.price}
        </p>
      )}
    </div>
  );
}

export default Landing;
