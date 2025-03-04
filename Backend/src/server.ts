import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import server_routes from './server_routes.js';
import connectDB from './config/config.js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para registrar solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Configurar CORS para Render y entorno local
const allowedOrigins = [
    'https://frontend-healt-fitness-pro.onrender.com',  // Frontend en producción
    'https://healt-fitness-pro.onrender.com',
    'http://localhost:5173',                            // Frontend local para desarrollo (si usas Vite)
    process.env.FRONTEND_URL                            // URL del frontend configurado en las variables de entorno
].filter(Boolean); // 🔹 Filtra valores undefined

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin not allowed: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware para interpretar JSON
app.use(express.json());

// Rutas
app.use('/api/users', server_routes);

// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ruta para manejar /
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Iniciar el servidor en Render
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
