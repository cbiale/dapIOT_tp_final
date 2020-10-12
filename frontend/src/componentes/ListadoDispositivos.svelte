<script>
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table/bare.js";
  import "@smui/data-table/bare.css";
  import Button, { Label, Icon } from "@smui/button/bare.js";
  import "@smui/button/bare.css";
  
  import {dispositivosServicio} from "../servicios/dispositivos.servicio";

  export let dispositivos = [];
  let id;

  onMount(async () => {
    await dispositivosServicio.listarDispositivos()
      .then((respuesta) => respuesta.json())
      .then((resultado) => (dispositivos = resultado));
  });

  async function eliminar(id) {
    await dispositivosServicio.eliminarDispositivo(id);
    await dispositivosServicio.listarDispositivos()
      .then((respuesta) => respuesta.json())
      .then((resultado) => (dispositivos = resultado));
  };
</script>

<style>
    h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<main>
  <h2>Dispositivos</h2>
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
              <a href="/dispositivos/{dispositivo.id}"> > </a>
            </Cell>
            <Cell>
              <Button on:click={() => eliminar(dispositivo.id)}>
                <Label>Eliminar</Label>
              </Button>              
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  {/if}
</main>
