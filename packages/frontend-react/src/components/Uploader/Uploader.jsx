import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Resumablejs from 'resumablejs'

export default function Uploader({width=40}) {

    const node = useRef(null)

    const r = new Resumablejs({
        target: 'http://87.103.193.156:3000/upload',
        query: {},
        fileType: ['csv'],
        maxFiles: 1,
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
        headers: {},
        chunkSize: 1024 * 1024,
        simultaneousUploads: 1,
        fileParameterName: 'file',
        generateUniqueIdentifier: null,
        forceChunkSize: false
    });

    const [prog, setProg] = React.useState(0)


    r.on('fileAdded', () => {
        console.log('file добавлен')
    })

    r.on('fileSuccess', (file, message) => {
        console.log({ file: file.fileName, message: message })
        setProg(0)
    })

    r.on('fileProgress', (file) => {
        setProg(Math.round(r.progress() * 100))
    })

    r.on('cancel', () => {
        console.log('Загрузка отменена')
    })

    useEffect(() => {
        !isNil(node) && r.assignBrowse(node.current)
    }, [node])

    console.log(prog)


    return (
        <>
            <label htmlFor='upload-file'>
                <svg style={{ cursor: 'pointer' }} width={width} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </label>
            <input id='upload-file' type='file' ref={node} />
            <button onClick={r.upload}>Загрузить</button>
            <button onClick={r.cancel}>Остановить</button>
            <span style={{ background: 'green', height: '10px', width: `${prog}%`, transition: 'all 0.5s ease' }} />
        </>
    )
}