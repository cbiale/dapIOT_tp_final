var express = require('express');
var actuadoresRuteador = express.Router();
var actuadoresControlador = require('../controladores/actuadores');

// falta editar y agregar
actuadoresRuteador.get('/', actuadoresControlador.listarActuadores);
actuadoresRuteador.get('/:id', actuadoresControlador.obtenerActuador);
actuadoresRuteador.delete('/:id', actuadoresControlador.eliminarActuador);

module.exports = actuadoresRuteador;