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
// Middleware
app.use(cors());
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
