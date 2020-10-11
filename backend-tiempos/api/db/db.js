// base de datos
const sdb = require('../../build/Release/siridb');
let siridb = new sdb.SiriDBClient("iris", "siri", "iot", process.env.HOST || "localhost", 9000);

// iniciar base de datos
siridb.connect((err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// si se cierra la conexión
siridb.onClose((msg) => {
  console.log(msg);
});


module.exports = siridb;