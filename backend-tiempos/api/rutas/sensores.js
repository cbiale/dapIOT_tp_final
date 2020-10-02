var express = require('express');
var sensoresRuteador = express.Router();
var sensoresControlador = require('../controladores/sensores');

// obtener datos de los sensores
sensoresRuteador.get('/:id', sensoresControlador.obtenerMediciones);

module.exports = sensoresRuteador;