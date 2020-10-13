// base de datos
let r = require('rethinkdb');

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
  let dbs = await r.dbList().run(r.conn);

  if (! dbs.find(db => db === 'iot')) {
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
}



module.exports = r;