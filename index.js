// Importar
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const usuariosRoutes = require("./routes/usuarios"); //Importar rutas

dotenv.config(); //Carga variables entorno desde .env

const app = express();

//Middlewares
app.use(bodyParser.json()); //Para parear el json
app.use(morgan("dev")); //Registras las solicitudes en la consola

// Rutas
app.use("/usuarios", usuariosRoutes);

//Middleware globales de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
});

//Prender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});

//Exportar app
module.exports = { app };
