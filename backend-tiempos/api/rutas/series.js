var express = require('express');
var seriesRuteador = express.Router();
var seriesControlador = require('../controladores/series');

// obtener datos de una serie
seriesRuteador.get('/:id', seriesControlador.obtenerDatos);
seriesRuteador.post('/', seriesControlador.insertarDatos);

module.exports = seriesRuteador;