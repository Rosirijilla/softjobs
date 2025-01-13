const verificarCredenciales = (req, res, next) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'El email y la contraseña son obligatorios.'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return res.status(400).json({error: 'El email tiene un formato inválido.'});
    }

    if (password.length<6){
        return res.status(400).json({error: 'La contraseña debe tener al menos 6 caracteres.'});
    }

    next();
};

module.exports = {verificarCredenciales};