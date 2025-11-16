const express = require("express");
const cors = require("cors");
const path = require("path");

// Importar rutas
const funkosRoutes = require("./rutes/funkosRoutes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.use("/api/funkos", funkosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Funkos funcionando 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});