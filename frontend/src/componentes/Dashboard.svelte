<script>
    import Chart from "svelte-frappe-charts";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import { seriesServicio } from "../servicios/series.servicio";
    import { onMount } from "svelte";

    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let dispositivo;
    let seriesHumedad;
    let seriesTemperatura;
    let vLabels = [];
    let vHumedad = [];
    let vTemperatura = [];

    onMount(async () => {
        await seriesServicio
            .obtenerDatos(id + "-Humedad")
            .then((respuesta) => respuesta.json())
            .then((resultado) => (seriesHumedad = resultado));
        await seriesServicio
            .obtenerDatos(id + "-Temperatura")
            .then((respuesta) => respuesta.json())
            .then((resultado) => (seriesTemperatura = resultado));

        console.log(seriesHumedad.length);
        console.log(seriesTemperatura.length);

        const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        for (let i = 0; i < seriesHumedad.length; i++) {
            vLabels.push(
                new Date(seriesHumedad[i][0]).toLocaleDateString(
                    "es-es",
                    options
                )
            );
            vHumedad.push(seriesHumedad[i][1]);
            vTemperatura.push(seriesTemperatura[i][1]);
        }
    });

    var data = {
        labels: vLabels,
        datasets: [
            {
                name: "Temperatura",
                values: vTemperatura,
            },
            {
                name: "Humedad",
                values: vHumedad,
            },
        ],
    };
    let referencia;
    const exportar = () => referencia.exportChart();
</script>

<style>
    h2 {
        color: #ff3e00;
        font-size: 2em;
        font-weight: 100;
    }
</style>

<main>
    <h2>Dispositivo {id}</h2>
    <Chart {data} type="line" bind:this={referencia} />
    <Button on:click={exportar} variant="outlined">
        <Label>Exportar</Label>
    </Button>
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
