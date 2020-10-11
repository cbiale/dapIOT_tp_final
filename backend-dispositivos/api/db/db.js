// base de datos
let r = require('rethinkdb');

// iniciar base de datos
r.connect({ host: process.env.HOST || "localhost", port: 28015 }, function (err, conn) {
  if (err) {
    throw new Error(err);
  }
  r.conn = conn;
  console.log('Conectado a la base de datos rethinkdb');
})

module.exports = r;