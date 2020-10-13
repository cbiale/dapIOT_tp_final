var express = require('express');
var medicionesRuteador = express.Router();
var medicionesControlador = require('../controladores/mediciones');

// falta editar y agregar
medicionesRuteador.post('/', medicionesControlador.agregarMedicion);
medicionesRuteador.get('/:id', medicionesControlador.listarMediciones);

module.exports = medicionesRuteador;