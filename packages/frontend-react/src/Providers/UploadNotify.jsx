import _, { isNil } from "lodash";
import { set } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import Resumablejs from 'resumablejs'
import UploaderModal from "../components/UploaderModal/UploaderModal";
import { selectToken } from "../store/slices/appSlice";

export const UploadContext = React.createContext()


const initialState = {
    resumables: [],
}

function uploadContextReducer(state, action) {
    switch (action.type) {
        case 'INIT_RESUMABLES':{
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
                resumables: state.resumables.map(el=>el.id===action.payload.id?{...el, status: action.payload.status}:el)
            }    
    }
}

export function initResumables(payload){
    return {type: 'INIT_RESUMABLES', payload}
}

export function initEvents(payload) {
    return { type: 'INIT_EVENTS', payload }
}

export function setResumable(payload) {
    return { type: 'SET_RESUMABLE', payload }
}

export function setStatus(payload){
    return {type: 'SET_STATUS', payload}
}

export default function UploadProgressProvider({ children }) {
    const [state, dispatch] = useReducer(uploadContextReducer, initialState)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [resumable, setResumable] = React.useState(null)
    const token = useSelector(selectToken)
    const resumables=React.useMemo(()=>[
        {
            id: 'img',
            status: null,
            events: false,
            active: false,
            r: new Resumablejs({
                target: process.env.API_URL + '/tables/upload',
                query: {},
                fileType: ['png', 'jpg', 'jpeg'],
                maxFiles: 4,
                maxFileSize: 100240000,
                testMethod: 'post',
                testChunks: false,
                headers: { Authorization: `Bearer ${token}` },
                chunkSize: 1024 * 1024,
                simultaneousUploads: 1,
                fileParameterName: 'file',
                generateUniqueIdentifier: null,
                forceChunkSize: false,
            })
        },
        {
            id: 'tables',
            status: null,
            events: false,
            active: false,
            r: new Resumablejs({
                target: process.env.API_URL + '/tables/upload',
                query: {},
                fileType: ['csv'],
                maxFiles: 4,
                maxFileSize: 100240000,
                testMethod: 'post',
                testChunks: false,
                headers: { Authorization: `Bearer ${token}` },
                chunkSize: 1024 * 1024,
                simultaneousUploads: 1,
                fileParameterName: 'file',
                generateUniqueIdentifier: null,
                forceChunkSize: false,
            })
        }
    ],[])
    function appendEvents() {
        resumable?.r?.on('fileSuccess', (file, message) => {
            dispatch(setStatus({id: resumable.id, status: 'success'}))
            r?.removeFile(file)
            //postFile({id:params.id,file: JSON.parse(message).message,withDeletion:true})
        })

        resumable?.r?.on('error', (message, file) => {
            console.log('error', { file: file, message: message })
            dispatch(setStatus({id: resumable.id, status: 'error'}))
            //resumable?.r?.removeFile(file)
            //r?.pause()
            //dispatch(setTypeOfNotify({ type: 'error', message: `Произошла ошибка при загрузке файла ${file.fileName} ${JSON.parse(message)?.message}` }))
            //dispatch(addNotify({type: 'error', message: `Произошла ошибка при загрузке ${file.fileName}`}))
        })

        resumable?.r?.on('filesAdded', (files) => {
            console.log('filesAdded', files)
            //setFileList(files)
            setIsOpenModal(true)
        })

        resumable?.r?.on('pause', () => {
            console.log('pause')
            disp
        })

        resumable?.r?.on('fileProgress', (file) => {
            //dispatch(updateProgress({ file: file, progress: resumable?.r?.progress() * 100 }))
        })

        resumable?.r?.on('cancel', () => {
            console.log('cancel', 'Загрузка отменена')
        })
        resumable?.r?.on('uploadStart', () => {
            console.log('uploadStart', 'Загрузка началась')
            dispatch(setStatus({id: resumable.id, status: 'progress'}))
        })
    }
    React.useEffect(()=>{
        _.isEmpty(state.resumables)&&dispatch(initResumables(resumables))
    },[])
    React.useEffect(() => {
        if (!isNil(resumable) && resumable.events !== true) {
            dispatch(initEvents(resumable.r))
            appendEvents()
        }
    }, [resumable])
    React.useEffect(() => {
        if (!isNil(state.resumables.find(el => el.active))) {
            setResumable(state.resumables.find(el => el.active))
        }
    }, [state.resumables])
    return (<>
        <UploadContext.Provider value={[state, dispatch, resumable?.r]}>
            {children}
            {!isNil(resumable)
                && <UploaderModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal} />}
        </UploadContext.Provider>
    </>
    )
}

