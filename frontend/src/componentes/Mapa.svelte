<script>
    import * as L from "leaflet";
    import { onMount } from "svelte";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";

    // variable del mapa
    let mapa;
    // variable de dispositivos (para mostrar en el mapa)
    let dispositivos = [];
    let ubicaciones = [];
    let centro;

    onMount(async () => {
        await dispositivosServicio
            .listarDispositivos()
            .then((respuesta) => respuesta.json())
            .then((resultado) => (dispositivos = resultado));
        await marcadores();
    });

    async function marcadores() {
        if (dispositivos.length > 0) {
            centro = [
                dispositivos[0].ubicacion.coordinates[1],
                dispositivos[0].ubicacion.coordinates[0],
            ];
            for (let i = 0; i < dispositivos.length; i++) {
                ubicaciones.push([
                    dispositivos[i].denominacion,
                    dispositivos[i].ubicacion.coordinates[1],
                    dispositivos[i].ubicacion.coordinates[0],
                    dispositivos[i].id
                ]);
            }
        }
    }

    function crearMapa(contenedor) {
        console.log(centro);
        let m = L.map(contenedor).setView([centro[0], centro[1]], 13);
        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            {
                attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
                subdomains: "abcd",
                maxZoom: 14,
            }
        ).addTo(m);

        return m;
    }

    function accionesMapa(contenedor) {
        // creo mapa
        mapa = crearMapa(contenedor);

        for (let i = 0; i < ubicaciones.length; i++) {
            var marker = new L.marker([ubicaciones[i][1], ubicaciones[i][2]])
                .bindPopup(`${ubicaciones[i][0]} </br>
                <a href="/dispositivos/${ubicaciones[i][3]}/dashboard"> ver dashboard </a> </br>
                <a href="/dispositivos/${ubicaciones[i][3]}"> editarlo </a>`)
                .addTo(mapa);
        }

        return {
            destroy: () => {
                mapa.remove();
            },
        };
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
    <h2>Mapa de dispositivos</h2>

    <a href="/dispositivos">
        <Button variant="outlined">
            <Label>Listado</Label>
        </Button>
    </a>
    <a href="/dispositivos/nuevo">
        <Button variant="outlined">
            <Label>Nuevo dispositivo</Label>
        </Button>
    </a>    

    {#if centro && ubicaciones}
        <div class="map" style="height:400px;width:100%" use:accionesMapa />
    {/if}
</main>
