import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/inicio.css';

function Inicio() {
  const navigate = useNavigate();

  const handleGestionarClick = () => {
    navigate('/crud/agregar');
  };

  return (
    <div className="inicio-bg d-flex align-items-center justify-content-center">
      <div className="inicio-card text-center p-5 rounded shadow">
        <h1 className="inicio-title mb-3">Bienvenido a ElectroCRUD</h1>
        <h4 className="mb-3 text-secondary">Tu gestor de productos electrónicos</h4>
        <div className="mb-4 d-flex justify-content-center gap-4">
          <span role="img" aria-label="laptop" style={{ fontSize: '2rem' }}>💻</span>
          <span role="img" aria-label="phone" style={{ fontSize: '2rem' }}>📱</span>
          <span role="img" aria-label="tv" style={{ fontSize: '2rem' }}>📺</span>
        </div>
        <p className="inicio-desc mb-4">
          Gestiona tus productos electrónicos de forma organizada, rápida y segura.
        </p>
        <button
          className="btn btn-primary px-4 py-2"
          onClick={handleGestionarClick}
        >
          Gestionar productos
        </button>
      </div>
    </div>
  );
}

export default Inicio;
