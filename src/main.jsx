import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Inicio from './components/Inicio.jsx';
import ProductoForm from './components/ProductoForm.jsx';
import ProductoList from './components/ProductoList.jsx';
import Navbar from './components/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/ElectroCrud">
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/crud/agregar" element={<ProductoForm />} />
        <Route path="/crud/consultar" element={<ProductoList />} />
        <Route path="/crud/editar/:id" element={<ProductoForm />} />
        <Route path="/crud" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
