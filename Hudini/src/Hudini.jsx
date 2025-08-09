import React, { useState } from "react";
import './Hudini.css'


function Hudini() {
  const [show, setShow] = useState(false);

  return (
    <div className="hudini">
      <div>{show ? "Now you see me" : "Now you don't"}</div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default Hudini;