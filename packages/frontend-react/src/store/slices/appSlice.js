import { createSlice } from "@reduxjs/toolkit";

const initialState={
    init: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers:{
        initializeApp: (state)=>{
            state.init = true
        }
    }
})

export const {initializeApp} = appSlice.actions

export default appSlice.reducer