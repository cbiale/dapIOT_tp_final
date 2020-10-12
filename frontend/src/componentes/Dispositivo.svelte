<script>
    // validar formulario, basado en: https://codechips.me/svelte-form-validation-with-yup/

    import { onMount } from "svelte";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";
    import { seriesServicio } from "../servicios/series.servicio";

    import { dispositivoEsquema } from "../esquemas/dispositivos.esquema";

    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let dispositivo;
    let seriesHumedad;
    let seriesTemperatura;

    // datos formulario
    let valores = {};
    let errores = {};

    onMount(async () => {
        await dispositivosServicio
            .obtenerDispositivo(id)
            .then((respuesta) => respuesta.json())
            .then((resultado) => (dispositivo = resultado));

        valores.denominacion = dispositivo.denominacion;
        valores.latitud = dispositivo.ubicacion.coordinates[1];
        valores.longitud = dispositivo.ubicacion.coordinates[0];

        await seriesServicio
            .obtenerDatos(id + "-Humedad")
            .then((respuesta) => respuesta.json())
            .then((resultado) => (seriesHumedad = resultado));
        await seriesServicio
            .obtenerDatos(id + "-Temperatura")
            .then((respuesta) => respuesta.json())
            .then((respuesta) => (seriesTemperatura = respuesta));
        console.log(seriesHumedad);
        console.log(seriesTemperatura);
        console.log(seriesHumedad.length);
        for (let i = 0; i < seriesHumedad.length; i++) {
            console.log(new Date(seriesHumedad[i][0]).toString());
        }
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
                alert(JSON.stringify(valores, null, 2));
                dispositivosServicio.modificarDispositivo(dispositivo.id, valores);
            })
            .catch((err) => (errores = capturarErrores(err)));
    };
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

    {#if dispositivo}
        <p> Id <b>{dispositivo.id}</b> </p>    
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
            <Button variant="outlined" type="submit">Guardar</Button>
        </form>
    {/if}

    <hr/>
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
