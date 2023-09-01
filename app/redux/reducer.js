import {combineReducers} from 'redux'
import apiSlice from "./api/apiSlice";
import userSlice from "./user/userSlice";

const combinedReducer = combineReducers({
    api: apiSlice,
    user: userSlice,
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
    }
    return combinedReducer(state, action)
}

export default rootReducer