// backend
const cors = require('cors');
const express = require('express');
const app = express()
const puerto = 3000

const dispositivosRuteador = require('./api/rutas/dispositivos');
const sensoresRuteador = require('./api/rutas/sensores');
const actuadoresRuteador = require('./api/rutas/actuadores');
const entidadesRuteador = require('./api/rutas/entidades');

app.use(express.urlencoded( {extended: true})); // body parser
app.use(cors()); // uso de cors

// rutas
app.use('/api/v1/dispositivos', dispositivosRuteador);
//app.use('/sensores', sensoresRuteador);
//app.use('/actuadores', actuadoresRuteador);
//app.use('/entidades', entidadesRuteador);

app.get('/', (req, res) => {
  res.send('Dispositivos')
})


// listener
app.listen(puerto, () => {
  console.log(`Servicio en  http://localhost:${puerto}`)
})
