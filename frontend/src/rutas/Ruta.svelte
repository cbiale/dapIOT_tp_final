<script>
    import { registrar, rutaActiva } from "./Ruteador.svelte";

    // atributos
    export let path = "*";
    export let componente = null;

    // argumetos pasados al componente por la ruta
    let parametros = {};

    // invocamos a registrar : path y componente asociado
    registrar({ path, componente });

    // reactivo, se ejecuta al cambiar $rutaActiva
    $: if ($rutaActiva.path === path) {
        parametros = $rutaActiva.parametros;
    }
</script>

{#if $rutaActiva.path === path}
    {#if $rutaActiva.componente}
        <svelte:component
            this={$rutaActiva.componente}
            {...$$restProps}
            {...parametros} />
    {:else}
        <slot {parametros} />
    {/if}
{/if}
