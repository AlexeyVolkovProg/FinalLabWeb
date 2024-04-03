import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token")
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginResult: (state, action) => {
            state.token = action.payload
            localStorage.setItem("token", action.payload)
        }
    }
})

export const {loginResult} = loginSlice.actions

export default loginSlice.reducer
