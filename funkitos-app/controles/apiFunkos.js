// controllers/funkosController.js
const funkos = require("../src/funkos"); // Asumo que esta es la ruta a tu archivo funkos.js

// GET /api/funkos → Obtener todos los funkos o filtrados
exports.getFunkos = (req, res) => {
  const { nombre, franquicia } = req.query;
  let resultados = funkos;

  // --- CAMBIO CLAVE AQUÍ: Aseguramos que la cadena 'nombre' no esté vacía ---
  if (nombre && nombre.trim() !== '') {
    const texto = nombre.toLowerCase().trim(); // Limpiamos espacios
    resultados = resultados.filter(f =>
      f.nombre.toLowerCase().includes(texto)
    );
  }

  // Filtro por franquicia (coincidencia exacta)
  if (franquicia && franquicia.trim() !== '') {
    resultados = resultados.filter(
      f => f.franquicia.toLowerCase().trim() === franquicia.toLowerCase().trim()
    );
  }
  // --------------------------------------------------------------------------

  res.json(resultados);
};

// GET /api/funkos/:id → Obtener un funko por ID
exports.getFunkoById = (req, res) => {
  const { id } = req.params;
  // Usamos el array original de funkos aquí
  const funko = funkos.find(f => f.id === parseInt(id));

  if (!funko) {
    return res.status(404).json({ message: "Funko no encontrado" });
  }

  res.json(funko);
};