const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {

    // leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Hubo un error'});
    }
    
}

exports.autenticarUsuario = async (req, res, next) => {
    // buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario) {
        // Si el usuario no existe
        await res.status(401).json({mensaje : 'Ese usuario no existe'});
        next();
    } else {
        // El usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password )) {
            // si el password es incorrecto
            await res.status(401).json({ mensaje : 'Password Incorrecto'});
            next();
        } else {
            // password correcto, firmar el token
            const token = jwt.sign({
                email : usuario.email, 
                nombre: usuario.nombre, 
                id : usuario._id
            }, 
            'LLAVESECRETA', 
            {
                expiresIn : '1h'
            }); 

            // retornar el TOKEN
            res.json({ token });
        }


    }
}