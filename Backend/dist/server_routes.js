import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loginUser, registerNewUser } from './controllers/authControllers.js'; // Siempre añadir .js muy importante para la importación con node
import { initialGoal } from './controllers/InitialGoalController.js';
import { activityRegister, getDataUser, getGoalByUserId, phisicalGoals } from './controllers/goalsFormController.js';
// Simulación de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../dist/uploads'), // Guardar imágenes en "uploads" 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo 
    },
});
const upload = multer({ storage }); // Middleware para manejo de archivos
// * Ruta para el registro de usuarios en la base de datos
// Acepta el middleware de multer para la subida de la imagen
router.post('/register', upload.single('profile_image'), registerNewUser);
// * Ruta para logear un usuario
router.post('/login', loginUser);
// * Ruta para almacenar objetivo principal del usuario (perder peso, ganar musculo, mantenimiento del peso)
router.post('/initialGoalUser', initialGoal);
// * Ruta para almacenar los objetivos físicos en cuanto a (peso deseado, porcentaje de grasa deseado y tiempo estimado para conseguirlo)
router.post('/physicalgoals', phisicalGoals);
// * Ruta para almacenar las actividades físicas(fecha,tipo de actividad, duración, calorias quemadas e ingeridas)
router.post('/activityRegister', activityRegister);
// Ruta para obtener el goalId según el userId
router.get('/goal/:userId', getGoalByUserId);
// * Ruta para obtener los datos(resultados) de los usuarios y mostrarlos en una vista
router.get('/getDataUser', getDataUser);
export default router;
