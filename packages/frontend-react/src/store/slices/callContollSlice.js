import { createSlice } from "@reduxjs/toolkit";

const initialState={
    visible: true,
    expanded: false,
}

export const callControllSlice = createSlice({
    name: 'callControlSlice',
    initialState,
    reducers:{
        setExpanded: (state)=>{
            state.expanded = !state.expanded
        }
    }
})

export const {setExpanded} = callControllSlice.actions

export default callControllSlice.reducer