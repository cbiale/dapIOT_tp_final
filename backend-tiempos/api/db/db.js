// base de datos
const sdb = require('../../build/Release/siridb');
let siridb = new sdb.SiriDBClient("iris", "siri", "iot", "localhost", 9000);

// iniciar base de datos
siridb.connect((err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = siridb;