import _ from "lodash";
import React from "react";
import { useReducer } from "react";

export const UploadContext = React.createContext()

const initialState = {
    type: 'success',
    files: [],
    progress: 0,
    message: null,
    getResumable: null
}

function uploadContextReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                files: _.isEmpty(state.files.filter(file => file.uniqueIdentifier === action.payload.file.uniqueIdentifier))
                    ? [...state.files, action.payload.file]
                    : [...state.files],
                progress: action.payload.progress
            }
        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload.type,
                message: action.payload.message
            }    
        case 'APPEND_RESUMABLE':
            return{
                ...state,
                getResumable: action.payload
            }    
    }
}

export function updateProgress(payload) {
    return { type: 'UPDATE_PROGRESS', payload }
}

export function setTypeOfNotify(payload) {
    return { type: 'SET_TYPE', payload }
}

export function resumableAppend(payload){
    return {type: 'APPEND_RESUMABLE',payload} 
}

export default function UploadProgressProvider({ children }) {
    const [state, dispatch] = useReducer(uploadContextReducer, initialState)
    return (
        <UploadContext.Provider value={[state, dispatch]}>
            {children}
        </UploadContext.Provider>
    )
}

