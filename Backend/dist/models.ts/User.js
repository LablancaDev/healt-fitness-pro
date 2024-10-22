import mongoose, { Schema } from 'mongoose';
// Definir el esquema del Usuario
const UserSchema = new Schema({
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
const User = mongoose.model('User', UserSchema);
export default User;
