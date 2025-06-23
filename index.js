import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Lee el archivo JSON de forma síncrona
const db = JSON.parse(readFileSync('./db.json', 'utf-8'));

app.get('/productos', (req, res) => {
  res.json(db.productos);
});

app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  // Asigna un ID numérico único (por ejemplo, usando Date.now())
  nuevoProducto.id = Date.now();
  db.productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.productos.findIndex(p => p.id === id);
  if (index !== -1) {
    db.productos.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = db.productos.find(p => p.id === id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.put('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.productos.findIndex(p => p.id === id);
  if (index !== -1) {
    db.productos[index] = { ...db.productos[index], ...req.body, id };
    res.json(db.productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
