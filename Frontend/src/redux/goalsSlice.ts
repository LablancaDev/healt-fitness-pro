import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos la interfaz del estado
interface GoalsState {
    goalId: string | null;
    userId: string | null;
    physicalGoals: {
        desiredWeight: number;
        desiredFatPercentage: number;
        estimatedTargetTime: number;
    };
    activity: {
        activityDate: string,
        activityType: string;
        duration: number;
        caloriesBurned: number;
        caloriesIngested: number;
    };
    progress: {
        weight: number;
    };
    goalInitial: string
}

// Estado inicial
const initialState: GoalsState = {
    goalId: null,
    userId: null,
    physicalGoals: {
        desiredWeight: 0,
        desiredFatPercentage: 0,
        estimatedTargetTime: 0,
    },
    activity: {
        activityDate: '',
        activityType: '',
        duration: 0,
        caloriesBurned: 0,
        caloriesIngested: 0,
    },
    progress: {
        weight: 0,
    },
    goalInitial: ""
};

const goalsSlice = createSlice({
    name: 'goals',  
    initialState,
    reducers: {
        setGoalId: (state, action: PayloadAction<{ goalId: string; userId: string }>) => {
            state.goalId = action.payload.goalId;
            state.userId = action.payload.userId;
        },
        setPhysicalGoals: (state, action: PayloadAction<{ desiredWeight: number; desiredFatPercentage: number; estimatedTargetTime: number }>) => {
            state.physicalGoals = action.payload;
        },
        setActivity: (state, action: PayloadAction<{ activityDate: string, activityType: string; duration: number; caloriesBurned: number; caloriesIngested: number }>) => {
            state.activity = action.payload;
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.progress.weight = action.payload;
        },
        // Función para reiniciar todos los datos del estado (goalId, userId y formularios)
        clearGoalsData: (state) => {
            // Restablece todo el estado a sus valores iniciales
            state.goalId = null;
            state.userId = null;
            state.physicalGoals = {
                desiredWeight: 0,
                desiredFatPercentage: 0,
                estimatedTargetTime: 0,
            };
            state.activity = {
                activityDate: '',
                activityType: '',
                duration: 0,
                caloriesBurned: 0,
                caloriesIngested: 0,
            };
            state.progress = {
                weight: 0,
            };
            state.goalInitial = "";
        }
    },
});

// Exportar las acciones y el reducer
export const { setGoalId, setPhysicalGoals, setActivity, setProgress, clearGoalsData } = goalsSlice.actions;
export default goalsSlice.reducer;
