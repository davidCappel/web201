import React from "react";
import './Card.css'
const Card = (props) => {
  const name = props.name
  const img = props.img
  const loc = props.loc
  return (
    <>
    <div className="card">
      <h1>{name}</h1>
      <div>
        <img src={img} alt={name} />
        <p> This is {name}'s shoe</p>
        <button onClick={() => window.open(loc, "_blank")} > Take me to the shoe</button>
      </div>
    </div>
    </>
  );
};

export default Card;
