<script>
  // importamos ruteadores
  import Ruteador from "./rutas/Ruteador.svelte";
  import Ruta from "./rutas/Ruta.svelte";
  import NoEncontrado from "./rutas/NoEncontrado.svelte";

  // importamos componentes
  import ListadoDispositivos from "./componentes/ListadoDispositivos.svelte";
  import Dispositivo from "./componentes/Dispositivo.svelte";
</script>

<style>

</style>

<main>
  <!-- definimos el ruteador --> 
  <Ruteador>
    <Ruta path="/" componente={ListadoDispositivos} />
    <Ruta path="/dispositivos" componente={ListadoDispositivos} />
    <Ruta path="/dispositivos/:id" componente={Dispositivo} let:parametros />
    <Ruta path= "*" componente= {NoEncontrado} />
  </Ruteador>
</main>
