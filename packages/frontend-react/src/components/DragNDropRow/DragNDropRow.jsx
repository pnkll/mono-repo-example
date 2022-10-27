import React from 'react';
import { tableApi } from '../../services/TableService';
import DragNDropInput from '../DragNDropInput/DragNDropInput';
import s from './DragNDropRow.module.scss'

export default function DragNDropRow({ headerGroups, cls }) {
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
            <tr className={s[`${cls}__body__row`]}>
                <td
                    style={{
                        minWidth: '500px',
                        textAlign: 'center',
                        padding: '30px 0',
                        height: '100px',
                    }}
                    colSpan={headerGroups[headerGroups.length - 1].headers.length}>
                    <DragNDropInput resumableId='table' />
                </td>
            </tr>
        </>
    )
}