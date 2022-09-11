import { createSlice } from "@reduxjs/toolkit";

const initialState={
    collapsed: false,
    visible: true,
}

export const sidebarSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        setSidebarCollapsed: (state)=>{
            state.collapsed = !state.collapsed
        },
        setSidebarVisible: (state,action)=>{
            state.visible = action.payload
        }
    }
})

export const {setSidebarCollapsed,setSidebarVisible} = sidebarSlice.actions

export const selectSidebarCollapsed = (state)=> state.sidebarSlice.collapsed
export const selectSidebarVisible = (state)=> state.sidebarSlice.visible

export default sidebarSlice.reducer