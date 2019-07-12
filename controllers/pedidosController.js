const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    })

    if(!pedido) {
        res.json({mensaje : 'Ese no pedido no existe'});
        return next();
    }

    // mostrar el pedido
    res.json(pedido);
}

// Actualizar el pedido via ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        } )
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

// elimina un pedido por su id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id : req.params.idPedido});
        res.json({ mensaje : 'El pedido se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}