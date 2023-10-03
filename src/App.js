import './App.css';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

function App() {
  const [stackcards, setStackcards] = useState([]);
  const [stack, setStack] = useState([]);
  const [upStackfirst, setupStackfirst] = useState([1]);
  const [upStackSecond, setupStackSecond] = useState([1]);
  const [downStackfirst, setdownStackfirst] = useState([100]);
  const [downStacksecond, setdownStacksecond] = useState([100]);
  const [selectedCard, setselectedcard] = useState();
  const [allcards, setallcards] = useState([]);
  const [cardsThrown, setcardsThrown] = useState(0);
  const [startgame, setstartgame] = useState(false);
  const [turn, setTurn] = useState(1);
  const[points,setPoints] = useState();
  console.log(stackcards)
  useEffect(() => {
    let array = []
    for (let i = 2; i < 100; i++) {
      array.push(i)
    }
    setStackcards(array);
  }, [])

  useEffect(() => {
    if (stack.length === 8) {
      if (turn === 1) {
        setstartgame(true);
      }
      setcardsThrown(0);
      setTurn(turn + 1);
    }
    console.log("el turno es -->", turn)

    setTimeout(() => {
      validateDefeat();
    }, 300)
  }, [stack]);

  useEffect(() => {
    setTimeout(() => {
      if (stackcards.length === 0 && stack.length === 0 && startgame) {
        alert("Victoria");
      }
    }, 300)
  }, [stack, stackcards])


  const validateDefeat = () => {
    if (upStackfirst.length > 0 && upStackSecond.length > 0) {
      const first = upStackfirst[upStackfirst.length - 1];
      const second = upStackSecond[upStackSecond.length - 1];
      const downfirst = downStackfirst[downStackfirst.length - 1];
      const downSecond = downStacksecond[downStacksecond.length - 1];
      console.log(stack, first, second, downfirst, downSecond)
      const validateLeftFirst = stack.some(item => item < first)
      const validateLeftSecond = stack.some(item => item < second)

      console.log(stack)
      const validateRightFirst = stack.some(item => item > downfirst)
      const validateRightSecond = stack.some(item => item > downSecond)

      if (startgame && stack.length > 0) {
        if (validateLeftFirst && validateLeftSecond && validateRightFirst && validateRightSecond && stack.length === 8) {
          let points=(stack.length + stackcards.length)
          Swal.fire({
            title: `puntos de partida ${points}`,
            imageUrl: 'https://us-tuna-sounds-images.voicemod.net/3601c42b-1284-4c6b-976b-ab39990b6277.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
      }
    }
  }

  const takecard = () => {
    if (cardsThrown < 2 && startgame) {
      alert("Debes tirar al menos 2 cartas antes de tomar una nueva");
      return;
    } else if (stack.length < 8) {
      console.log("entro al obtener");
      if (stackcards.length === 0) {
        alert("El mazo de cartas por tirar está vacío. No puedes tomar más cartas.");
      } else {
        const randomNum = () => {
          return Math.floor(Math.random() * stackcards.length);
        }

        const num = stackcards[randomNum()];
        stackcards.splice(randomNum(), 1);
        if (!startgame) {
          let array = []
          for (let i = 0; i < 8; i++) {
            const randomNu = randomNum()
            array.push(stackcards[randomNu])
            setallcards([...stack, randomNu]);
          }
          console.log("array de juego es -->", array)
          setStack(array);
        } else {
          console.log("el stack es -->",stack)
          if(stack.length < 8){
            const validateTotal = 8 - stack.length;
            console.log("hacen falta ",validateTotal)
            const numero = []
            for (let i = 0; i < validateTotal; i++) {
              const random = randomNum()
              console.log("numero random es --->",random)
              numero.push(random)
            }
            setStack([...stack, ...numero]);
            setallcards([...stack, ...numero]);
          }
            
        }
        if (startgame) {
          setcardsThrown(cardsThrown + 1);
        }
      }
    }
  };

  const selectCard = (card) => {
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
        setcardsThrown(cardsThrown + 1);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Movimiento invalido, No puedes colocar un carta menor!'
        })
      }
    }
  }


  const insertCard1 = () => {
    if (selectedCard) {
      const topCard1 = upStackSecond[upStackSecond.length - 1];
      if (!topCard1 || selectedCard === topCard1 - 10 || selectedCard > topCard1) {
        const updatedStack1 = upStackSecond;
        const updatedHand1 = stack.filter((card) => card !== selectedCard);
        setupStackSecond([...updatedStack1, selectedCard]);
        setStack(updatedHand1);
        setselectedcard(null);
        setcardsThrown(cardsThrown + 1);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Movimiento invalido, No puedes colocar un carta menor!'
        })
      }

    }
  }
  const insertCard2 = () => {
    if (selectedCard) {
      const topCard2 = downStackfirst[downStackfirst.length - 1];
      if (!topCard2 || selectedCard === topCard2 + 10 || selectedCard < topCard2) {
        const updatedStack = downStackfirst;
        const updatedHand = stack.filter((card) => card !== selectedCard);
        setdownStackfirst([...updatedStack, selectedCard]);
        setStack(updatedHand);
        setselectedcard(null);
        setcardsThrown(cardsThrown + 1);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Movimiento invalido, No puedes colocar un carta mayor!'
        })
      }
    }
  }
  const insertCard3 = () => {
    if (selectedCard) {
      const topCard3 = downStacksecond[downStacksecond.length - 1];
      if (!topCard3 || selectedCard === topCard3 + 10 || selectedCard < topCard3) {
        const updatedStack = downStacksecond;
        const updatedHand = stack.filter((card) => card !== selectedCard);
        setdownStacksecond([...updatedStack, selectedCard]);
        setStack(updatedHand);
        setselectedcard(null);
        setcardsThrown(cardsThrown + 1);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Movimiento invalido, No puedes colocar un carta mayor!'
        })
      }

    }
  }
  return (
    <>
      <div className="game-container">
        <div className="card-container">
          <div className="up-stack" onClick={() => insertCard()} style={{ userSelect: 'none' }}> {upStackfirst[upStackfirst.length - 1]}</div>
          <div className="up-stack" onClick={() => insertCard1()} style={{ userSelect: 'none' }}>{upStackSecond[upStackSecond.length - 1]}</div>
        </div>

        <div className="card-container" onClick={() => takecard()}>
          <div className="take-stack"></div>
        </div>

        <div className="card-container">
          <div className="down-stack" onClick={() => insertCard2()} style={{ userSelect: 'none' }}>{downStackfirst[downStackfirst.length - 1]}</div>
          <div className="down-stack" onClick={() => insertCard3()} style={{ userSelect: 'none' }}>{downStacksecond[downStacksecond.length - 1]}</div>
        </div>
      </div>
      <div className="player-hand">
        {stack.map((card, idx) => {
          return (
            <div key={`card-${idx}`} className="player-hand1" style={{ userSelect: 'none' }}
              onClick={() => selectCard(card)}>
              {card}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
