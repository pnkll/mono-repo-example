import _, { isNil } from "lodash";
import React from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import Resumablejs from 'resumablejs'
import UploaderModal from "../components/UploaderModal/UploaderModal";
import { tableApi } from "../services/TableService";
import { selectToken } from "../store/slices/appSlice";

export const UploadContext = React.createContext()


const initialState = {
    resumables: [],
}

function uploadContextReducer(state, action) {
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
    console.log('response',payload)
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

export default function UploadProgressProvider({ children }) {
    const [state, dispatch] = useReducer(uploadContextReducer, initialState)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [resumable, setResumable] = React.useState(null)
    const [postData]=tableApi.useUploadFileMutation()
    //tableApi.useUploadFileMutation()
    //const [postData] = !isNil(resumable?.rtkHook)?()=>{}: tableApi.useUploadFileMutation() 
    //!isNil(resumable?.rtkHook) ? () => { } : resumable.rtkHook()
    const token = useSelector(selectToken)
    const resumables = React.useMemo(() => [
        {
            id: 'img',
            status: null,
            events: false,
            active: false,
            response: null,
            body: null,
            progress: null,
            rtkHook: tableApi.useUploadFileMutation,
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
            }),
        },
        {
            id: 'tables',
            status: null,
            events: false,
            active: false,
            response: null,
            body: null,
            progress: null,
            rtkHook: tableApi.useUploadFileMutation,
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
    ], [])
    function appendEvents() {
        resumable?.r?.on('fileSuccess', (file, message) => {
            dispatch(setStatus({ id: resumable.id, status: 'success' }))
            dispatch(setResponse({ id: resumable.id, response: JSON.parse(message) }))
            resumable?.r?.removeFile(file)
            //postFile({id:params.id,file: JSON.parse(message).message,withDeletion:true})
        })

        resumable?.r?.on('error', (message, file) => {
            console.log('error', { file: file, message: message })
            dispatch(setStatus({ id: resumable.id, status: 'error' }))
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
            dispatch(setStatus({ id: resumable.id, status: 'pause' }))
            console.log('pause')
        })

        resumable?.r?.on('fileProgress', (file) => {
            dispatch(setProgress({ id: resumable.id, progress: Math.floor(resumable?.r?.progress() * 100) }))
        })

        resumable?.r?.on('cancel', () => {
            console.log('cancel', 'Загрузка отменена')
        })
        resumable?.r?.on('uploadStart', () => {
            console.log('uploadStart', 'Загрузка началась')
            dispatch(setStatus({ id: resumable.id, status: 'progress' }))
        })
    }
    React.useEffect(() => {
        _.isEmpty(state.resumables) && dispatch(initResumables(resumables))
    }, [])
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
    React.useEffect(() => {
        //const [postData] = tableApi.useUploadFileMutation() 
        //!isNil(resumable?.rtkHook) ? () => { } : resumable.rtkHook()
        // if (postData instanceof Function) {
        //     console.log(typeof(postData))
            !isNil(resumable?.response) && postData({ ...resumable.body, file: resumable.response })
        // }
    }, [resumable?.response])
    console.log('resumable',resumable)
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

