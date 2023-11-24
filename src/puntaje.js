import React from 'react';
import './puntaje.css';
import { Link } from 'react-router-dom';
import { getLocalStorage } from './globalFunction'
import { useNavigate } from "react-router-dom";

function Puntaje({ App }) {
  const navigate = useNavigate();

  const list = getLocalStorage('list-seeds')

  
  const goGame = (id) => {
    navigate('/juego/' + id)
  }
  const goGameExperto = (id) => {
    navigate('/juego-experto/' + id)
  }
  const validateData = (item) => {
    const lista = item.puntaje
    let num = 0
    if(lista.length > 0){
      num = lista[0]
    }
    return `${num}                 /               ${item.puntaje.length}`
  }

  const ordenar = () => {
    const list = getLocalStorage('list-seeds');
    // Filtrar solo modos de juego normal
    return list
      .filter((item) => !item.gamemode || item.gamemode === 'Normal') // Filtrar normal o sin modo especificado
      .sort((a, b) => a.puntaje[0] - b.puntaje[0])
      .filter((item, idx) => idx <= 49);
  };
  
  const ordenarExperto = () => {
    const list = getLocalStorage('list-seeds');
    // Filtrar solo modos de juego experto
    return list
      .filter((item) => item.gamemode === 'Experto')
      .sort((a, b) => a.puntaje[0] - b.puntaje[0])
      .filter((item, idx) => idx <= 49);
  };
  
  return (
    <div>
      <h1>Salon de la fama</h1>
      <Link to={'/'} className='regreso'>
        Regresar
      </Link>
  
      <div style={{ marginTop: '30px' }}>
        {ordenar() && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID Semilla</th>
                <th>Nombre</th>
                <th>Puntaje / Veces jugadas</th>
              </tr>
            </thead>
            <tbody>
              {ordenar().map((item, key) => {
                return (
                  <tr
                    className='partidas'
                    key={key}
                    onClick={() => goGame(item.idsemilla)}
                  >
                    <td>{item.idsemilla}</td>
                    <td>{item.name}</td>
                    <td>{validateData(item)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {ordenarExperto() && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID Semilla</th>
                <th>Nombre</th>
                <th>Puntaje / Veces jugadas</th>
              </tr>
            </thead>
            <tbody>
              {ordenarExperto().map((item, key) => {
                // Aquí se usa ordenarExperto() en lugar de ordenar()
                return (
                  <tr
                    className='partidas'
                    key={key}
                    onClick={() => goGameExperto(item.idsemilla)}
                  >
                    <td>{item.idsemilla}</td>
                    <td>{item.name}</td>
                    <td>{validateData(item)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Puntaje;