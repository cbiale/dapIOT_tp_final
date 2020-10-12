<script>
    // validar formulario, basado en: https://codechips.me/svelte-form-validation-with-yup/

    import { onMount } from "svelte";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";
    import { dispositivoEsquema } from "../esquemas/dispositivos.esquema";
    import Ruteador from "../rutas/Ruteador.svelte";

    let dispositivo;

    // datos formulario
    let valores = {};
    let errores = {};

    onMount(async () => {
        valores.denominacion = "";
        valores.latitud = "";
        valores.longitud = "";
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
                dispositivosServicio.agregarDispositivo(valores).
                then(() => location.replace("/dispositivos") );
                
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
    <h2>Dispositivo Nuevo</h2>

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
        <Button color="secondary" variant="raised" type="submit">Guardar</Button>
    </form>

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
