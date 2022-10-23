import React from 'react';
import { useSelector } from 'react-redux';
import { createContainer } from 'react-tracked';
import { tableApi } from '../../services/TableService';
import { initialResumableState, initResumables, resumableReducer, setProgress, setResponse, setStatus } from './ResumableReducer';
import Resumablejs from 'resumablejs'
import _, { isNil } from 'lodash';

export default function ResumableProvider({children}) {
    const [state, dispatch] = useReducer(resumableReducer, initialResumableState)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [resumable, setResumable] = React.useState(null)
    function getHook() {
        switch (resumable?.id) {
            case 'tables':
                return tableApi.useUploadFileMutation()
            default:
                return tableApi.useUploadFileMutation()
        }
    }
    const [postData] = getHook()
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
        !isNil(resumable?.response) && postData({ ...resumable.body, file: resumable.response })
        // }
    }, [resumable?.response])
    const { Provider, useTracked: useResumableContext } = createContainer([state, dispatch, resumable?.r])
    return (
        <>
            <Provider>
                {children}
                {!isNil(resumable)
                    && <UploaderModal
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal} />}
            </Provider>
        </>
    )
}