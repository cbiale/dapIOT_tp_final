let r = require('../db/db');

// listado de dispositivos
exports.listarDispositivos = async function (req, res, next) {
    try {
        var datos = await r.db('iot').table('dispositivos').run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    resultado = await datos.toArray();
    res.status(200).json(resultado);
};

// obtener dispositivo
exports.obtenerDispositivo = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo dispositivo: ${id}`);

    try {
        var resultado = await r.db('iot').table('dispositivos').get(id).run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    res.status(200).json(resultado);
};

// eliminar dispositivo
exports.eliminarDispositivo = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Eliminando dispositivo: ${id}`);

    try {
        var resultado = await r.db('iot').table('dispositivos').get(id).delete().run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    res.status(200).json(resultado);
};