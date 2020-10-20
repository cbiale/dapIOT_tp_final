import * as yup from 'yup';

const dispositivoEsquema = yup.object().shape({
    denominacion: yup
        .string()
        .required("Debe dar una denominación al dispositivo"),
    latitud: yup
        .number().typeError("Debe especificar un valor")
        .max(90, "Valor máximo de 90")
        .min(-90, "Valor mínimo de -90")
        .required("Debe la latitud donde se encuentra el dispositivo"),
    longitud: yup
        .number().typeError("Debe especificar un valor")
        .max(180, "Valor máximo de 180")
        .min(-180, "Valor mínimo de -180")
        .required("Debe la longitud donde se encuentra el dispositivo")
});

export { dispositivoEsquema };

// The numbers are in decimal degrees format and range from
// -90 to 90 for latitude and
// -180 to 180 for longitud