import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Puntaje from './puntaje';
import Experto from './Experto';
import Navbar from './inicio';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/juego/:seed" element={<App />} />
      <Route path="/juego-experto/:seed" element={<Experto />} />
      <Route path="/juego/actual" element={<App />} />
      <Route path="/puntaje" element={<Puntaje />} />

    </Routes>
  </Router>,
  document.getElementById('root')
);