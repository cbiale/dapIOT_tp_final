let r = require('../db/db');

// listado de mediciones
exports.listarMediciones = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo mediciones de : ${id}`);

    try {
        var datos = await r.db('iot').table('mediciones')
            .filter({ 'dispositivoId': id }).run(r.conn);
    } catch (err) {
        console.warn(err);
    }
    resultado = await datos.toArray();
    res.status(200).json(resultado);
};


// agregar medición
exports.agregarMedicion = async function (req, res, next) {
    console.log(`Agregando medición...`);
    console.log(req.body);

    try {
        // inserto dispositivo
        var resultado = await r.db('iot').table('mediciones').insert
            (
                req.body
            ).
            run(r.conn);
        res.status(201).json();
    } catch (err) {
        console.warn(err);
        res.status(400).json({ error: '400', mensaje: 'Error al insertar' });
    }
};

