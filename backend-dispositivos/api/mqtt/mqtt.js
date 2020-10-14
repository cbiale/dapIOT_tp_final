const MQTT = require("mqtt");

function clienteMqtt() {
    const cliente = MQTT.connect("mqtt://mosquitto:1883");
    const r = require('../db/db');

    function msleep(n) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }

    function sleep(n) {
        msleep(n * 1000);
    }

    // al conectarse
    cliente.on('connect', () => {
        console.log("Conectado a servidor MQTT");
        sleep(5);
        console.log("Escuchando MQTT");
        cliente.subscribe('#');
    });

    // en caso de error al comenzar
    cliente.on("error", (error) => {
        console.log(`Error al conectarse: ${error}`);
    });

    // al recibir un mensaje
    cliente.on('message', (topico, mensaje) => {
        try {
            let datos = JSON.parse(mensaje);
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
        if (topico.indexOf("/sensores") != -1) {
            mensaje.dispositivoId = topico.substring(0, topico.indexOf("/sensores"));

            let cantidad = await r.db('iot').table('dispositivos')
                .filter(
                    {
                        id: mensaje.dispositivoId
                    }).count().run(r.conn);
                    
            if (cantidad != 0) {
                mensaje.tiempo = new Date().toJSON();
                console.log(`Agregando medición...`);
                console.log(mensaje);

                try {
                    // inserto dispositivo
                    var resultado = await r.db('iot').table('mediciones').insert
                        (
                            mensaje
                        ).
                        run(r.conn);
                } catch (err) {
                    console.warn(err);
                }
            } else {
                console.log("Dispositivo erroneo");
            }
        }
    }
}

    exports.clienteMqtt = clienteMqtt;