// backend
const cors = require('cors');
const express = require('express');
const app = express()
const puerto = 3001
const seriesRuteador = require('./api/rutas/series');

app.use(express.urlencoded( {extended: true})); // body parser
app.use(cors()); // uso de cors

// rutas
app.use('/series', seriesRuteador);

// listener
app.listen(puerto, () => {
  console.log(`Servicio en  http://localhost:${puerto}`)
})



app.get('/', (req, res) => {
  res.send('Series temporales!')
})


/*
const sdb = require('./build/Release/siridb');

var siridb = new sdb.SiriDBClient("iris", "siri", "iot", "localhost", 9000);


// consultar series
function obtenerSeries(siridb) {
    siridb.query("list series", (resp, status) => {
        console.log(`Estado: ${status}`);
        console.log(resp);
    });
}


function obtenerSerie(siridb, idEntidad, idDispositivo, sensor) {
    siridb.query("list series", (resp, status) => {
        console.log(`Estado: ${status}`);
        console.log(resp);
    });
}

function test_query(siridb) {
    siridb.query("select * from /.*series/", (resp, status) => {
        console.log(`Query Status: ${status}`);
        console.log(resp);
    });
}

function test_insert(siridb) {
    siridb.insert([{
        type: 'float',
        name: 'some float series',
        points: [
            [1505118253, 5.4],
            [1505118307, 7.1]
        ]
    }, {
        type: 'integer',
        name: 'some integer series',
        points: [
            [1505118253, 5],
            [1505118307, 7]
        ]
    }, {
        type: 'string',
        name: 'some string series',
        points: [
            [1505118253, 'Hello, what database is this?'],
            [1505118307, 'SiriDB!']
        ]
    }], (resp, status) => {
        console.log(`Insert Status: ${status}`);
        console.log(resp);
        siridb.close();
    });
}

siridb.onClose((msg) => {
    console.log(msg);
});

siridb.connect((err) => {
    if (err) {
        console.error(`Connection error: ${err}`);
    } else {
        obtenerSeries(siridb);
        //test_insert(siridb);
        //test_query(siridb);
    }
});
*/