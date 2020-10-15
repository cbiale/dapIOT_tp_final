<script>
    
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table/bare.js";
    import "@smui/data-table/bare.css";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";
    import { logsServicio } from "../servicios/logs.servicio";
    import { onMount } from "svelte";
  
    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let logs = [];


    onMount(async () => {
        await logsServicio
            .obtenerLogs(id)
            .then((respuesta) => respuesta.json())
            .then((resultado) => (logs = resultado));        
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

    {#if logs}
        <p>Id <b>{id}</b></p>
    {/if}

    <DataTable table$aria-label="Listado de Logs">
        <Head>
            <Row>
                <Cell>Momento</Cell>
                <Cell>Estado</Cell>
            </Row>
        </Head>
        <Body>
            {#each logs as log}
                <Row>
                    <Cell>{log.tiempo}</Cell>
                    <Cell>{log.estado}</Cell>
                </Row>
            {/each}
        </Body>
    </DataTable>
    <hr />
    <a href="/dispositivos/{id}">
        <Button variant="outlined">
            <Label>Volver</Label>
        </Button>
    </a>
</main>
