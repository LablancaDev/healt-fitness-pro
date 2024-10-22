import mongoose, { Schema, Document } from 'mongoose';

// * En MongDB hay que definir modelos, este es el modelo de Users, define las propiedades de un user y los tipos de datos que se guardarán en la bd mongo

// Definir una interfaz para el modelo de Usuario
export interface IUser extends Document {
    userName: string;
    age: number;
    weight: number;
    height: number;
    email: string;
    password: string;
    gender: string;
    profile_image?: string;
}

// Definir el esquema del Usuario
const UserSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    },
});

// Crear y exportar el modelo de Usuario
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
