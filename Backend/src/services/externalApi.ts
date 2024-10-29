import 'dotenv/config';

export const fetchDataApi = async () => {

    const response = await fetch('https://wger.de/api/v2/exerciseimage/?limit=20&offset=20', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${process.env.WGER_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    try {

        // Verificar si la respuesta fue exitosa        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Extraer y retornar la data JSON de la respuesta
        const data = await response.json();

        console.log('Data:', data)
        
        return data;  // Retornamos la data para que pueda ser enviada por el controlador

    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;  // Lanzamos el error para manejarlo en el controlador si es necesario
    }
}

