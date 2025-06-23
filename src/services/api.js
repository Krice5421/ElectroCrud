const URL = 'https://tu-api-render.onrender.com/productos';

/**
 * Obtiene la lista de todos los productos.
 * @returns {Promise<Array>} Array de productos
 */
export async function obtenerProductos() {
  const res = await fetch(URL);
  return res.json();
}

/**
 * Crea un nuevo producto.
 * @param {Object} producto - Objeto con los datos del producto
 * @returns {Promise<Response>} Respuesta de la API
 */
export async function crearProducto(producto) {
  return fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
}

/**
 * Elimina un producto por su ID.
 * @param {string} id - ID del producto a eliminar
 * @returns {Promise<Response>} Respuesta de la API
 */
export async function eliminarProducto(id) {
  return fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Obtiene un producto por su ID.
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export const obtenerProductoPorId = async (id) => {
  const res = await fetch(`http://localhost:3001/productos/${id}`);
  return await res.json();
};

/**
 * Actualiza un producto existente.
 * @param {string} id - ID del producto
 * @param {Object} producto - Objeto con los datos actualizados
 * @returns {Promise<Response>} Respuesta de la API
 */
export const actualizarProducto = async (id, producto) => {
  return await fetch(`http://localhost:3001/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
};
