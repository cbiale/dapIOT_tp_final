let r = require('../db/db');

// listado de mediciones
exports.listarMediciones = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo mediciones de : ${id}`);

    try {
        let datos = await r.db('iot').table('mediciones')
            .orderBy({ index: r.desc('tiempo') })
            .filter({ 'dispositivoId': id }).run(r.conn);
    } catch (err) {
        console.warn(err);
    }
    let resultado = await datos.toArray();
    res.status(200).json(resultado);
};
