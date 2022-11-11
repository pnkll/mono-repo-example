import {useReducer} from 'react'

const initialState = {
    resumables: [],
    showModal: null,
    notifications: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'INIT_RESUMABLE':
            return {
                ...state, resumables: [...state.resumables, {id: action.payload.id, r: action.payload.resumable, progress: action.payload.progress}]
            }
        case 'SET_SHOW_MODAL':
            return {
                ...state, showModal: action.payload
            }     
        case 'ADD_NOTIFY':
            return {
                ...state, notifications: [...state.notifications, action.payload]
            }
        case 'REMOVE_NOTIFY':
            return {
                ...state, notifications: state.notifications.filter(el=>el.id!==action.payload)
            }
        case 'SET_STATUS':
            return {
                ...state, notifications: state.notifications.map(el=>el.id===action.payload.id?{...el, status: action.payload.status}:el)
            }
        case 'UPDATE_PROGRESS':
            return {
                ...state, notifications: state.notifications.map(el=>el.id===action.payload.id?{...el,progress: action.payload.progress}:el)
            }
        case 'UPDATE_NOTIFY':
            return {
                ...state, notifications: state.notifications.map(el=>el.id===action.payload.id?{...el, ...action.payload}:el)
            }
        case 'SET_ID_TARGET':
            return {
                ...state, notifications: state.notifications.map(el=>el.id===action.payload.id?{...el, ...action.payload}:el)
            }
    }   
}

export const getReducer = ()=> useReducer(reducer,initialState)