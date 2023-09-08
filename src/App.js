import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [stack, setStack] = useState([]);
  const [upStackfirst, setupStackfirst] = useState([1]);
  const [upStackSecond, setupStackSecond] = useState([1]);
  const [downStackfirst, setdownStackfirst] = useState([100]);
  const [downStacksecond, setdownStacksecond] = useState([100]);
  const [selectedCard, setselectedcard] =useState();
  console.log(upStackfirst)
  console.log(upStackSecond)

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
  const selectCard = (card) =>{
    setselectedcard(card)
    console.log(card)
  }
  const insertCard = () =>{
    let stack = upStackfirst;
    if (selectedCard){
      setupStackfirst([...stack, selectedCard])
    }
    
    setselectedcard(null)
  }

  const insertCard1 = () =>{
    let stack = upStackSecond;
    if (selectedCard){
      setupStackSecond([...stack, selectedCard])
    }
    setselectedcard(null)
  }
  const insertCard2 = () =>{
    let stack = downStackfirst;
    if (selectedCard){
      setdownStackfirst([...stack, selectedCard])
    }
    setselectedcard(null)
  }
  const insertCard3 = () =>{
    let stack = downStacksecond;
    if (selectedCard){
      setdownStacksecond([...stack, selectedCard])
    }
    setselectedcard(null)
  }

  return (
    <>
      <div className="game-container">
        <div className="card-container">
          <div className="up-stack" onClick={() => insertCard()} style={{userSelect:'none'}}> {upStackfirst[upStackfirst.length -1]}</div>
          <div className="up-stack" onClick={() => insertCard1()} style={{userSelect:'none'}}>{upStackSecond[upStackSecond.length -1]}</div>
        </div>

        <div className="card-container" onClick={() => takecard()}>
          <div className="take-stack"></div>
        </div>

        <div className="card-container">
          <div className="down-stack" onClick={()=> insertCard2()} style={{userSelect:'none'}}>{downStackfirst[downStackfirst.length -1]}</div>
          <div className="down-stack" onClick={()=> insertCard3()} style={{userSelect:'none'}}>{downStacksecond[downStacksecond.length -1]}</div>
        </div>
      </div>
      <div className="player-hand">
        {stack.map((card, idx) => {
          return (
            <div key={`card-${idx}`} className="player-hand1" style={{userSelect:'none'}}
            onClick={()=>selectCard(card)}>
              {card}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
