<script>
    import Chart from "svelte-frappe-charts";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import { medicionesServicio } from "../servicios/mediciones.servicio";
    import { onMount } from "svelte";
    import "@smui/button/bare.css";
      
    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let mediciones;
    let vLabels = [];
    let vHumedad = [];
    let vTemperatura = [];
    let data;


    onMount(async () => {
        await medicionesServicio
            .obtenerDatos(id)
            .then((respuesta) => respuesta.json())
            .then((resultado) => (mediciones = resultado));

        const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        console.log(mediciones);
        // series a usar
        vTemperatura = Object.keys(mediciones).map(
            (key) => mediciones[key].temperatura === undefined ? null : mediciones[key].temperatura
        );
        vHumedad = Object.keys(mediciones).map(
            (key) => mediciones[key].humedad === undefined ? null : mediciones[key].humedad
        );
        vLabels = Object.keys(mediciones).map((key) => mediciones[key].tiempo);
        // formate a labels
        for (var i= 0; i < vLabels.length; i++) {
            vLabels[i] = new Date(vLabels[i]).toLocaleDateString("ES-es", options);
        }
        console.log(vHumedad);
        console.log(vTemperatura);
        console.log(vLabels);
        data = {
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
    });

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
    {#if data}
        <Chart {data} type="line" bind:this={referencia} />
    {/if}
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
