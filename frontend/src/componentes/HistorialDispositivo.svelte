<script>
    import { onMount } from "svelte";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";
    import { seriesServicio } from "../servicios/series.servicio";

    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let dispositivo;
    let seriesHumedad;
    let seriesTemperatura;
    let seriesActuador;
    let terminado;

    onMount(async () => {
        try {
            await seriesServicio
                .obtenerDatos(id + "-Humedad")
                .then((respuesta) => respuesta.json())
                .then((resultado) => (seriesHumedad = resultado));
            await seriesServicio
                .obtenerDatos(id + "-Temperatura")
                .then((respuesta) => respuesta.json())
                .then((respuesta) => (seriesTemperatura = respuesta));
            await seriesServicio
                .obtenerDatos(id + "-Actuador")
                .then((respuesta) => respuesta.json())
                .then((resultado) => (seriesHumedad = resultado));
            terminado = true;
        } catch (err) {
            terminado = true;
        }
    });
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

    {#if terminado}
        <p>Id <b>{id}</b></p>
    {/if}

    <hr />
    <a href="/dispositivos/{id}">
        <Button variant="outlined">
            <Label>Volver</Label>
        </Button>
    </a>
</main>
