import { useState } from "react";
import './index.css'

const Exercise2 = () => {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("");

  const handleFruitChange = (e) => {
    const selectedFruit = e.target.value;
    setFruit(selectedFruit);

    // use setTimeout to ensure state updates before logging
    setTimeout(() => {
      if (name && selectedFruit) {
        console.log(`${name} selected ${selectedFruit}`);
      }
    }, 0);
  };

  return (
    <div className="exercise2-container">
      <input
        id="name-input"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="text-input"
      />
      <select
        id="select-input"
        onChange={handleFruitChange}
        value={fruit}
        className="dropdown"
      >
        <option value="">-- Choose a fruit --</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="mango">Mango</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  );
};
export default Exercise2;