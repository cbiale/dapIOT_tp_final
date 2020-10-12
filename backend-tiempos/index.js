// backend
const cors = require('cors');
const express = require('express');
const app = express()
const puerto = 3001
const seriesRuteador = require('./api/rutas/series');

app.use(express.urlencoded( {extended: true})); // body parser
app.use(cors()); // uso de cors

// rutas
app.use('/api/v1/series', seriesRuteador);

// listener
app.listen(puerto, () => {
  console.log(`Servicio en  http://localhost:${puerto}`)
})


app.get('/', (req, res) => {
  res.send('Series temporales')
})

