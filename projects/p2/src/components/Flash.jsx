import React, { useState } from "react";
import "./Flash.css";

const Flash = (props) => {
  const { color, question, answer, img, qnum } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setFlipped(!flipped)}>
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        <div className={`flip-card-front ${color}`}>
          <h1>{question}</h1>
        </div>
        <div className={`flip-card-back ${color}`}>
          <h1>{answer}</h1>
          {img && <img src={img} alt={qnum || "flashcard"} />}
        </div>
      </div>
    </div>
  );
};

export default Flash;