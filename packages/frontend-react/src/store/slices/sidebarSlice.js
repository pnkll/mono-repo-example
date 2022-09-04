import { createSlice } from "@reduxjs/toolkit";

const initialState={
    collapsed: false
}

export const sidebarSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        setCollapsed: (state)=>{
            state.collapsed = !state.collapsed
        }
    }
})

export const {setCollapsed} = sidebarSlice.actions

export const selectCollapsed = (state)=> state.sidebarSlice.collapsed

export default sidebarSlice.reducer