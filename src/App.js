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
      const num = randomNumberInRange(2,20);
      if(!cards.includes(num)) setStack([...cards, num]);
    
    } else {
      alert("Limite de cartas")
    }
  };
  const selectCard = (card) =>{
    setselectedcard(card)
    console.log(card)
  }
  const insertCard = () => {
    if (selectedCard) {
      const topCard = upStackfirst[upStackfirst.length - 1];
      if (!topCard || selectedCard === topCard - 10 || selectedCard > topCard) {
        const updatedStack = [...upStackfirst, selectedCard];
        const updatedHand = stack.filter((card) => card !== selectedCard);
  
        setupStackfirst(updatedStack);
        setStack(updatedHand);
        setselectedcard(null);
      } else {
        alert("La carta seleccionada debe ser exactamente 10 unidades menor o mayor que la carta superior del stack.");
      }}
    }
  const insertCard1 = () => {
    if (selectedCard) {
      const topCard1 = upStackSecond[upStackSecond.length - 1];
      if (!topCard1  || selectedCard >= topCard1){
        const updatedStack1 = upStackSecond;
        const updatedHand1 = stack.filter((card) => card !== selectedCard);
        setupStackSecond([...updatedStack1, selectedCard]);
        setStack(updatedHand1);
        setselectedcard(null);
      }else{
        alert("La carta seleccionada no puede ser menor que la carta superior del stack.");
      }
      
    }
  }
  const insertCard2 = () => {
    if (selectedCard) {
      const topCard2 = downStackfirst[downStackfirst.length - 1];
      if (!topCard2  || selectedCard <= topCard2){
      const updatedStack = downStackfirst;
      const updatedHand = stack.filter((card) => card !== selectedCard);
      setdownStackfirst([...updatedStack, selectedCard]);
      setStack(updatedHand);
      setselectedcard(null);
      }else{
        alert("La carta seleccionada no puede ser mayor que la carta menor del stack");
      }
    }
  }
  const insertCard3 = () => {
    if (selectedCard) {
      const topCard3 = downStacksecond[downStacksecond.length -1];
      if (!topCard3 || selectedCard <= topCard3){
        const updatedStack = downStacksecond;
        const updatedHand = stack.filter((card) => card !== selectedCard);
        setdownStacksecond([...updatedStack, selectedCard]);
        setStack(updatedHand);
        setselectedcard(null);
      }else{
        alert("La carta seleccionada no puede ser mayor que la carta menor del stack")
      }
      
    }
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
