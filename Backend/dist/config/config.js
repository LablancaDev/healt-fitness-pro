var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
/*  Definición de la ruta exacta al archivo .env para que el módulo dotenv pueda cargar las variables de entorno desde allí.
    Esto permite acceder a valores como MONGO_URI en el archivo .ENV en la raiz del proyecto mediante process.env.MONGO_URI.   */
// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Cargar el archivo .env desde la raíz del proyecto
dotenv.config({ path: resolve(__dirname, '../../../.env') });
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGO_URI || '', {});
        console.log('MongoDB conectado...');
    }
    catch (error) {
        console.log('MongoDB URI:', process.env.MONGO_URI);
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Terminar el proceso si hay un error
    }
});
export default connectDB;
