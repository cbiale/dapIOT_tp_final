let siridb = require('../db/db');

// obtener mediciones
exports.obtenerMediciones = async function (req, res, next) {
    const id = req.params.id;
    console.log(`Obteniendo mediciones de: ${id}`);

    // controlo que exista la serie
    siridb.query("count series \"" + id + "\"", (resultado, status) => {
        if (resultado.series === 1) {
            siridb.query("select * from \"" + id + "\"", (resultado, status) => {
                console.log(`Estado: ${status}`);
                console.log(resultado);
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
