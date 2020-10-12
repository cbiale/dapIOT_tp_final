<script>
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table/bare.js";
    import "@smui/data-table/bare.css";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";

    let dispositivos = [];
    let id;

    onMount(async () => {
        await dispositivosServicio
            .listarDispositivos()
            .then((respuesta) => respuesta.json())
            .then((resultado) => (dispositivos = resultado));
    });

    async function eliminar(id) {
        await dispositivosServicio.eliminarDispositivo(id);
        await dispositivosServicio
            .listarDispositivos()
            .then((respuesta) => respuesta.json())
            .then((resultado) => (dispositivos = resultado));
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
    <h2>Dispositivos</h2>
    <a href="/">
        <Button variant="outlined">
            <Label>Mapa</Label>
        </Button>
    </a>
    <a href="/dispositivos/nuevo">
        <Button variant="outlined">
            <Label>Nuevo dispositivo</Label>
        </Button>
    </a>
    <br />
    {#if dispositivos}
        <DataTable table$aria-label="Listado de Dispositivos">
            <Head>
                <Row>
                    <Cell>Id dispositivo</Cell>
                    <Cell>Denominación</Cell>
                </Row>
            </Head>
            <Body>
                {#each dispositivos as dispositivo}
                    <Row>
                        <Cell>{dispositivo.id}</Cell>
                        <Cell>{dispositivo.denominacion}</Cell>
                        <Cell>
                            <a href="/dispositivos/{dispositivo.id}">
                                <Button color="secondary" variant="raised">
                                    <Label>Editar</Label>
                                </Button>
                            </a>
                        </Cell>
                        <Cell>
                            <Button
                                on:click={() => eliminar(dispositivo.id)}
                                variant="raised">
                                <Label>Eliminar</Label>
                            </Button>
                        </Cell>
                        <Cell>
                            <a href="/dispositivos/{dispositivo.id}/dashboard">
                                <Button variant="outlined">
                                    <Label>Dashboard</Label>
                                </Button>
                            </a>
                        </Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}
</main>
