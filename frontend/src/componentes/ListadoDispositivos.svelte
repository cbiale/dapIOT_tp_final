<script>
  import { onMount } from "svelte";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table/bare.js";
  import "@smui/data-table/bare.css";
  import Button, { Label, Icon } from "@smui/button/bare.js";
  import "@smui/button/bare.css";

  //export let parametros;
  export let dispositivos = [];

  onMount(async () => {
    await fetch(`http://localhost:3000/v1/dispositivos`)
      .then((datos) => datos.json())
      .then((resultado) => (dispositivos = resultado));
  });
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
              <a href="dispositivos/{dispositivo.id}"> > </a>
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  {/if}
</main>
