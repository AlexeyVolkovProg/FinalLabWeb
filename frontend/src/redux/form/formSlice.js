import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    r: null,
    x: null,
    y: null
}

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setValue: (state, action) => {
            state[action.payload.name] = action.payload.value
        },
        resetForm: (state) => {
            state.r = null
            state.x = null
            state.y = null
        }
    }
})

export const {setValue, resetForm} = formSlice.actions

export default formSlice.reducer
