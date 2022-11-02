import { useSelector } from 'react-redux'
import Resumablejs from 'resumablejs'
import { initResumable, setShowModal, useTrackedResumable } from '../Providers/Resumable/ResumableContext'
import { selectToken } from '../store/slices/appSlice'
import React from 'react'
import _, { uniqueId } from 'lodash'

export const useResumable = ({ id, options })=> {
    const token = useSelector(selectToken)
    const [{ resumables }, dispatch] = useTrackedResumable()
    function getTarget() {
        switch (id) {
            case 'table':
                return '/tables/upload'
            default:
                return '/tables/upload'
        }
    }
    const resumable = new Resumablejs({
        target: process.env.API_URL + getTarget(),
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
        ...options
    })
    const r = resumables.filter(el => el.id === id)[0]?.r
    function appendEvents(resumable) {
        resumable.on('fileSuccess', (file, message) => {
            console.log('fileSuccess', message)
        })

        resumable.on('error', (message, file) => {
            console.log('error', { file: file, message: message })
        })

        resumable.on('filesAdded', (files) => {
            console.log('filesAdded', files)
            dispatch(setShowModal(id))
        })

        resumable.on('pause', () => {
            console.log('pause')
        })
        resumable.on('cancel', () => {
            console.log('cancel', 'Загрузка отменена')
        })
        resumable.on('uploadStart', () => {
            console.log('uploadStart', 'Загрузка началась')
        })
    }
    React.useEffect(() => {
        if (_.isEmpty(resumables.filter(el => el.id === id))) {
            appendEvents(resumable)
            dispatch(initResumable({ id, resumable }))
        }
    }, [id])
    return r
}