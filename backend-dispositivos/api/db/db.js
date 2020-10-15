let r = require('rethinkdb');
const { clienteMqtt } = require('../mqtt/mqtt');

// iniciar base de datos
r.connect({ host: process.env.HOST || "localhost", port: 28015 }, function (err, conn) {
    if (err) {
        throw new Error(err);
    }
    r.conn = conn;
    console.log('Conectado a la base de datos rethinkdb');
    iniciar();
})


async function iniciar() {
    console.log("iniciar iniciado");
    let dbs = await r.dbList().run(r.conn);

    if (!dbs.find(db => db === 'iot')) {
        await r.dbCreate('iot').run(r.conn);
        await r.db('iot').tableCreate('dispositivos').run(r.conn);
        await r.db('iot').tableCreate('entidades').run(r.conn);
        await r.db('iot').tableCreate('sensores').run(r.conn);
        await r.db('iot').tableCreate('actuadores').run(r.conn);
        await r.db('iot').tableCreate('mediciones').run(r.conn);
        await r.db('iot').table('mediciones').indexCreate('tiempo').run(r.conn);
        await r.db('iot').tableCreate('logs').run(r.conn);
        await r.db('iot').table('logs').indexCreate('tiempo').run(r.conn);
    }
    console.log("iniciar finalizado");
    // espero 5 segundos para iniciar el cliente MQTT
    sleep(5); 
    // inicio cliente MQTT 
    // Lo pongo en este punto para asegurarme inicie luego de la base de datos   
    clienteMqtt();
}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
    msleep(n * 1000);
}

module.exports = r;