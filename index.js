// Importar
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rutas


app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});

//Exportar
module.exports = { app, pool };
