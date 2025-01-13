//Importar
const {Pool} = require('pg'); //Importar pg
require('dotenv').config(); //Carga variables entorno desde .env

//Configuració conexión
const pool = new Pool({
    host: process.env.DB_HOST,        // Host de la base de datos
    user: process.env.DB_USER,        // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    database: process.env.DB_NAME,    // Nombre de la base de datos
    port: process.env.DB_PORT || 5432 // Puerto de PostgreSQL (por defecto 5432)
});

//Manejo errores conexión
pool.on('error', (err)=>{
    console.log('Error en la conexión a la base de datos:', err.stack);   
});

//Exportar conexión
module.exports = {pool};
