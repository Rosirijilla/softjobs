const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require('../config/database');
const SECRET_KEY = process.env.SECRET_KEY;

//Registrar usuario
const registrarUsuario = async (req, res)=>{
    const {email, password, rol, lenguaje} = req.body;
    try{
        const hasheadPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hasheadPassword, rol, lenguaje]
        );
        res.status(201).json({usuario: result.rows[0]});
    }catch (error){
        res.status(500).json({error: 'Error al registrar el usuario.'});
    }
};

//Iniciar Sesión 

const loginUsuario = async (req, res)=>{
    const {email, password}= req.body;
    try{
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Usuario no encontrado.'});
        }
        const usuario = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if(!isPasswordValid){
            return res.status(401).json({error: 'Contraseña incorrecta.'});
        }

        const token = jwt.sign({email: usuario.email}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        res.status(500).json({error: 'Error al iniciar sesión.'});
    }
};

//Obtener usuario autenticado
const obtenerUsuario = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [req.user.email]);
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Usuario no encontrado.'});
        }
        res.json({usuario: result.rows[0]});
    }catch(error){
        res.status(500).json({error: 'Error al obtener el usuario.'});
    }
    
};

module.exports = { registrarUsuario, loginUsuario, obtenerUsuario };