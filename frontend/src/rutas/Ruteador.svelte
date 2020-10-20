<script context = "module">
    import { writable } from "svelte/store";

    // almacenamiento de rutas
    const rutas = {};

    // ruta activa (store, se accede con $nombre)
    export const rutaActiva = writable({});

    // registra las rutas
    export function registrar(ruta) {
        rutas[ruta.path] = ruta;
    }
</script>

<script>
    import { onMount, onDestroy } from "svelte";
    import page from "page";

    // configuramos asociando un path a un componente y sus argumentos
    const configurarPaginas = () => {
        for (let [path, componente] of Object.entries(rutas)) {
            page(
                path,
                (ctx) =>
                    ($rutaActiva = { ...componente, parametros: ctx.params })
            );
        }

        // iniciamos page.js
        page.start();
    };

    // al montar un componente
    onMount(configurarPaginas);

    // al destruir un componente
    onDestroy(page.stop);
</script>

<slot />
