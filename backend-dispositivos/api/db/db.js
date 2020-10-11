// base de datos
let r = require('rethinkdb');

// iniciar base de datos
r.connect({ host: '172.18.0.3', port: 28015 }, function (err, conn) {
  if (err) {
    throw new Error(err);
  }
  r.conn = conn;
  console.log('Conectado a la base de datos');
})

module.exports = r;