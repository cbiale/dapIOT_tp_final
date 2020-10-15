<script>
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table/bare.js";
    import "@smui/data-table/bare.css";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";
    import { medicionesServicio } from "../servicios/mediciones.servicio";
    import { onMount } from "svelte";

    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let mediciones = [];

    onMount(async () => {
        await medicionesServicio
            .obtenerDatos(id)
            .then((respuesta) => respuesta.json())
            .then((resultado) => (mediciones = resultado));

        mediciones = mediciones.reverse();
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
    <a href="/dispositivos/{id}">
        <Button variant="outlined">
            <Label>Volver</Label>
        </Button>
    </a>
    <hr />

    <h2>Dispositivo</h2>

    {#if mediciones}
        <p>Id <b>{id}</b></p>

        <DataTable table$aria-label="Listado de Dispositivos">
            <Head>
                <Row>
                    <Cell>Momento</Cell>
                    <Cell>Temperatura</Cell>
                    <Cell>Humedad</Cell>
                </Row>
            </Head>
            <Body>
                {#each mediciones as medicion}
                    <Row>
                        <Cell>{medicion.tiempo}</Cell>
                        <Cell>{medicion.temperatura}</Cell>
                        <Cell>{medicion.humedad}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}
    <hr />
    <a href="/dispositivos/{id}">
        <Button variant="outlined">
            <Label>Volver</Label>
        </Button>
    </a>
</main>
