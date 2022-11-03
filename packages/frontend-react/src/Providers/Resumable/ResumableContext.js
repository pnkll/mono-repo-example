import { isNil, uniqueId } from "lodash"
import { useReducer } from "react"
import { createContainer } from "react-tracked"

export const initialState = {
    resumables: [],
    showModal: null,
    notifications: []
}

export function resumableReducer(state, action) {
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

export function initResumable(payload){
    return {type: 'INIT_RESUMABLE', payload}
}
export function setShowModal(payload){
    return {type: 'SET_SHOW_MODAL', payload}
}
export function setMeta(payload){
    return {type: 'SET_META',payload}
}
export function addResumableNotify(payload){
    return {type: 'ADD_NOTIFY', payload}
}
export function removeResumableNotify(payload){
    return {type: 'REMOVE_NOTIFY', payload}
}
export function updateProgress(payload){
    return {type: 'UPDATE_PROGRESS', payload}
}
export function setResumableStatus(payload){
    return {type: 'SET_STATUS', payload}
}
export function updateNotify(payload){
    return {type: 'UPDATE_NOTIFY', payload}
}
export function setIdTarget(payload){
    console.log(payload)
    return {type: 'SET_ID_TARGET',payload}
}

const useValue = () => useReducer(resumableReducer, initialState)

export const { Provider: ResumableProvider, useUpdate: useUpdateResumable,useTrackedState:useTrackedResumableState,useTracked: useTrackedResumable } = createContainer(useValue)