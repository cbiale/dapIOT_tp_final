const BASE_URL = "http://localhost:3000/api/v1/logs/"

async function obtenerDatos(id) {
    let respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
    });

    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
    return respuesta;
}

export const logsServicio = { obtenerDatos };