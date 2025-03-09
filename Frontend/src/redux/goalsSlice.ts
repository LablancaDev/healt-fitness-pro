import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Para almacenar los datos de los formularios en el estado global de Redux utilizando createSlice de @reduxjs/toolkit, se crea un estado global 
para almacenar tanto el goalId como los datos de los formularios GoalForm, ActivityForm y ProgressForm.*/

interface GoalsState {
    goalId: string | null;
    userId: string | null;
    physicalGoals: {
        desiredWeight: number;
        desiredFatPercentage: number;
        estimatedTargetTime: number;
    };
    activity: {
        activityDate: string; 
        activityType: string;
        duration: number;
        caloriesBurned: number;
        caloriesIngested: number;
        weight: number;
    };
}

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
        weight: 0,
    }
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
        setActivity: (state, action: PayloadAction<{ activityDate: string; activityType: string; duration: number; caloriesBurned: number; caloriesIngested: number; weight: number }>) => {
            state.activity = action.payload; 
        },
        deleteActivity: (state) => {
            state.activity.activityDate = ""
                state.activity.activityType = ""
                state.activity.caloriesBurned = 0
                state.activity.caloriesIngested = 0
                state.activity.duration = 0
                state.activity.weight = 0
        },
        // ELIMINAR resetGoalId Y resetUserId NO SE USAN...
        resetGoalId: (state) => {
            state.goalId = null; // Reinicia solo el goalId
        },
        resetUserId: (state) => {
            state.userId = null; // Reinicia el id
        },
    },
});

export const { setGoalId, setPhysicalGoals, setActivity, resetGoalId, resetUserId, deleteActivity } = goalsSlice.actions;
export default goalsSlice.reducer;

