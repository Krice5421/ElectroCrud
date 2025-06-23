import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../services/api';
import Swal from 'sweetalert2';
import '../styles/productolist.css';

/**
 * Componente que muestra la lista de productos.
 * Permite filtrar por nombre, usuario, estado y rango de fechas.
 * Permite editar y eliminar productos.
 * Al eliminar, solicita confirmación y un captcha simple.
 */
function ProductoList() {
  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);
  // Estados para los filtros
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroDesde, setFiltroDesde] = useState('');
  const [filtroHasta, setFiltroHasta] = useState('');
  const navigate = useNavigate();

  /**
   * Obtiene la lista de productos desde la API y la guarda en el estado.
   */
  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  /**
   * Elimina un producto tras validar un captcha simple y confirmar la acción.
   * @param {string} id - ID del producto a eliminar
   */
  const borrarProducto = async (id) => {
    // Generar captcha simple
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const captcha = a + b;

    const captchaResp = await Swal.fire({
      title: 'Verificación',
      text: `¿Cuánto es ${a} + ${b}?`,
      input: 'text',
      inputPlaceholder: 'Respuesta',
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      cancelButtonText: 'Cancelar',
      preConfirm: (value) => {
        if (parseInt(value) !== captcha) {
          Swal.showValidationMessage('Respuesta incorrecta. Intenta de nuevo.');
        }
      }
    });

    if (!captchaResp.isConfirmed) return;

    const confirm = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      const res = await eliminarProducto(id);
      if (res.ok) {
        Swal.fire('Eliminado', 'Producto eliminado correctamente.', 'success');
        cargarProductos();
      }
    }
  };

  /**
   * Filtra los productos según los filtros aplicados.
   */
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) || 
                           p.usuario.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado ? p.estado === filtroEstado : true;
    const coincideDesde = filtroDesde ? new Date(p.fecha) >= new Date(filtroDesde) : true;
    const coincideHasta = filtroHasta ? new Date(p.fecha) <= new Date(filtroHasta) : true;

    return coincideNombre && coincideEstado && coincideDesde && coincideHasta;
  });

  return (
    <div className="list-container">
      <div className="list-card shadow">
        <h5 className="text-center mb-4 text-primary fw-bold">Lista de Productos</h5>

        {/* Filtros */}
        <div className="filter-bar row g-3 mb-4 sticky-top bg-white py-3 px-2 shadow-sm rounded-3 z-3"  style={{ top: '55px', zIndex: '100' }}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o usuario"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
              <option value="defectuoso">Defectuoso</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label d-block d-md-none mb-1" style={{ fontSize: '0.95rem' }}>
              Filtro: Fecha de adquisición
            </label>
            <input
              type="date"
              className="form-control"
              value={filtroDesde}
              onChange={(e) => setFiltroDesde(e.target.value)}
              placeholder="Desde"
            />
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <input
              type="date"
              className="form-control me-2"
              value={filtroHasta}
              onChange={(e) => setFiltroHasta(e.target.value)}
              placeholder="Hasta"
            />
            <button
              className="btn btn-danger btn-sm d-flex align-items-center"
              type="button"
              onClick={() => {
                setFiltroNombre('');
                setFiltroEstado('');
                setFiltroDesde('');
                setFiltroHasta('');
              }}
              title="Limpiar filtros"
            >
              <span className="me-1">
                <i className="bi bi-x-circle"></i>
              </span>
              Limpiar
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th className="d-none d-sm-table-cell">Descripción</th>
                <th>Usuario</th>
                <th className="d-none d-md-table-cell">Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No se encontraron productos con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((p) => (
                  <tr key={p.id} className="fade-in-row">
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td className="d-none d-sm-table-cell descripcion-col" title={p.descripcion}>
                      {p.descripcion}
                    </td>
                    <td>{p.usuario}</td>
                    <td className="d-none d-md-table-cell">{p.fecha}</td>
                    <td>{p.estado}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/crud/editar/${p.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => borrarProducto(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductoList;
