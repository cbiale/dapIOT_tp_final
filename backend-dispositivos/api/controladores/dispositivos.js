let r = require('../db/db');

// listado de dispositivos
exports.listarDispositivos = async function (req, res, next) {
    try {
        var datos = await r.db('iot').table('dispositivos').filter(
            {
                borrado: 0
            }
        ).run(r.conn);
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
        console.warn(err);
    }
    res.status(200).json(resultado);
};

// eliminar dispositivo
exports.eliminarDispositivo = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Eliminando dispositivo: ${id}`);

    try {
        var resultado = await r.db('iot').table('dispositivos').get(id).update(
            { borrado: 1 }
        ).run(r.conn);
    } catch (err1) {
        console.warn(err);
    }
    res.status(200).json(resultado);
};

// agregar dispositivo
exports.agregarDispositivo = async function (req, res, next) {
    console.log(`Agregando dispositivo...`);
    console.log(req.body);

    // datos a recibir
    const denominacion = req.body.denominacion;
    const longitud = Number.parseFloat(req.body.longitud, 10);
    const latitud = Number.parseFloat(req.body.latitud, 10);

    try {
        // inserto dispositivo
        var resultado = await r.db('iot').table('dispositivos').insert
            (
                {
                    denominacion: denominacion,
                    ubicacion: r.point(longitud, latitud),
                    borrado: 0
                }
            ).
            run(r.conn);
        res.status(201).end();
    } catch (err) {
        console.warn(err);
        res.status(400).json({ error: '400', mensaje: 'Error al insertar' });
    }
};

// modificar dispositivo
exports.modificarDispositivo = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Modificando dispositivo: ${id}`);
    console.log(req.body);

    // datos a recibir
    const denominacion = req.body.denominacion;
    const longitud = Number.parseFloat(req.body.longitud, 10);
    const latitud = Number.parseFloat(req.body.latitud, 10);

    try {
        var resultado = await r.db('iot').table('dispositivos').get(id).update(
            {
                denominacion: denominacion,
                ubicacion: r.point(longitud, latitud),
                borrado: 0
            }
        ).run(r.conn);
    } catch (err) {
        console.warn(err);
    }
    res.status(200).json(resultado);
};