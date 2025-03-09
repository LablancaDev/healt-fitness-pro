import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import goalsSlice from "./goalsSlice";

// Configuración de persistencia
const persistConfig = {
    key: "root", 
    storage,    
};

// Creo un reducer persistente para auth, para seguir con la sesión iniciada aunque recargue la página
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        goals: goalsSlice
    },
});


const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor }; 
