var express = require('express');
var entidadesRuteador = express.Router();
var entidadesControlador = require('../controladores/entidades');

// falta editar y agregar
entidadesRuteador.get('/', entidadesControlador.listarEntidades);
entidadesRuteador.get('/:id', entidadesControlador.obtenerEntidad);
entidadesRuteador.delete('/:id', entidadesControlador.eliminarEntidad);

module.exports = entidadesRuteador;