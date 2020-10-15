let r = require('../db/db');

// listado de mediciones
exports.listarLogs = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo logs de : ${id}`);

    try {
        let datos = await r.db('iot').table('logs')
            .orderBy({ index: r.desc('tiempo') })
            .filter({ 'dispositivoId': id }).run(r.conn);
    } catch (err) {
        console.warn(err);
    }
    let resultado = await datos.toArray();
    res.status(200).json(resultado);
};

exports.agregarLog = async function (req, res, next) {
    console.log(`Agregando log...`);
    // datos a recibir
    const id = req.body.dispositivoId;
    const estado = req.body.ultimoEstado;
    const tiempo = new Date().toJSON();

    let cantidad = await r.db('iot').table('dispositivos')
        .filter(
            {
                id: id
            }).count().run(r.conn);

    if (cantidad != 0) {
        try {
            // inserto dispositivo
            let resultado = await r.db('iot').table('logs').insert
                ({
                    dispositivoId: id,
                    tiempo: tiempo,
                    estado: estado
                }).
                run(r.conn);
        } catch (err) {
            console.warn(err);
        }
    } else {
        console.log("Dispositivo erroneo");
    }
}
