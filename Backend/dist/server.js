import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import server_routes from './server_routes.js';
import connectDB from './config/config.js';
// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Conectar a MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;
// Configurar CORS para permitir solicitudes desde el cliente local y el frontend en Vercel
const corsOptions = {
    origin: [
        'http://localhost:4000', // Backend local
        'http://localhost:5173', // Frontend local (Vite)
        'https://healt-fitness-pro.vercel.app',
        'https://healt-fitness-kjt6azcr4-davids-projects-5a52dd2e.vercel.app', // URL del frontend en Vercel
        'https://healt-fitness-coffoqwpu-davids-projects-5a52dd2e.vercel.app',
        'https://healt-fitness-as1ftlxzr-davids-projects-5a52dd2e.vercel.app'
    ],
    credentials: true // Permitir el uso de cookies y encabezados de autorización
};
// Middleware  
app.use(cors(corsOptions));
app.use(express.json()); // Para que Express pueda interpretar JSON 
// Rutas
app.use('/api/users', server_routes);
// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
