import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from "redux-thunk"
import rootReducer from "./reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: true,
    middleware: [thunk]
})
const persistor = persistStore(store)

export {store, persistor}