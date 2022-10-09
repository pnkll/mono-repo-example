import _ from "lodash";
import React from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import Resumablejs from 'resumablejs'
import UploaderModal from "../components/UploaderModal/UploaderModal";
import { selectToken } from "../store/slices/appSlice";

export const UploadContext = React.createContext()

const initialState = {
    type: 'success',
    files: [],
    progress: 0,
    message: null,
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
    }
}

export function updateProgress(payload) {
    return { type: 'UPDATE_PROGRESS', payload }
}

export function setTypeOfNotify(payload) {
    return { type: 'SET_TYPE', payload }
}

// export function resumableAppend(payload) {
//     return { type: 'APPEND_RESUMABLE', payload }
// }

export default function UploadProgressProvider({ children }) {
    const [state, dispatch] = useReducer(uploadContextReducer, initialState)
    const [isOpenModal,setIsOpenModal]=React.useState(false)
    const token = useSelector(selectToken)
    const r = React.useMemo(() => {
        console.log('resume init')
        return new Resumablejs({
            target: process.env.API_URL + '/tables/upload',
            query: {},
            fileType: ['csv'],
            maxFiles: 4,
            maxFileSize: 100240000,
            // fileTypeErrorCallback: (file, errorCount) => {
            //     if (typeof this.props.onFileAddedError === "function") {
            //         this.props.onFileAddedError(file, errorCount);
            //     }
            // },
            // maxFileSizeErrorCallback: (file, errorCount) => {
            //     if (typeof  this.props.onMaxFileSizeErrorCallback === "function") {
            //         this.props.onMaxFileSizeErrorCallback(file, errorCount);
            //     }
            // },
            testMethod: 'post',
            testChunks: false,
            headers: { Authorization: `Bearer ${token}` },
            chunkSize: 1024 * 1024,
            simultaneousUploads: 1,
            fileParameterName: 'file',
            generateUniqueIdentifier: null,
            forceChunkSize: false,
            // uploaderID: 'upload-file',
            // dropTargetID: 'drag-file-element'
        })
    }, [token])
    React.useEffect(() => {
        console.log('events init')
        r?.on('fileSuccess', (file, message) => {
            console.log('complete', { file: file, message: JSON.parse(message) })
            r?.removeFile(file)
            //postFile({id:params.id,file: JSON.parse(message).message,withDeletion:true})
        })

        r?.on('error', (message, file) => {
            console.log('error', { file: file, message: message })
            //r?.removeFile(file)
            r?.pause()
            dispatch(setTypeOfNotify({type: 'error', message: 'Произошла ошибка при загрузке файла ' + file.fileName + JSON.parse(message)?.message}))
            //dispatch(addNotify({type: 'error', message: `Произошла ошибка при загрузке ${file.fileName}`}))
        })

        r?.on('filesAdded', (files) => {
            console.log('filesAdded', files)
            //setFileList(files)
            setIsOpenModal(true)
        })

        r?.on('pause', () => {
            console.log('pause')
        })

        r?.on('fileProgress', (file) => {
            dispatch(updateProgress({ file: file, progress: r?.progress() * 100 }))

        })

        r?.on('cancel', () => {
            console.log('cancel', 'Загрузка отменена')
        })
        r?.on('uploadStart', () => {
            console.log('uploadStart', 'Загрузка началась')
        })
    }, [])
    return (<>
        <UploadContext.Provider value={[state, dispatch, r]}>
            {children}
            <UploaderModal 
            isOpen={isOpenModal} 
            setIsOpen={setIsOpenModal} />
        </UploadContext.Provider>
        
        </>
    )
}

