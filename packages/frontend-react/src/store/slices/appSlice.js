import { createSlice } from "@reduxjs/toolkit";

const initialState={
    initApp: false,
    token: null,
    refreshToken: null,
    tokenExp: null,
    darkMode: false,
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        initializeApp: (state)=>{
            state.initApp = true
        },
        setCredentials: (state,action)=>{
            state.token=action.payload.token
            state.refreshToken=action.payload.refreshToken
            state.tokenExp=action.payload.tokenExp

        },
        logout: (state)=>{
            state.token=null
            state.refreshToken=null
            state.tokenExp=null
        },
        setDarkMode: (state)=>{
            state.darkMode=!state.darkMode
        }
    }
})

export const {initializeApp,setCredentials,logout,setDarkMode} = appSlice.actions

export const selectToken = (state) => state.appSlice.token
export const selectInitApp=(state)=>state.appSlice.initApp
export const selectTokenExp=(state)=>state.appSlice.tokenExp

export default appSlice.reducer