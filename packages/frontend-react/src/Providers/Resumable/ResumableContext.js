import { uniqueId } from "lodash"
import { useReducer } from "react"
import { createContainer } from "react-tracked"

export const initialState = {
    resumables: [],
    showModal: null,
}

export function resumableReducer(state, action) {
    switch (action.type) {
        case 'INIT_RESUMABLE':
            return {
                ...state, resumables: [...state.resumables, {id: action.payload.id, r: action.payload.resumable}]
            }
        case 'SET_SHOW_MODAL':
            return {
                ...state, showModal: action.payload
            }    
    }   
}

export function initResumable(payload){
    console.log('initResumable')
    return {type: 'INIT_RESUMABLE', payload}
}
export function setShowModal(payload){
    console.log(payload)
    return {type: 'SET_SHOW_MODAL', payload}
}

const useValue = () => useReducer(resumableReducer, initialState)

export const { Provider: ResumableProvider, useTracked: useTrackedResumable } = createContainer(useValue)