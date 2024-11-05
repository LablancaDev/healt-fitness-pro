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
// Middleware para registrar las solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Configurar CORS para permitir solicitudes desde el cliente local y el frontend en Vercel
const allowedOrigins = [
    'http://localhost:4000', // Backend local
    'http://localhost:5173', // Frontend local (Vite)
    'http://localhost:4173', // npm run preview
    'https://healt-fitness-pro.vercel.app', // Frontend de Vercel en producción
    'https://healt-fitness-bvc4gn3l9-davids-projects-5a52dd2e.vercel.app', // Vercel (versión de despliegue temporal)
    'https://healt-fitness-no1hbjose-davids-projects-5a52dd2e.vercel.app',
    'https://healt-fitness-foveagz29-davids-projects-5a52dd2e.vercel.app'
];
// Configuración de CORS para permitir preflight y todas las rutas/métodos
app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (ej. Postman) o si está en la lista de orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.error(`CORS error: Origin not allowed: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Incluye OPTIONS para preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Si estás usando cookies o encabezados como Authorization
}));
// Respuesta a las solicitudes preflight
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});
// Middleware para interpretar JSON
app.use(express.json());
// Rutas
app.use('/api/users', server_routes);
// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
