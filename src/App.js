import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [stack, setStack] = useState([]);
  const [upStackfirst, setupStackfirst] = useState(1);
  const [upStackSecond, setupStackSecond] = useState(1);
  const [downStackfirst, setdownStackfirst] = useState(100);
  const [downStacksecond, setdownStacksecond] = useState(100);

  useEffect(() => {
    console.log("Entro al componente")
  }, [stack]);
  
  function randomNumberInRange(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const takecard = () => {
    if (stack.length < 8){
      console.log("entro al obtener");
      let cards = stack;
      const num = randomNumberInRange(2,99);
      if(!cards.includes(num)) setStack([...cards, num]);
    
    } else {
      alert("Limite de cartas")
    }
    

    
  };
  return (
    <>
      <div className="game-container">
        <div className="card-container">
          <div className="up-stack">{upStackfirst}</div>
          <div className="up-stack">{upStackSecond}</div>
        </div>

        <div className="card-container" onClick={() => takecard()}>
          <div className="take-stack"></div>
        </div>

        <div className="card-container">
          <div className="down-stack">{downStackfirst}</div>
          <div className="down-stack">{downStacksecond}</div>
        </div>
      </div>
      <div className="player-hand">
        {stack.map((item, idx) => {
          return (
            <div key={'card-${idx}'} className="player-hand1">
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
