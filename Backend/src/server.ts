import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import server_routes from './server_routes.js';
import connectDB from './config/config.js';
import dotenv from 'dotenv';

// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

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
    'http://localhost:4000',          // Backend local
    'http://localhost:5173',          // Frontend local (Vite)
    'http://localhost:4173',          // npm run preview
    'https://healt-fitness-pro.vercel.app',   // Frontend en Vercel en producción
    /\.vercel\.app$/                  // Todos los subdominios de Vercel (despliegues temporales)
];

// Configuración de CORS
app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (ej. Postman) o si está en la lista de orígenes permitidos
        if (!origin || allowedOrigins.some((allowedOrigin) =>
            typeof allowedOrigin === 'string'
                ? allowedOrigin === origin
                : allowedOrigin.test(origin)
        )) {
            callback(null, origin); // Responde con el origen permitido
        } else {
            console.error(`CORS error: Origin not allowed: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],    // Encabezados permitidos
    credentials: true                                     // Si estás usando cookies o tokens
}));

// Middleware para interpretar JSON
app.use(express.json());

// Rutas de la API
app.use('/api/users', server_routes);

// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
