import {createSlice} from "@reduxjs/toolkit"

const apiDefaultState = () => ({
  loading: false,
  data: {},
  error: {},
})

export const apiArrayDefaultState = () => ({
  loading: false,
  data: [],
  error: {},
})

export const apiSlice = createSlice({
  name: 'api',
  initialState: {},
  reducers: {
    setApiLoading: (state, action) => {
      const {id, value, isArray} = action.payload
      const lastLoading = state[id]?.loading
      if (JSON.stringify(lastLoading) === JSON.stringify(value))
        return
      state[id] = state[id] ?? (isArray ? apiArrayDefaultState() : apiDefaultState())
      state[id].loading = value
    },
    saveApi: (state, action) => {
      const {id, value, isArray} = action.payload
      const lastData = state[id]?.data
      if (JSON.stringify(lastData) === JSON.stringify(value))
        return
      state[id] = state[id] ?? (isArray ? apiArrayDefaultState() : apiDefaultState())
      state[id].data = value
    },
    setApiError: (state, action) => {
      const {id, value, isArray} = action.payload
      const lastError = state[id]?.error
      if (JSON.stringify(lastError) === JSON.stringify(value))
        return
      state[id] = state[id] ?? (isArray ? apiArrayDefaultState() : apiDefaultState())
      state[id].error = value
    },
    clearApi: (state, action) => {
      const {id, isArray} = action.payload
      state[id] = isArray ? apiArrayDefaultState() : apiDefaultState()
    },
  }
})

export const {
  setApiLoading,
  saveApi,
  setApiError,
  clearApi,
} = apiSlice.actions

export default apiSlice.reducer