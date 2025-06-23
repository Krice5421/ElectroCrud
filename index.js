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

// Aquí puedes agregar POST, PUT, DELETE si lo necesitas

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
