//import { concat } from 'lodash';
import React from 'react';
import { FileUploader } from "react-drag-drop-files";
import { tableApi } from '../../services/TableService';
import concat from 'concat-stream';

export default function DragNDropCell({ width = 40, id, styleContainer,styleLabel, }) {
    const [postData,{data,error}] = tableApi.useUploadFileMutation()
    const [key,setKey]=React.useState(0)
    function createFormData(file) {
        const formdata = new FormData()
        formdata.append("table_id", '632c5f74c7574ba5243e4b29')
        formdata.append("withDeletion", false)
        formdata.append("file", file)
        //console.log(file)
        setKey(key+1)
        postData(formdata)
    }
    return (
        <>
            <div style={styleContainer?styleContainer:{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '189px'
            }}>
                <FileUploader key={key} name='file' handleChange={createFormData} hoverTitle={' '} style={styleLabel?styleLabel:{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <svg style={{ cursor: 'pointer' }} width={width} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p style={{ maxWidth: '200px', margin: '0 auto', cursor: 'pointer' }}>Перенесите файл сюда или кликните для того чтобы загрузить</p>
                </FileUploader>
            </div>
        </>
    )
}