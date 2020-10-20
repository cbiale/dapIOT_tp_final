var express = require('express');
var logsRuteador = express.Router();
var logsControlador = require('../controladores/logs');

logsRuteador.get('/:id', logsControlador.listarLogs);
logsRuteador.post('', logsControlador.agregarLog);

module.exports = logsRuteador;