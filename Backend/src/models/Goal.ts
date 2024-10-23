import mongoose, { Schema, Document } from 'mongoose';

// Definir una interfaz para el subdocumento de Actividad
interface IActivity {
  activity_date: Date;
  activity_type: string;
  duration: number;
  calories_burned: number;
  calories_ingested: number;
  weight: number; // Añadir campo de peso opcional
}

// Definir una interfaz para el modelo de Goal
export interface IGoal extends Document {
  user_id: mongoose.Schema.Types.ObjectId;  // Relación con el modelo User
  goal: string;  // "lose weight", "gain muscle", "maintenance"
  desired_weight?: number;
  desired_fat_percentage?: number;
  estimated_time?: number;  // En semanas o meses
  activities: IActivity[];  // Array de actividades
  daily_weight?: number;
}

// Definir el esquema de Goal
const GoalSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Relaciona con el modelo User  
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
    default: null,  // En semanas o meses
  },
  activities: [  // Array de subdocumentos para las actividades
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
      weight: {  // Añadir el campo de peso a las actividades
        type: Number,
        default: null,
      }
    }
  ],
  
}, {
  timestamps: true,  // Esto añade automáticamente los campos `createdAt` y `updatedAt`
});

// Crear y exportar el modelo de Goal
const Goal = mongoose.model<IGoal>('Goal', GoalSchema);
export default Goal;
