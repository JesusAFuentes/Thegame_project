import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PaginaInicio from './inicio';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/juego/:seed" element={<App />} />
      <Route path="/juego/actual" element={<App />} />

    </Routes>
  </Router>,
  document.getElementById('root')
);