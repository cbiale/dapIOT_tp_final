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
app.use('/dispositivos', dispositivosRuteador);
app.use('/sensores', sensoresRuteador);
app.use('/actuadores', actuadoresRuteador);
app.use('/entidades', entidadesRuteador);

// listener
app.listen(puerto, () => {
  console.log(`Servicio en  http://localhost:${puerto}`)
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*

app.post('/dispositivos', (req, res) => {
  let datos = req.body;
  r.db('iot').table('dispositivos').insert(datos, {returnChanges: true}).run(conexion, function(err, resultado) {
    if (resultado.inserted !== 1) {
      throw err;
    }
    else {
      res.status(200).json(resultado.changes[0].new_val);
    }
});
})

app.get('/dispositivos/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('dispositivos').get(id).run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})

app.delete('/dispositivos/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('dispositivos').get(id).delete().run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})


app.get('/sensores', (req, res) => {
  r.db('iot').table('sensores').run(conexion, function (err, cursor) {
    if (err) throw err;
    cursor.toArray(function (err, resultado) {
      if (err) throw err;
      console.log(JSON.stringify(resultado, null, 2));
      res.status(200).json(resultado);
    });
  });
})

app.get('/sensores/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('sensores').get(id).run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})

app.delete('/sensores/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('sensores').get(id).delete().run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})



app.get('/actuadores', (req, res) => {
  r.db('iot').table('actuadores').run(conexion, function (err, cursor) {
    if (err) throw err;
    cursor.toArray(function (err, resultado) {
      if (err) throw err;
      console.log(JSON.stringify(resultado, null, 2));
      res.status(200).json(resultado);
    });
  });
})

app.get('/actuadores/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('actuadores').get(id).run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})

app.delete('/actuadores/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  r.db('iot').table('actuadores').get(id).delete().run(conexion, function (err, resultado) {
    if (err) throw err;
    console.log(JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  });
})

*/