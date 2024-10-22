import mongoose, { Schema } from 'mongoose';
// Definir el esquema de Goal
const GoalSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relaciona con el modelo User  
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    desired_weight: {
        type: Number,
        default: null,
    },
    desired_fat_percentage: {
        type: Number,
        default: null,
    },
    estimated_time: {
        type: Number,
        default: null, // En semanas o meses
    },
    activities: [
        {
            activity_date: {
                type: Date,
                required: true,
            },
            activity_type: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            calories_burned: {
                type: Number,
                required: true,
            },
            calories_ingested: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                default: null,
            }
        }
    ],
    daily_weight: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true, // Esto añade automáticamente los campos `createdAt` y `updatedAt`
});
// Crear y exportar el modelo de Goal
const Goal = mongoose.model('Goal', GoalSchema);
export default Goal;
