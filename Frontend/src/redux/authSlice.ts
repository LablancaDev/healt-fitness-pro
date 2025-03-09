import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user_id: number | null,
    userName: string | null,
    userAge: number | null,
    userHeight: number | null,
    userWeight: number | null,
    userEmail: string | null,
    userGender: string | null,
    userProfileImage: string | null,
    isAuthenticated: boolean,
}


const initialState: AuthState = {
    user_id: null,
    userName: null,
    userAge: null,
    userHeight: null,
    userWeight: null,
    userEmail: null,
    userGender: null,
    userProfileImage: null,
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user_id: number | null, userName: string | null, userAge: number | null, userHeight: number | null, userWeight: number | null, userEmail: string | null, userGender: string | null, userProfileImage: string | null}>) => {
            state.user_id = action.payload.user_id
            state.userName = action.payload.userName
            state.userAge = action.payload.userAge
            state.userHeight = action.payload.userHeight
            state.userWeight = action.payload.userWeight  
            state.userEmail = action.payload.userEmail
            state.userGender = action.payload.userGender
            state.userProfileImage = action.payload.userProfileImage
            state.isAuthenticated = true
        },
        logout(state) { 
            state.user_id = null,
            state.userName = null,
            state.userAge = null,
            state.userHeight = null,
            state.userWeight = null,
            state.userEmail = null,
            state.userGender = null,
            state.userProfileImage = null,
            state.isAuthenticated = false
        },
        updateUser: (state, action: PayloadAction<Partial<Omit<AuthState, 'user_id' | 'isAuthenticated'>>>) => { //updateUser acepta un Partial<AuthState>, que permite actualizar solo algunas propiedades, excluyendo user_id y isAuthenticated, que son importantes para la lógica del estado de autenticación.
        
            Object.assign(state, action.payload); 
        } 
    }   
})



export const { setUser, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;