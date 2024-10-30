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
const allowedOrigins = [
        'http://localhost:4000', // Backend local
        'http://localhost:5173', // Frontend local (Vite)
        'http://localhost:4173',
        'https://healt-fitness-pro.vercel.app',
        'https://healt-fitness-kjt6azcr4-davids-projects-5a52dd2e.vercel.app', // URL del frontend en Vercel
        'https://healt-fitness-coffoqwpu-davids-projects-5a52dd2e.vercel.app',  
        'https://healt-fitness-as1ftlxzr-davids-projects-5a52dd2e.vercel.app',
        'https://healt-fitness-pmaysh74p-davids-projects-5a52dd2e.vercel.app',
        'https://healt-fitness-eq7pc38wx-davids-projects-5a52dd2e.vercel.app/'                      
    ];

   // Configuración de CORS
app.use(cors({  
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (ej. Postman) o si está en la lista de orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin not allowed: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Asegúrate de incluir OPTIONS para preflight requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Si estás usando cookies o encabezados como Authorization
}));


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
