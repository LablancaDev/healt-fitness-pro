var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
export const fetchDataApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://wger.de/api/v2/exerciseimage/?limit=20&offset=20', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${process.env.WGER_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    try {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        const data = yield response.json();
        console.log('Data:', data);
        return data; // Retornamos la data para que pueda ser enviada por el controlador
    }
    catch (error) {
        console.error('Error al obtener datos:', error);
        throw error; // Lanzamos el error para manejarlo en el controlador si es necesario
    }
});
