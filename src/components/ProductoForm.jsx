import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearProducto, obtenerProductoPorId, actualizarProducto } from '../services/api';

/**
 * Componente de formulario para crear o editar un producto.
 * - Si recibe un id por parámetro, carga los datos del producto y permite editarlo.
 * - Si no recibe id, permite registrar un nuevo producto.
 * - Valida campos obligatorios: nombre, fecha y usuario.
 * - En modo edición, solicita un captcha antes de actualizar.
 */
function ProductoForm() {
  // Estado local para los datos del producto
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    estado: 'nuevo',
    usuario: '',
  });

  const navigate = useNavigate();
  const { id } = useParams(); // id del producto si es edición

  // Carga los datos del producto si hay id (modo edición)
  useEffect(() => {
    if (id) {
      obtenerProductoPorId(id).then((data) => {
        if (data && data.id) {
          setProducto(data);
        } else {
          Swal.fire('Error', 'Producto no encontrado', 'error');
          navigate('/crud/consultar');
        }
      });
    }
  }, [id, navigate]);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {object} e - Evento de cambio
   */
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  /**
   * Maneja el envío del formulario.
   * - Valida campos obligatorios.
   * - Si es edición, solicita captcha antes de actualizar.
   * - Llama a la API para crear o actualizar el producto.
   * @param {object} e - Evento de envío
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!producto.nombre || !producto.fecha || !producto.usuario) {
      Swal.fire('Faltan datos', 'Completa todos los campos obligatorios', 'warning');
      return;
    }

    // Si es edición, pedir captcha antes de actualizar
    if (id) {
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
    }

    try {
      if (id) {
        await actualizarProducto(id, producto);
        Swal.fire('Actualizado', 'Producto actualizado correctamente ✅', 'success');
      } else {
        await crearProducto(producto);
        Swal.fire('Guardado', 'Producto registrado correctamente ✅', 'success');
      }

      navigate('/crud/consultar');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo guardar el producto', 'error');
    }
  };

  // Renderiza el formulario
  return (
  <div className="form-container d-flex justify-content-center align-items-center">
    <form onSubmit={handleSubmit} className="form-card shadow p-4">
      <h4 className="mb-4 text-center fw-bold text-primary">
        {id ? 'Editar Producto' : 'Registrar Producto'}
      </h4>

      <div className="mb-3">
        <label>Nombre del Producto *</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          value={producto.descripcion}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label>Fecha de Adquisición *</label>
        <input
          type="date"
          name="fecha"
          className="form-control"
          value={producto.fecha}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Estado</label>
        <select
          name="estado"
          className="form-select"
          value={producto.estado}
          onChange={handleChange}
        >
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
          <option value="defectuoso">Defectuoso</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Usuario Asociado *</label>
        <input
          type="text"
          name="usuario"
          className="form-control"
          value={producto.usuario}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn w-100 text-white fw-bold" style={{ backgroundColor: '#7286D3' }}>
        {id ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  </div>
);

}

export default ProductoForm;
