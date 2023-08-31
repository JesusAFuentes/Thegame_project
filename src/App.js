import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  return (
    <>
      <div className="game-container">
        <div className="card-container">
          <div className="up-stack"></div>
          <div className="up-stack"></div>
        </div>

        <div className="card-container" onClick={() => takecard()}>
          <div className="take-stack"></div>
        </div>

        <div className="card-container">
          <div className="down-stack"></div>
          <div className="down-stack"></div>
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
