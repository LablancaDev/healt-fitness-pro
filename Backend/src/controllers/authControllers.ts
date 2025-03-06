import { Request, Response } from "express";
import User from "../models/User.js";


export const registerNewUser = async (req: Request, res: Response): Promise<void> => {

    // console.log('Datos recibidos:', req.body); // datos recibidos 

    try {

        // Se extraen los datos del cuerpo de la solicitud
        const { userName, age, weight, height, email, password, gender } = req.body;

        // También se extrae el nombre del archivo de la imágen, que es el archivo subido a través de Multer (un middleware de Node.js para manejar archivos).
        const profile_image = req.file?.filename;

        console.log('Datos a insertar:', { userName, age, weight, height, email, password, gender, profile_image });

        if (!userName || !age || !weight || !height || !email || !password || !gender) {
            res.status(400).json({ message: 'Tiene que rellenar todos los campos para el registro' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            res.status(400).json({ message: "El formato del email no es válido" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }

        // Crear un nuevo usuario con los datos recibidos
        // Se pasan los datos (name, email, password, profile_image) al constructor del modelo con los datos que vienen de la solicitud, creando una instancia de User.
        const newUser = new User({
            userName,
            age,
            weight,
            height,
            email,
            password,
            gender,
            profile_image
        })

        await newUser.save();// El usuario recién creado se guarda en la base de datos MongoDB usando el método save(). Mongoose convierte ese objeto en un documento que se guarda en MongoDB.
        // MongoDB asignará automáticamente un ID único a este nuevo registro, y los datos serán almacenados.

        // Si todo funciona bien, se responde con un código HTTP 201 (Created) y un mensaje de éxito. También se devuelve el usuario recién creado.
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });

    } catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ message: 'Error registrando el usuario' });
    }

}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        console.log('Recibiendo los datos para login - Email:', email, 'Password:', password);

        // Búsqueda del usuario por email
        const user = await User.findOne({ email });

        // Verifica si el usuario no existe
        if (!user) {
            console.log('Usuario no encontrado con el email:', email);
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
            return; // Detener ejecución
        }

        console.log('Usuario encontrado:', user.email);

        // Validación de la contraseña (sin cifrado por el momento)
        if (user.password !== password) {
            console.log('Contraseña incorrecta para el usuario:', email);
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return; // Detener ejecución
        }

        console.log('Contraseña válida para el usuario:', email);

        // Si las credenciales son correctas, enviar respuesta positiva
        res.status(200).json({
            message: 'Login exitoso',
            id: user._id,
            userName: user.userName,
            age: user.age,
            weight: user.weight,
            height: user.height,
            email: user.email,
            gender: user.gender,
            profile_image: user.profile_image
        });

    } catch (error: unknown) {
        // Verificación de tipo para 'error'
        if (error instanceof Error) {
            console.error('Error al procesar el login:', error.message);
            res.status(500).json({ message: 'Error durante el login', error: error.message });
        } else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error desconocido durante el login' });
        }
    }
};





export const updateDataUser = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params; // Obtener el ID del usuario desde los parámetros de la ruta
    const { userName, userAge, userHeight, userWeight, userEmail, userGender } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Si usas multer o algún middleware para manejar archivos, asegúrate de que esté configurado
    const profileImage = req.file ? req.file.filename : null; // Obtener el nombre del archivo de la imagen si se subió

    try {
        // Buscar el usuario por ID
        const user = await User.findById(user_id);

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        // Actualizar los datos del usuario
        if (userName !== undefined) user.userName = userName;
        if (userAge !== undefined) user.age = userAge;  
        if (userHeight !== undefined) user.height = userHeight;
        if (userWeight !== undefined) user.weight = userWeight;
        if (userEmail !== undefined) user.email = userEmail;
        if (userGender !== undefined) user.gender = userGender;
        if (profileImage) user.profile_image = profileImage; // Actualizar imagen de perfil si se subió una nueva

        // Guardar los cambios en la base de datos
        await user.save();

        console.log('llego al controller')

        // Devolver el usuario actualizado
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

