import { createSlice } from "@reduxjs/toolkit";

const initialState={
    config: {
        id: null,
        editable: false,
        rtkHook: null,
    }
}

export const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers:{
        setConfig: (state,action)=>{
            state.config = {...state.config, ...action.payload }
        },
    }
})

export const {config,setConfig} = tableSlice.actions

//export const selectToken = (state) => state.appSlice.token

export default tableSlice.reducer