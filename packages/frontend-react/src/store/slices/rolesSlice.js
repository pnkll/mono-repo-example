import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const initialState={
    roleList: null,
    permissionList: null,
}

export const rolesSlice = createSlice({
    name: 'rolesSlice',
    initialState,
    reducers:{
        setRoleList: (state,action)=>{
            state.roleList = action.payload
        },
        setPermissionList: (state,action)=>{
            state.permissionList = action.payload
        }
    }
})

export const {setRoleList,setPermissionList} = rolesSlice.actions

export const selectRoleList = (state)=> state.rolesSlice.roleList
export const selectPermissionList = (state)=>state.rolesSlice.permissionList 

export default rolesSlice.reducer