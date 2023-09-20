import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [stackcards, setStackcards] = useState([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
  const [stack, setStack] = useState([]);
  const [upStackfirst, setupStackfirst] = useState([1]);
  const [upStackSecond, setupStackSecond] = useState([1]);
  const [downStackfirst, setdownStackfirst] = useState([100]);
  const [downStacksecond, setdownStacksecond] = useState([100]);
  const [selectedCard, setselectedcard] =useState();
  const [allcards, setallcards] = useState([]);
  const [cardsThrown, setcardsThrown] = useState(0);
  const [startgame, setstartgame] = useState(false);
  console.log(stack)

console.log(cardsThrown)
console.log(startgame)
  useEffect(() => {
    if (stack.length == 8){
      setstartgame(true);
    }
    console.log("Entro al componente")
  }, [stack]);

  const takecard = () => {
    let turno = 1; 
  
    if (cardsThrown < 2 && startgame) {
      alert("Debes tirar al menos 2 cartas antes de tomar una nueva");
      return;
    } else if (stack.length < 8) {
      console.log("entro al obtener");
      const randomIndex = Math.floor(Math.random() * stackcards.length);
      const num = stackcards[randomIndex];
      stackcards.splice(randomIndex, 1);
      setStack([...stack, num]);
      setallcards([...stack, num]);
      if (startgame) {
        setcardsThrown(cardsThrown + 1);
      }
    } else if (stack.length === 8) {
      setcardsThrown(0);
      alert("Fin del turno " + turno); 
      turno++; 
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
        setcardsThrown(cardsThrown+1);
      } else {
        alert("La carta seleccionada debe ser exactamente 10 unidades menor que la carta superior del stack.");
      }
    }
  }


  const insertCard1 = () => {
    if (selectedCard) {
      const topCard1 = upStackSecond[upStackSecond.length - 1];
      if (!topCard1  || selectedCard=== topCard1 - 10||selectedCard > topCard1){
        const updatedStack1 = upStackSecond;
        const updatedHand1 = stack.filter((card) => card !== selectedCard);
        setupStackSecond([...updatedStack1, selectedCard]);
        setStack(updatedHand1);
        setselectedcard(null);
        setcardsThrown(cardsThrown+1);
      }else{
        alert("La carta seleccionada debe ser exactamente 10 unidades menor que la carta superior del stack.");
      }
      
    }
  }
  const insertCard2 = () => {
    if (selectedCard) {
      const topCard2 = downStackfirst[downStackfirst.length - 1];
      if (!topCard2  || selectedCard=== topCard2 + 10 ||selectedCard < topCard2){
      const updatedStack = downStackfirst;
      const updatedHand = stack.filter((card) => card !== selectedCard);
      setdownStackfirst([...updatedStack, selectedCard]);
      setStack(updatedHand);
      setselectedcard(null);
      setcardsThrown(cardsThrown+1);
      }else{
        alert("La carta seleccionada debe ser exactamente 10 unidades mayor que la carta superior del stack.");
      }
    }
  }
  const insertCard3 = () => {
    if (selectedCard) {
      const topCard3 = downStacksecond[downStacksecond.length -1];
      if (!topCard3 || selectedCard=== topCard3 + 10  ||selectedCard < topCard3){
        const updatedStack = downStacksecond;
        const updatedHand = stack.filter((card) => card !== selectedCard);
        setdownStacksecond([...updatedStack, selectedCard]);
        setStack(updatedHand);
        setselectedcard(null);
        setcardsThrown(cardsThrown+1);
      }else{
        alert("La carta seleccionada debe ser exactamente 10 unidades mayor que la carta superior del stack.")
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
