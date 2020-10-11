let r = require('../db/db');

// listado de entidades
exports.listarEntidades = async function (req, res, next) {
    try {
        var datos = await r.db('iot').table('entidades').run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    resultado = await datos.toArray();
    res.status(200).json(resultado);
};

// obtener entidad
exports.obtenerEntidad = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo entidad: ${id}`);

    try {
        var resultado = await r.db('iot').table('entidades').get(id).run(r.conn);
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

// eliminar entidad
exports.eliminarEntidad = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Eliminando entidad: ${id}`);

    try {
        var resultado = await r.db('iot').table('entidades').get(id).delete().run(r.conn);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
    }
    res.status(200).json(resultado);
};