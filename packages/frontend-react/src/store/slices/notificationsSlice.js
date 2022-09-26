import { createSlice } from "@reduxjs/toolkit";
import {v4} from 'uuid'

const initialState={
    notifications: []
}

export const notificationsSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers:{
        addNotify: (state,action)=>{
            state.notifications = [...state.notifications, {id: v4(), type: action.payload.type, message: action.payload.message }]
        },
        removeNotify: (state,action)=>{
            state.notifications = state.notifications.filter(el=>el.id!==action.payload.id)
        },
    }
})

export const {addNotify,removeNotify} = notificationsSlice.actions

export const selectNotifications = (state) => state.notificationsSlice.notifications

export default notificationsSlice.reducer