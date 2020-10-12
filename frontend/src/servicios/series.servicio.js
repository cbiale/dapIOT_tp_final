const BASE_URL = "http://localhost:3001/api/v1/series/"


async function obtenerDatos(id) {
    let respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
    });

    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
    return respuesta;
}

export const seriesServicio = { obtenerDatos };