const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim : true
    },
    apellido : {
        type: String,
        trim : true
    },
    empresa : {
        type: String,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        lowercase: true, 
        trim: true
    },
    telefono : {
        type: String, 
        trim: true
    }
});

module.exports = mongoose.model('Clientes', clientesSchema);