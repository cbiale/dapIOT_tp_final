<script>
    import { onMount } from "svelte";
    import Button, { Label, Icon } from "@smui/button/bare.js";
    import "@smui/button/bare.css";
    import { Form, Input, Select, Choice } from "sveltejs-forms";

    import { dispositivosServicio } from "../servicios/dispositivos.servicio";
    import { seriesServicio } from "../servicios/series.servicio";

    // dato pasado al componente
    export let id;

    // datos obtenidos del backend
    let dispositivo;
    let seriesHumedad;
    let seriesTemperatura;

    // datos formulario
    let valoresFormulario;

    onMount(async () => {
        await dispositivosServicio
            .obtenerDispositivo(id)
            .then((respuesta) => respuesta.json())
            .then((resultado) => (dispositivo = resultado));
        await seriesServicio
            .obtenerDatos(id + "-Humedad")
            .then((respuesta) => respuesta.json())
            .then((resultado) => (seriesHumedad = resultado));
        await seriesServicio
            .obtenerDatos(id + "-Temperatura")
            .then((respuesta) => respuesta.json())
            .then((respuesta) => (seriesTemperatura = respuesta));
        console.log(seriesHumedad);
        console.log(seriesTemperatura);
        console.log(seriesHumedad.length);
        for (let i = 0; i < seriesHumedad.length; i++) {
            console.log(new Date(seriesHumedad[i][0]).toString());
        }
    });

    function resetear() {
        console.log("form has been reset");
    }

    function guardar({ detail: { values, setSubmitting, resetForm } }) {
        setTimeout(() => {
            formValues = values;
            setSubmitting(false);
            resetForm();
        }, 1000);
    }

    const schema = yup.object().shape({
        denominacion: yup
            .string()
            .required("Debe especificar la denominacion del dispositivo"),
        latitud: yup
            .number()
            .required(
                "Debe especificar la ubicacion (latitud) del dispositivo"
            ),
        longitud: yup
            .number()
            .required(
                "Debe especificar la ubicacion (longitud) del dispositivo"
            ),
    });
</script>

<style>
    h2 {
        color: #ff3e00;
        font-size: 2em;
        font-weight: 100;
    }
</style>

<main>
    <h2>Dispositivo</h2>
    {#if dispositivo}
        <p>{dispositivo.id}</p>
        <Form
            {schema}
            validateOnChange={true}
            validateOnBlur={true}
            on:submit={guardar}
            on:reset={resetear}
     i       let:isSubmitting>
            <Input
                name="denominacion"
                label="Denominación" />

            <Input
                name="longitud"
                label="Longitud" />

            <Input
                name="latitud"
                label="Latitud" />

        </Form>

        <p>{dispositivo.denominacion}</p>
        <a href="/">
            <Button variant="outlined">
                <Label>Mapa</Label>
            </Button>
        </a>
        <a href="/dispositivos">
            <Button variant="outlined">
                <Label>Listado</Label>
            </Button>
        </a>
    {/if}
</main>
