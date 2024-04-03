import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    page: 0,
    size: 5,
}

export const pointsSlice = createSlice({
    name: "points",
    initialState,
    reducers: {
        setSize: (state, action) => {
            state.size = action.payload
            state.page = 0
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        incPage: (state) => {
            state.page += 1
        },
        decPage: (state) => {
            state.page -= 1
        }
    }
})

export const {setSize, setPage, incPage, decPage} = pointsSlice.actions

export default pointsSlice.reducer
