var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fetchDataApi_2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlApi = 'https://exercisedb-api.vercel.app/api/v1/exercises';
    try {
        const response = yield fetch(urlApi);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        const data = yield response.json();
        console.log('Data:', data);
        return data;
    }
    catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
});
