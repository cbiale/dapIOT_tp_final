const BASE_URL = "http://localhost:3000/api/v1/dispositivos/"

async function listarDispositivos() {
    let respuesta = await fetch(BASE_URL, {
        method: 'GET',
    })

    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
    return respuesta;
}

async function obtenerDispositivo(id) {
    let respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
    })

    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
    return respuesta;
}


async function agregarDispositivo(datos) {
    let respuesta = await fetch(BASE_URL, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(datos)
    })

    if (respuesta.status !== 201) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
}

async function eliminarDispositivo(id) {
    let respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
    
    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
}


async function modificarDispositivo (datos) {
    let respuesta = await fetch(BASE_URL, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(datos)
    })

    if (respuesta.status !== 200) {
        throw new Error(`Estado HTTP ${respuesta.status}`);
    }
}


export const dispositivosServicio = { listarDispositivos, obtenerDispositivo, modificarDispositivo, agregarDispositivo, eliminarDispositivo };