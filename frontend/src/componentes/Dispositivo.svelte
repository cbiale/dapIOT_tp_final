<script>
  import { onMount } from "svelte";

  // dato pasado al componente
  export let id;

  // datos obtenidos del backend
  let dispositivo;

  onMount(async () => {
    console.log(id);
    await fetch(`http://localhost:3000/v1/dispositivos/` + id)
      .then((datos) => console.log(datos) )
      .then((datos) => datos.json())
      .then((resultado) => (dispositivo = resultado));
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
  <h2>Dispositivo</h2>
  {#if dispositivo}
    <p>{dispositivo.id}</p>
    <p>{dispositivo.denominacion}</p>
    <a href="/">Volver</a>
  {/if}
</main>
