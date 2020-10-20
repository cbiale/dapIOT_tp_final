<script>
	// validar formulario, basado en: https://codechips.me/svelte-form-validation-with-yup/

	import { onMount } from "svelte";
	import Button, { Label, Icon } from "@smui/button/bare.js";
	import "@smui/button/bare.css";

	import { dispositivosServicio } from "../servicios/dispositivos.servicio";
	import { dispositivoEsquema } from "../esquemas/dispositivos.esquema";
	import { logsServicio } from "../servicios/logs.servicio";

    const cliente = mqtt.connect("ws://:9001");

	// dato pasado al componente
    export let id;
    
    // topico de Mqtt
    let topico = `${id}/cambio`;

	// datos obtenidos del backend
	let dispositivo;
	let datosLogs;

	// datos formulario
	let valores = {};
	let errores = {};
	let estado = {};

	onMount(async () => {
		await dispositivosServicio
			.obtenerDispositivo(id)
			.then((respuesta) => respuesta.json())
			.then((resultado) => (dispositivo = resultado));

		await logsServicio
			.obtenerLogs(id)
			.then((respuesta) => respuesta.json())
			.then((resultado) => (datosLogs = resultado));
		console.log(datosLogs);

		if (datosLogs.length > 0) {
			estado.ultimoEstado = datosLogs[0].estado;
		} else {
			estado.ultimoEstado = "Desactivado";
		}
		estado.dispositivoId = id;
		valores.denominacion = dispositivo.denominacion;
		valores.latitud = dispositivo.ubicacion.coordinates[1];
		valores.longitud = dispositivo.ubicacion.coordinates[0];
	});

	const capturarErrores = ({ inner }) => {
		return inner.reduce((acc, err) => {
			return { ...acc, [err.path]: err.message };
		}, {});
	};

	const guardar = () => {
		dispositivoEsquema
			.validate(valores, { abortEarly: false })
			.then(() => {
				valores.denominacion = valores.denominacion.toUpperCase();
				dispositivosServicio
					.modificarDispositivo(dispositivo.id, valores)
					.then(() => location.replace("/dispositivos"));
			})
			.catch((err) => (errores = capturarErrores(err)));
	};

    
	// Mqtt
	// al conectarse
    cliente.on("connect", () => {
		console.log("Cliente conectado a servidor MQTT");
		cliente.subscribe("#");
	});

	// en caso de error al comenzar
	cliente.on("error", (error) => {
		console.log(`Error al conectarse el cliente: ${error}`);
	});

	// cambio de estado
	async function cambiar() {
        let cambio;
		if (estado.ultimoEstado === "Activado") {
            estado.ultimoEstado = "Desactivado";
            cambio = "0";
		} else {
            estado.ultimoEstado = "Activado";
            cambio = "1";
		}
		// uso websocket mediante mqtt.js (lado cliente)
		cliente.publish(topico, cambio, { qos: 0 }, function (err) {
			if (err) {
				console.log(`Error al publicar ${topico}: ${err}`);
			}
		});
		// usando REST para base de datos
		logsServicio
			.agregarLog(estado)
			.then(() => location.replace(`/dispositivos/${dispositivo.id}`));
	}
</script>

<style>
	h2 {
		color: #ff3e00;
		font-size: 2em;
		font-weight: 100;
	}
</style>

<main>
	<h2>Dispositivo</h2>

	{#if dispositivo && estado}
		<p>Id <b>{dispositivo.id}</b></p>
		<form on:submit|preventDefault={guardar}>
			<label for="denominacion">Denominación</label>
			<div>
				<input
					id="denominacion"
					name="denominacion"
					type="text"
					bind:value={valores.denominacion}
					placeholder="denominación del dispositivo" />
				{#if errores.denominacion}{errores.denominacion}{/if}
			</div>
			<label for="latitud">Latitud</label>
			<div>
				<input
					id="latitud"
					name="latitud"
					type="text"
					bind:value={valores.latitud}
					placeholder="latitud del dispositivo" />
				{#if errores.latitud}{errores.latitud}{/if}
			</div>
			<label for="longitud">Longitud</label>
			<div>
				<input
					id="longitud"
					name="longitud"
					type="text"
					bind:value={valores.longitud}
					placeholder="longitud del dispositivo" />
				{#if errores.longitud}{errores.longitud}{/if}
			</div>
			<div>
                <p>Estado luz: {estado.ultimoEstado}</p>
			</div>
			<Button color="secondary" variant="raised" type="submit">
				Guardar
			</Button>
			<a href="/dispositivos/{dispositivo.id}/mediciones">
				<Button variant="raised">Ver historial</Button>
			</a>
			<a href="/dispositivos/{dispositivo.id}/logs">
				<Button variant="raised">Ver logs</Button>
			</a>
		</form>

		<Button variant="raised" on:click={() => cambiar()}>
			Cambiar estado
		</Button>
	{/if}

	<hr />
	<a href="/">
		<Button variant="outlined">
			<Label>Mapa</Label>
		</Button>
	</a>
	<a href="/dispositivos">
		<Button variant="outlined">
			<Label>Listado</Label>
		</Button>
	</a>
</main>
