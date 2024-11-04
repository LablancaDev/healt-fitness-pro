var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchDataApi } from "../services/externalApi.js";
import { fetchDataApi_2 } from "../services/externalApi2.js";
// Function para obetenr los ejercicios de la API desde el servidor
export const getExercisesApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield fetchDataApi();
        res.json(exercises);
        console.log(exercises);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejercicios de la API' });
    }
});
export const getExercisesApi2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield fetchDataApi_2();
        res.json(exercises);
        console.log(exercises);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejercicios de la API' });
    }
});
