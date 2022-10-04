//import { concat } from 'lodash';
import React from 'react';
import { FileUploader } from "react-drag-drop-files";
import { tableApi } from '../../services/TableService';
import ReactResumableJs from 'react-resumable-js'
import { useState } from 'react';
import './DragNDropCell.scss'
import Uploader from '../Uploader/Uploader';
import { useRef } from 'react';
import { useEffect } from 'react';
import { isNil } from 'lodash';

export default function DragNDropCell({ width = 40, id, styleContainer, styleLabel, }) {
    const [postData, { data, error }] = tableApi.useUploadFileMutation()
    function createFormData(file) {
        console.log(file)
        // const formdata = new FormData()
        // formdata.append("table_id", '632c5f74c7574ba5243e4b29')
        // formdata.append("withDeletion", false)
        // formdata.append("file", file)
        //console.log(file)
        setKey(key + 1)
        //postData(formdata)
    }
    return (
        <>
            <Uploader/>
        </>
    )
}