<script>
  // importamos ruteadores
  import Ruteador from "./rutas/Ruteador.svelte";
  import Ruta from "./rutas/Ruta.svelte";
  import NoEncontrado from "./rutas/NoEncontrado.svelte";

  // importamos componentes
  import ListadoDispositivos from "./componentes/ListadoDispositivos.svelte";
  import Dispositivo from "./componentes/Dispositivo.svelte";
  import NuevoDispositivo from "./componentes/NuevoDispositivo.svelte";
  import Dashboard from "./componentes/Dashboard.svelte";
  import Mapa from "./componentes/Mapa.svelte";
  import MedicionesDispositivo from "./componentes/MedicionesDispositivo.svelte";
  import LogsDispositivo from "./componentes/LogsDispositivo.svelte";
</script>

<style>

</style>

<main>
  <!-- definimos el ruteador --> 
  <Ruteador>
    <Ruta path="/" componente={Mapa} />
    <Ruta path="/dispositivos" componente={ListadoDispositivos} />
    <Ruta path="/dispositivos/nuevo" componente={NuevoDispositivo} />
    <Ruta path="/dispositivos/:id" componente={Dispositivo} let:parametros />
    <Ruta path="/dispositivos/:id/dashboard" componente={Dashboard} let:parametros />    
    <Ruta path="/dispositivos/:id/mediciones" componente={MedicionesDispositivo} let:parametros />    
    <Ruta path="/dispositivos/:id/logs" componente={LogsDispositivo} let:parametros />    
    <Ruta path= "*" componente= {NoEncontrado} />
  </Ruteador>
</main>
