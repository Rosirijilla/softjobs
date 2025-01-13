const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const validarToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Falta el token en el encabezado Authorization.'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        next();
    }catch(error){
        res.status(403).json({error: 'Token inválido o expirado.'});
    }
};

module.exports = {validarToken};