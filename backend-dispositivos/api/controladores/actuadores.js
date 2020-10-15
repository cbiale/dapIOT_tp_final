let r = require('../db/db');

// listado de actuadores
exports.listarActuadores = async function (req, res, next) {
    try {
        let datos = await r.db('iot').table('actuadores').run(r.conn);
        let resultado = await datos.toArray();
        res.status(200).json(resultado);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
        res.status(400).json({ status: 400, message: err.message });
    }
};
 
// obtener actuador
exports.obtenerActuador = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo actuador: ${id}`);
    
    try {
        let resultado = await r.db('iot').table('actuadores').get(id).run(r.conn);
        res.status(200).json(resultado);
    } catch (err) {
        throw new Error(err);
        // analizar console.warn(err);
        res.status(400).json({ status: 400, message: err.message });
    }
};

// eliminar actuador
exports.eliminarActuador = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Eliminando actuador: ${id}`);

    try {
        let resultado = await r.db('iot').table('actuadores').get(id).delete().run(r.conn);
        res.status(200).json(resultado);
    } catch (err) {
        throw new Error(err);
        res.status(400).json({ status: 400, message: err.message });
        // analizar console.warn(err);
    }
};