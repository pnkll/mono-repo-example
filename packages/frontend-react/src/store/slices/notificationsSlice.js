import { createSlice } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";

const initialState={
    notifications: {
        commonNotify: [],
    }
}

export const notificationsSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        addNotify: (state,action)=>{
            state.notifications.commonNotify = [...state.notifications.commonNotify, {id: uniqueId(), type: action.payload.type, message: action.payload.message }]
        },
        removeNotify: (state,action)=>{
            state.notifications.commonNotify = state.notifications.commonNotify.filter(el=>el.id!==action.payload.id)
        },
    }
})

export const {addNotify,removeNotify} = notificationsSlice.actions

export const selectNotifications = (state) => state.notificationsSlice.notifications.commonNotify

export default notificationsSlice.reducer