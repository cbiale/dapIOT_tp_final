let siridb = require('../db/db');

// obtener datos de una serie
exports.obtenerDatos = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo datos de: ${id}`);

    // controlo que exista la serie
    siridb.query("count series \"" + id + "\"", (resultado, status) => {
        // si existe
        if (resultado.series === 1) {
            // consulto la serie
            siridb.query("select * from \"" + id + "\"", (resultado, status) => {
                console.log(`Estado: ${status}`);
                console.log(resultado);
                // si funciona retorno datos
                if (status === 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(404).json({ error: '404', mensaje: 'No encontrado' });
                }
            });
        } else {
            res.status(404).json({ error: '404', mensaje: 'No encontrado' });
        }
    });
};

// insertar datos en una serie
exports.insertarDatos = async function (req, resp, next) {

    const serie = req.body.serie;
    const tiempo = req.body.tiempo;
    const valor = req.body.valor;

    // inserto datos en la serie
    siridb.insert([{
        name: serie,
        points: [
            [tiempo, valor]
        ]
    }], (resp, status) => {
        console.log(`Resultado de insertar: ${status}`);
        console.log(resp);
        resp.status(201).end();
    });


};