import Swal from 'sweetalert2';
import './inicio.css';
import { Link } from 'react-router-dom';
import { getLocalStorage } from './globalFunction'
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const handleNotaImportante = () => {
  Swal.fire({
    imageUrl:'https://scontent.fmzt1-1.fna.fbcdn.net/v/t39.30808-6/347408476_781613880225650_9108734715932109473_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEbg5mcijZ4-IIn3k2R61bNo2vkYGwOOeaja-RgbA455gxsZWUBMYLmREXYCmYZBwY4hOm98row3bJWBfzixkx_&_nc_ohc=JsCYmmhfXOoAX9dwP_7&_nc_ht=scontent.fmzt1-1.fna&oh=00_AfDeKvuL6UMNPQ3M1cimRIYaVOY0jgSNaCNq8XNwA4eWkg&oe=6570B8A8',
    title: "Nota Importante",
    text: "Porfavo",
  });
};
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navbar ${menuOpen ? 'open' : ''}`}>
      <h1 className='bienvenido'>Bienvenido al Juego</h1>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link to={'/juego/new'} onClick={handleToggleMenu} className='linki'>Iniciar (Modo Normal)</Link>
        <Link to={'/juego-experto/new'} onClick={handleToggleMenu} className='linke'>Iniciar (Modo Experto)</Link>
        <Link to={`/puntaje`} onClick={handleToggleMenu} className='linka'>Puntaje</Link>
        <Link to={`/juego/actual`} onClick={handleToggleMenu} className='link'>Volver al juego</Link>
        <a href="/pdf/reglas-the-game.pdf" download="reglas-the-game.pdf" className='linkp'>Descargar Reglas (PDF)</a>
        <div onClick={handleNotaImportante} className='nota-importante'>
    Nota Importante
  </div>
      </div>
      <div className='menu-toggle' onClick={handleToggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar;