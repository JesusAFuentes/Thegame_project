import './App.css';
import React, { useEffect, useState } from 'react';
import cardSound from './sounds/moneda.mp3';
import cancelSound from './sounds/cancel.mp3';
import takeSound from './sounds/takesound.mp3';
import Swal from 'sweetalert2'
import PaginaInicio from './inicio';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage, setLocalStorage, removeItemsLocalStorage } from './globalFunction'
function App() {
  const navigate = useNavigate();
  const savedStackcards = localStorage.getItem('stackcards');
  const initialStackcards = savedStackcards ? JSON.parse(savedStackcards) : [];
  const savedStack = localStorage.getItem('stack');
  const initialStack = savedStack ? JSON.parse(savedStack) : [];
  const savedUpStackfirst = localStorage.getItem('upStackfirst');
  const initialUpStackfirst = savedUpStackfirst ? JSON.parse(savedUpStackfirst) : [1];
  const savedUpStackSecond = localStorage.getItem('upStackSecond');
  const initialUpStackSecond = savedUpStackSecond ? JSON.parse(savedUpStackSecond) : [1];
  const savedDownStackfirst = localStorage.getItem('downStackfirst');
  const initialDownStackfirst = savedDownStackfirst ? JSON.parse(savedDownStackfirst) : [100];
  const savedDownStacksecond = localStorage.getItem('downStacksecond');
  const initialDownStacksecond = savedDownStacksecond ? JSON.parse(savedDownStacksecond) : [100];
  const [game, setGame] = React.useState([])

  const [stackcards, setStackcards] = useState(initialStackcards);
  const [stack, setStack] = useState(initialStack);
  const [upStackfirst, setupStackfirst] = useState(initialUpStackfirst);
  const [upStackSecond, setupStackSecond] = useState(initialUpStackSecond);
  const [downStackfirst, setdownStackfirst] = useState(initialDownStackfirst);
  const [downStacksecond, setdownStacksecond] = useState(initialDownStacksecond);
  const [selectedCard, setselectedcard] = useState();
  const [allcards, setallcards] = useState([]);
  const [cardsThrown, setcardsThrown] = useState(0);
  const [startgame, setstartgame] = useState(false);
  const [turn, setTurn] = useState(1);
  const [points, setPoints] = useState();
  const [initialState, setInitialState] = useState({
    stackcards: [],
    stack: [],
    upStackfirst: [1],
    upStackSecond: [1],
    downStackfirst: [100],
    downStacksecond: [100],
    selectedCard: null,
    allcards: [],
    cardsThrown: 0,
    startgame: false,
    turn: 1,
    points: 0,
  });
  let { seed } = useParams();

  useEffect(() => {
    console.log("cambio el valor de seed", seed)
    if (seed === 'new') {
      setTimeout(() => {
        setLocalStorage('upStackfirst', [1])
        setupStackfirst([1])
        setLocalStorage('upStackSecond', [1])
        setupStackSecond([1])
        setLocalStorage('downStackfirst', [100])
        setdownStackfirst([100])
        setLocalStorage('downStacksecond', [100])
        setdownStacksecond([100])
        removeItemsLocalStorage('seed')
        removeItemsLocalStorage('stack')
        setStack([])
        setcardsThrown(0)
        setstartgame(false)
        setPoints(0)
        setTurn(1)
      }, 300)

    } else {
      const list = getLocalStorage('list-seeds')
      if (list) {
        console.log(list);
        console.log(seed);
        const find = list.find(item => Number(item.idsemilla) === Number(seed))
        console.log("partida seleccionada --> ", find)
        if (find) {
          setTimeout(() => {

            setLocalStorage('seed', find)
            setStack([])
            setLocalStorage('upStackfirst', [1])
            setupStackfirst([1])
            setLocalStorage('upStackSecond', [1])
            setupStackSecond([1])
            setLocalStorage('downStackfirst', [100])
            setdownStackfirst([100])
            setLocalStorage('downStacksecond', [100])
            setdownStacksecond([100])
            removeItemsLocalStorage('stack')
            setStack([])
            setcardsThrown(0)
            setstartgame(false)
            setPoints(0)
            setTurn(1)
          }, 300)
        }
      }

    }
  }, [])



  useEffect(() => {
    setLocalStorage('stackcards', stackcards);
    setLocalStorage('stack', stack);
    setLocalStorage('upStackfirst', upStackfirst);
    setLocalStorage('upStackSecond', upStackSecond);
    setLocalStorage('downStackfirst', downStackfirst);
    setLocalStorage('downStacksecond', downStacksecond);

  }, [stackcards, stack, upStackfirst, upStackSecond, downStackfirst, downStacksecond]);
  useEffect(() => {
    if (stack.length === 8) {
      if (turn === 1) {
        setstartgame(true);
      }
      setcardsThrown(0);
      setTurn(turn + 1);
      setInitialState({
        stackcards,
        stack,
        upStackfirst,
        upStackSecond,
        downStackfirst,
        downStacksecond,
        selectedCard,
        allcards,
        cardsThrown,
        startgame,
        turn,
        points,
      });
    }
    setTimeout(() => {
      validateDefeat();
    }, 300)
  }, [stack]);
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
      const local_seed = getLocalStorage('seed')
      if (game.length === 0 && stack.length === 0 && startgame && local_seed) {
        alert(`Victoria ${points}`);
      }
    }, 300)
  }, [stack, game, startgame])


  const cancelTurn = () => {
    setStackcards(initialState.stackcards);
    setStack(initialState.stack);
    setupStackfirst(initialState.upStackfirst);
    setupStackSecond(initialState.upStackSecond);
    setdownStackfirst(initialState.downStackfirst);
    setdownStacksecond(initialState.downStacksecond);
    setselectedcard(initialState.selectedCard);
    setallcards(initialState.allcards);
    setcardsThrown(initialState.cardsThrown);
    setstartgame(initialState.startgame);
    setTurn(initialState.turn);
    setPoints(initialState.points);
  };

  const validateDefeat = () => {
    if (upStackfirst.length > 0 && upStackSecond.length > 0 && downStackfirst.length > 0 && downStacksecond.length > 0) {
      const first = upStackfirst[upStackfirst.length - 1];
      const second = upStackSecond[upStackSecond.length - 1];
      const downfirst = downStackfirst[downStackfirst.length - 1];
      const downSecond = downStacksecond[downStacksecond.length - 1];
      const validateLeftFirst = stack.every(item => item < first)
      const validateLeftSecond = stack.every(item => item < second)
      const validateLess = (value, data) => {
        return data.some(item => (value - item) === 10);
      }
      const validateMore = (value, data) => {
        const suma = value + 10;
        return data.some(item => suma === item);
      }

      const firstMore = validateLess(first, stack)
      const secondMore = validateLess(second, stack)

      /* Validaciones para saber si las cartas de la derecha son mayores a 10 */
      const downFirstMore = validateMore(downfirst, stack)
      const downSecondMore = validateMore(downSecond, stack)

      const validateWin = firstMore || secondMore || downFirstMore || downSecondMore;

      const validateRightFirst = stack.every(item => item > downfirst)
      const validateRightSecond = stack.every(item => item > downSecond)

      if (startgame && stack.length > 0) {
        console.log(validateLeftFirst, validateLeftSecond, validateRightFirst, validateRightSecond, cardsThrown < 2);
        if (validateLeftFirst && validateLeftSecond && validateRightFirst && validateRightSecond && cardsThrown < 2) {
          if (!validateWin) {
            let puntaje = stack.length + game.length

            Swal.fire({
              title: `puntos de partida ${puntaje}`,
              imageUrl: 'https://us-tuna-sounds-images.voicemod.net/3601c42b-1284-4c6b-976b-ab39990b6277.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            }).then(() => {


            })

          }
        }
      }

    }
  }


  const takecard = async () => {
    if (cardsThrown < 2 && startgame) {
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
        title: 'Debes de tirar al menos 2 cartas!'
      })
      const audio = new Audio(cancelSound);
      audio.play();
      return;
    } else if (stack.length < 8) {

      console.log("entro al obtener");
      if (stackcards.length === 0) {
        alert("El mazo de cartas por tirar está vacío. No puedes tomar más cartas.");
      } else {
        const randomNum = () => {
          return Math.floor(Math.random() * stackcards.length);
        }
        if (seed === 'new') {
          await generateSeed();
        }

        let data = JSON.parse(localStorage.getItem('seed')).data

        if (!startgame) {
          const primerasOchoCartas = data.splice(0, 8);
          console.log("primeras 8 cartas -->", primerasOchoCartas);

          console.log("array de juego es -->", data)
          setGame(data)
          setStack(primerasOchoCartas);
        } else {
          if (stack.length < 8) {
            const validateTotal = 8 - stack.length;
            console.log("la continuacion del juego es  -->", game)
            const numero = []
            const arrayGame = game;
            for (let i = 0; i < validateTotal; i++) {
              console.log("index es ==>", i)
              numero.push(arrayGame[0])
              arrayGame.splice(0, 1)
              setallcards([...stack, arrayGame[0]]);
            }
            setGame(arrayGame)
            console.log("numero  -->", numero)
            console.log("numeros que deberia de mandar", [...stack, ...numero])
            setStack([...stack, ...numero]);
            setallcards([...stack, ...numero]);
          }
        }
        const audio = new Audio(takeSound);
        audio.play();

        if (startgame) setcardsThrown(cardsThrown + 1);
      }
    }
  };

  const selectCard = (card) => {
    const audio = new Audio(cardSound);
    audio.play();
    setselectedcard(card)
    console.log(card)
  }
  const semillaPartida = localStorage.getItem('semillaPartida');

  const [seedActual, setAcualGame] = React.useState();
  const generate = () => {
    const n = 98;
    const min = 2;
    const max = 99;
    if (max - min + 1 < n) {
      throw new Error("No es posible generar un array único con estos parámetros.");
    }

    const arrayUnico = [];
    while (arrayUnico.length < n) {
      const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!arrayUnico.includes(numeroAleatorio)) {
        arrayUnico.push(numeroAleatorio);
      }
    }
    return arrayUnico;
  }
  const generateSeed = async () => {
    const semilla = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const result = await Swal.fire({
      title: 'Ingrese su nombre',
      input: 'text',
      inputLabel: 'Su nombre',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Necesitas escribir algo!'
        }
      }
    })
    if (result.value) {
      navigate(`/juego/${semilla}`);
      const generateSeed = {
        idsemilla: semilla,
        data: generate(),
        name: result.value,
      }

      if (!localStorage.getItem('seed')) {
        setAcualGame(generateSeed)
        localStorage.setItem('seed', JSON.stringify(generateSeed));
      }
    }


  }
  const view_id_seed = () => {
    const seed = JSON.parse(localStorage.getItem('seed'));

    return seed ? seed.idsemilla : '';
  }
  const semilla = parseInt(semillaPartida);

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
        const audio = new Audio(cancelSound);
        audio.play();
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
        const audio = new Audio(cancelSound);
        audio.play();
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
        const audio = new Audio(cancelSound);
        audio.play();
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
        const audio = new Audio(cancelSound);
        audio.play();
      }

    }
  }
  /*  const array = JSON.parse(localStorage.getItem('seed')) ? JSON.parse(localStorage.getItem('seed')).data : []; */

  const saveGame = () => {
    /* Vamos a guardar la partida en el localstorage */
    const actual = getLocalStorage('seed')
    const seeds = getLocalStorage('list-seeds')
    let puntaje = stack.length + game.length
    if (actual) {
      if (seeds) {
        /* Vamos a buscar si existe esa partida */
        let list = seeds.map(item => item)
        const index = list.findIndex(item => item.idsemilla === actual.idsemilla)



        if (index >= 0) {
          const listaPuntaje = list[index].puntaje
          const score = [...listaPuntaje, puntaje].sort()
          list[index] = { ...actual, puntaje: score }

        } else {
          list.push({ ...actual, puntaje: [puntaje] })
        }
        setLocalStorage('list-seeds', list)
      } else {
        setLocalStorage('list-seeds', [{ ...actual, puntaje: [puntaje] }])
      }
    }
    navigate(`/`);
  }
  return (
    <>
      <p className='reg' onClick={saveGame}>Regresar</p>
      <button className='button' onClick={cancelTurn}>Cancelar Turno</button>
      <div className="game-container">
        <div className="card-container">
          <div className="up-stack" onClick={() => insertCard()} style={{ userSelect: 'none' }}> {upStackfirst[upStackfirst.length - 1]}</div>
          <div className="up-stack" onClick={() => insertCard1()} style={{ userSelect: 'none' }}>{upStackSecond[upStackSecond.length - 1]}</div>
        </div>

        <div className="card-container" onClick={() => takecard()}>
          <div className="take-stack"></div>
          {view_id_seed() && <div className="semilla">Semilla de la partida: {view_id_seed()}</div>}
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
  const images = document.querySelectorAll('player-hand1');

  images.forEach(image => {
    image.addEventListener('click', () => {
      // Primero, quita la clase 'animate' de todas las imágenes
      images.forEach(otherImage => {
        otherImage.classList.remove('animate');
      });

      // Luego, agrega la clase 'animate' solo a la imagen que ha sido clicada
      image.classList.add('animate');
    });
  });
}

export default App;
