import { createSlice } from "@reduxjs/toolkit";

const initialState={
    init: false,
    token: null,
    refreshToken: null,
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        initializeApp: (state)=>{
            state.init = true
        },
        setCredentials: (state,action)=>{
            state.token=action.payload.token
            state.refreshToken=action.payload.refreshToken
        },
        logout: (state)=>{
            state.token=null
            state.refreshToken=null
        }
    }
})

export const {initializeApp,setCredentials,logout} = appSlice.actions

export const selectToken = (state) => state.appSlice.token

export default appSlice.reducer