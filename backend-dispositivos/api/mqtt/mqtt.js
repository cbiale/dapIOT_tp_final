const MQTT = require("mqtt");

function clienteMqtt() {
    const cliente = MQTT.connect("mqtt://mosquitto:1883");
    const r = require('../db/db');

    // al conectarse
    cliente.on('connect', () => {
        console.log("Conectado a servidor MQTT");
        cliente.subscribe('#');
    });

    // en caso de error al comenzar
    cliente.on("error", (error) => {
        console.log(`Error al conectarse: ${error}`);
    });

    // al recibir un mensaje
    cliente.on('message', (topico, mensaje) => {
        try {
            let datos;
            if (topico.indexOf("/sensores") != -1) {
                datos = JSON.parse(mensaje);
            }
            try {
                agregarMedicion(topico, datos);
            } catch (error) {
                console.log("Error al insertar datos");
            }
        } catch (error) {
            console.log("Mensaje mal formado");
        }

    });

    // agregar medición
    async function agregarMedicion(topico, mensaje) {
        console.log(mensaje);
        if (topico.indexOf("/sensores") != -1) {
            mensaje.dispositivoId = topico.substring(0, topico.indexOf("/sensores"));

            // controlo si existe el dispositivo 
            let cantidad = await r.db('iot').table('dispositivos')
                .filter(
                    {
                        id: mensaje.dispositivoId
                    }
                ).count().run(r.conn);

            if (cantidad != 0) {
                mensaje.tiempo = new Date().toJSON();
                console.log(`Agregando medición...`);

                try {
                    // inserto dispositivo
                    let resultado = await r.db('iot').table('mediciones')
                        .insert(mensaje).run(r.conn);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Dispositivo erroneo");
            }
        }
    }
}

exports.clienteMqtt = clienteMqtt;