let r = require('../db/db');

// listado de sensores
exports.listarSensores = async function (req, res, next) {
    try {
        var datos = await r.db('iot').table('sensores').run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    resultado = await datos.toArray();
    res.status(200).json(resultado);
};

// obtener sensor
exports.obtenerSensor = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo sensor: ${id}`);

    try {
        var resultado = await r.db('iot').table('sensores').get(id).run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ error : '404', mensaje : 'No encontrado' });
    }
};

// eliminar sensor
exports.eliminarSensor = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Eliminando sensor: ${id}`);

    try {
        var resultado = await r.db('iot').table('sensores').get(id).delete().run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    res.status(200).json(resultado);
};