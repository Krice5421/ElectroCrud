import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente Navbar
 * Barra de navegación superior fija para la aplicación.
 * Muestra enlaces para agregar y consultar productos.
 * Resalta el enlace activo según la ruta actual.
 */
function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#7286D3', top: '0px', zIndex: '100' }}>
      <div className="container-fluid px-4">
        {/* Marca de la aplicación */}
        <Link className="navbar-brand text-white fw-bold" to="/" onClick={handleClose}>
          ElectroCRUD
        </Link>

        {/* Botón para menú colapsable en dispositivos pequeños */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* Enlaces de navegación */}
        <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === '/crud/agregar' ? 'text-white fw-bold' : 'text-white-50'
                }`}
                to="/crud/agregar"
                onClick={handleClose}
              >
                Agregar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === '/crud/consultar' ? 'text-white fw-bold' : 'text-white-50'
                }`}
                to="/crud/consultar"
                onClick={handleClose}
              >
                Consultar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
