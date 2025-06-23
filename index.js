const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = require('./db.json'); // tu archivo JSON con productos

app.get('/productos', (req, res) => {
  res.json(db.productos);
});

// Si quieres puedes agregar POST, PUT, DELETE aquí

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
