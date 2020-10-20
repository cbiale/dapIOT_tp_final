const MQTT = require("mqtt");

function clienteMqtt() {
	const cliente = MQTT.connect("mqtt://mosquitto:1883");
	const r = require("../db/db");

	// al conectarse
	cliente.on("connect", () => {
		console.log("Conectado a servidor MQTT");
		cliente.subscribe("#");
	});

	// en caso de error al comenzar
	cliente.on("error", error => {
		console.log(`Error al conectarse: ${error}`);
	});

	// al recibir un mensaje
	cliente.on("message", (topico, mensaje) => {
		console.log(`Nuevo mensaje: ${topico} ${mensaje}`);
		try {
			var datos;
			if (topico.indexOf("/sensores") !== -1) {
				datos = JSON.parse(mensaje);
    			agregarMedicion(topico, datos);
			}
		} catch (error) {
			console.log("Mensaje mal formado o error al insertar");
		}
	});

	// agregar medición
	async function agregarMedicion(topico, mensaje) {
		if (topico.indexOf("/sensores") !== -1) {
			mensaje.dispositivoId = topico.substring(
				0,
				topico.indexOf("/sensores")
			);

			// controlo si existe el dispositivo
			var cantidad = await r
				.db("iot")
				.table("dispositivos")
				.filter({
					id: mensaje.dispositivoId
				})
				.count()
				.run(r.conn);

			if (cantidad != 0) {
				mensaje.tiempo = new Date().toJSON();
				console.log(`Agregando medición...`);

				try {
					// inserto dispositivo
					var resultado = await r
						.db("iot")
						.table("mediciones")
						.insert(mensaje)
						.run(r.conn);
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
