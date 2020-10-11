var express = require('express');
var sensoresRuteador = express.Router();
var sensoresControlador = require('../controladores/sensores');

// falta editar y agregar
sensoresRuteador.get('/', sensoresControlador.listarSensores);
sensoresRuteador.get('/:id', sensoresControlador.obtenerSensor);
sensoresRuteador.delete('/:id', sensoresControlador.eliminarSensor);

module.exports = sensoresRuteador;