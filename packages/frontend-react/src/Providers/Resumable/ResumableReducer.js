import { useReducer } from "react"
import { createContainer } from "react-tracked"

export const initialResumableState = {
    resumables: []
}

export function resumableReducer(state,action){
    switch (action.type) {
        case 'INIT_RESUMABLES': {
            return {
                ...state, resumables: action.payload
            }
        }
        case 'INIT_EVENTS': {
            return {
                ...state,
                resumables: state.resumables.map(el => el.r === action.payload ? { ...el, events: true } : el)
            }
        }
        case 'SET_RESUMABLE':
            return {
                ...state,
                resumables: state.resumables.map((el) => el.id === action.payload ? { ...el, active: true } : { ...el, active: false })
            }
        case 'SET_STATUS':
            return {
                ...state,
                resumables: state.resumables.map(el => el.id === action.payload.id ? { ...el, status: action.payload.status } : el)
            }
        case 'SET_PROGRESS':
            return {
                ...state,
                resumables: state.resumables.map(el => el.id === action.payload.id ? { ...el, progress: action.payload.progress } : el)
            }
        case 'SET_RESPONSE':
            return {
                ...state,
                resumables: state.resumables.map(el => el.id === action.payload.id ? { ...el, response: action.payload.response.message } : el)
            }
        case 'SET_HOOK':
            return {
                ...state,
                resumables: state.resumables.map(el => el.id === action.payload.id ? { ...el, rtkHook: action.payload.rtkHook } : el)
            }
        case 'SET_BODY':
            return {
                ...state,
                resumables: state.resumables.map(el => el.id === action.payload.id ? { ...el, body: action.payload.body } : el)
            }
    }
}

export function setBody(payload) {
    return { type: 'SET_BODY', payload }
}

export function setHook(payload) {
    return { type: 'SET_HOOK', payload }
}

export function setResponse(payload) {
    console.log('response', payload)
    return { type: 'SET_RESPONSE', payload }
}

export function initResumables(payload) {
    return { type: 'INIT_RESUMABLES', payload }
}

export function initEvents(payload) {
    return { type: 'INIT_EVENTS', payload }
}

export function setResumable(payload) {
    return { type: 'SET_RESUMABLE', payload }
}

export function setStatus(payload) {
    return { type: 'SET_STATUS', payload }
}

export function setProgress(payload) {
    return { type: 'SET_PROGRESS', payload }
}