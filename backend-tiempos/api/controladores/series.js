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

    // datos a recibir
    const tipo = req.body.tipo;
    const serie = req.body.serie;
    const tiempo = Number.parseInt(req.body.tiempo, 10);

    // tipo de datos a guardar (float o string)
    let valor;
    if (tipo === 'float') {
        valor = Number.parseFloat(req.body.valor, 10);
    } else {
        valor = req.body.valor;
    } 
    
    // defino objeto a guardar
    let objeto = [{
        type: tipo,
        name: serie,  
        points: [         
            [tiempo, valor]
        ]
    }];

    console.log(objeto);

    // inserto datos en la serie
    siridb.insert(objeto, (resultado, status) => {
        if (status) {
            console.error(`Error: ${resultado.error_msg} (${status})`);
            res.status(400).json({ error: '400', mensaje: 'Error al insertar' });
        } else {
            console.log(resultado.success_msg);
            resp.status(201).end();  
        }
    });

};