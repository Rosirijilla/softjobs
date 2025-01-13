const express = require('express');
const {registrarUsuario, loginUsuario, obtenerUsuario}=require('../controllers/usuarios');
const {validarToken} = require('../middlewares/authMiddleware');

const router = express.Router();

//Registrar usuario
router.post('/', registrarUsuario);

//Iniciar sesión
router.post('/login', loginUsuario);

//Obtener usuario autenticado
router.get('/', validarToken, obtenerUsuario);

module.exports = router;