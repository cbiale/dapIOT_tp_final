const async = require("async");
const cors = require("cors");
const express = require("express");
const app = express();
const puerto = 3000;

app.use(express.json()); // body parser
app.use(cors()); // uso de cors

const dispositivosRuteador = require("./api/rutas/dispositivos");
const medicionesRuteador = require("./api/rutas/mediciones");
const logsRuteador = require("./api/rutas/logs");

// rutas
app.use("/api/v1/dispositivos", dispositivosRuteador);
app.use("/api/v1/mediciones", medicionesRuteador);
app.use("/api/v1/logs", logsRuteador);

app.get("/", (req, res) => {
	res.send("Dispositivos");
});

// listener
const servidor = app.listen(puerto, () => {
	console.log(`Servicio en  http://localhost:${puerto}`);
});
