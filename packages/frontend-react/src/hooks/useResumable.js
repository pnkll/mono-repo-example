import { useSelector } from 'react-redux'
import Resumablejs from 'resumablejs'
import { addResumableNotify, initResumable,setResumableStatus,setShowModal, updateNotify, updateProgress, useTrackedResumable } from '../Providers/Resumable/ResumableContext'
import { selectToken } from '../store/slices/appSlice'
import React from 'react'
import _, { uniqueId } from 'lodash'
import { useParams } from 'react-router-dom'

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
        id: uniqueId(),
        type: id,
        ...options
    })
    const r = resumables.filter(el => el.id === id)[0]?.r
    function appendEvents(resumable) {
        const _id = resumable.opts.id
        resumable.on('fileSuccess', (file, response) => {
            const {message}=JSON.parse(response)
            dispatch(updateNotify({id:_id, status: 'success', response: message}))
        })

        resumable.on('error', (message, file) => {
            dispatch(updateNotify({id: _id, status: 'error'}))
            console.log('error', { file: file, message: message })
        })

        resumable.on('filesAdded', (files) => {
            dispatch(setShowModal(id))
        })

        resumable.on('pause', () => {
            console.log('pause')
        })
        resumable.on('progress', () => {
            String(Math.floor(resumable.progress()*100)).match(/^[1-9]0+$/)&&
                dispatch(updateProgress({id: resumable.opts.id,progress:Math.floor(resumable.progress()*100)}))
        })
        resumable.on('cancel', () => {
            console.log('cancel', 'Загрузка отменена')
        })
        resumable.on('uploadStart', () => {
            dispatch(addResumableNotify({id: resumable.opts.id, status: 'progress'}))
            console.log('uploadStart', 'Загрузка началась')
        })
    }
    React.useEffect(() => {
        if (_.isEmpty(resumables.filter(el => el.id === id))) {
            appendEvents(resumable)
            dispatch(initResumable({ id, resumable, progress: null }))
        }
    }, [id])
    return r
}