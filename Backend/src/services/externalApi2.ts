

export const fetchDataApi_2 = async () => {
    const urlApi = 'https://exercisedb-api.vercel.app/api/v1/exercises';

    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data:', data);

        return data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}
