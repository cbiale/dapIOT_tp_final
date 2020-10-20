<script>
    /*
  import { registrar, rutaActiva } from "./Ruteador.svelte";

  export let path = "/*";
  export let componente = null;

  registrar({ path, componente });
  */
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
    <!--
  {#if $rutaActiva.path === path}
    <svelte:component this={componente} />
    <slot />
  {/if}
    -->
    <h2>Lo siento.</h2>
    <h2>Página no encontrada.</h2>
    <a href="/">Volver</a>
</main>
