var express = require('express');
var dispositivosRuteador = express.Router();
var dispositivosControlador = require('../controladores/dispositivos');

// falta editar y agregar
dispositivosRuteador.get('/', dispositivosControlador.listarDispositivos);
dispositivosRuteador.get('/:id', dispositivosControlador.obtenerDispositivo);
dispositivosRuteador.delete('/:id', dispositivosControlador.eliminarDispositivo);

module.exports = dispositivosRuteador;