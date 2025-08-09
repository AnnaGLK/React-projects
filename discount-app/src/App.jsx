import React, { useState } from "react";
import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [state, setState] = useState({
    user: "Robyn",
    store: [
      { item: "XSPS Pro Player", price: 800, discount: 0.2, hottest: false },
      { item: "Gizem Backwatch", price: 230, discount: 0.6, hottest: false },
      { item: "Surround Sound Pelican", price: 3099, discount: 0.05, hottest: true }
    ],
    shouldDiscount: true, // change to false to test
    currentPage: "Landing"
  });

  return (
    <div className="App">
      <div className="nav">
        <button onClick={() => setState({ ...state, currentPage: "Landing" })}>
          Landing
        </button>
        <button onClick={() => setState({ ...state, currentPage: "Home" })}>
          Home
        </button>
      </div>

      {state.currentPage === "Landing" ? (
        <Landing user={state.user} store={state.store} />
      ) : (
        <Home store={state.store} shouldDiscount={state.shouldDiscount} />
      )}
    </div>
  );
}

export default App;
