import { configureStore, combineReducers } from '@reduxjs/toolkit';
import updateUserReducer from '../reducers/updateUserReducer';
import userLoginReducer from '../reducers/userLoginReducer';
import transactionReducer from '../reducers/transactionReducer';
import userReducer from '../reducers/userReducer'
import servicesReducer from '../reducers/servicesReducer'
import monthlyReducer from '../reducers/monthlyReducer';
import nutritionistStats from '../reducers/nutritionistStats';
import trainerStats from '../reducers/trainerStats';
import userStats from '../reducers/userStats';
import transactionStats from '../reducers/transactionStats';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    monthlyStats: monthlyReducer,
    user: userLoginReducer,
    users: userReducer,
    services: servicesReducer,
    transaction: transactionReducer,
    updateUser: updateUserReducer,
    nutritionistStats,
    trainerStats,
    userStats,
    transactionStats,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store)
