import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerNewUser = async (req: Request, res: Response): Promise<void> => {

    // console.log('Datos recibidos:', req.body); // datos recibidos 

    try {

        // Se extraen los datos del cuerpo de la solicitud
        const { userName, age, weight, height, email, password, gender } = req.body;

        // También se extrae el nombre del archivo de la imágen, que es el archivo subido a través de Multer (middleware de Node.js para manejar archivos).
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

        // **Hashear la contraseña antes de almacenarla**
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear un nuevo usuario con los datos recibidos
        // Se pasan los datos (name, email, password, profile_image) al constructor del modelo con los datos que vienen de la solicitud, creando una instancia de User.
        const newUser = new User({
            userName,
            age,
            weight,
            height,
            email,
            password: hashedPassword, // Guardamos la contraseña encriptada en el backend
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
        let { email, password } = req.body; //declaro como let para poder editar email

        // Limpiar espacios y convertir a minúsculas para evitar problemas de coincidencias
        email = email.trim().toLowerCase();

        console.log('Recibiendo los datos para login - Email:', email, 'Password:', password);

        // Búsqueda del usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Usuario no encontrado con el email:', email);
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
            return; // Detener ejecución
        }

        console.log('Usuario encontrado:', user.email);

        // **Comparar la contraseña ingresada con la almacenada (hasheada)**
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Contraseña incorrecta');
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
            return;
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
    const { user_id } = req.params; 
    const { userName, userAge, userHeight, userWeight, userEmail, userGender } = req.body; 

    const profileImage = req.file ? req.file.filename : null; // Obtener el nombre del archivo de la imagen si se subió

    try {
     
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

