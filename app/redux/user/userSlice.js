import {createSlice} from "@reduxjs/toolkit"

export const userDefaultState = {
    auth: {},
    data: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userDefaultState,
    reducers: {
        saveAuth: (state, action) => {
            state.auth = action.payload
        },
        saveUser: (state, action) => {
            state.data = action.payload
        },
        updateUser: (state, action) => {
            state.data = {...state.data, ...action.payload}
        },
    }
})

export const {
    saveAuth,
    saveUser,
    updateUser,
} = userSlice.actions

export default userSlice.reducer