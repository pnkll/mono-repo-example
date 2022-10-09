import _, { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Resumablejs from 'resumablejs'
import { addCallback, resumableAppend, setResumable, setTypeOfNotify, updateProgress, UploadContext } from '../../Providers/UploadNotify';
import { tableApi } from '../../services/TableService';
import { selectToken } from '../../store/slices/appSlice';
import { addNotify } from '../../store/slices/notificationsSlice';
import Button from '../Button/Button';
import UploaderModal from '../UploaderModal/UploaderModal';
import s from './Uploader.module.scss'




export default function Uploader({ width = 40 }) {

    const [dragActive, setDragActive] = React.useState(false);

    const [state,dispatch,r]=useContext(UploadContext)

    function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer?.files && e.dataTransfer?.files[0]) {
            r?.addFiles(e.dataTransfer?.files)
        }
    }
    useEffect(()=>{
        dispatch(setResumable('tables'))
    },[])   
    return (
        <>
            <form
                className={s['uploader__container']}
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}>
                <label
                    className={s['uploader__label']}
                    htmlFor='file-input'
                    style={{ cursor: 'pointer' }}>
                    <svg width={width} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p>Перенесите файл сюда или кликните для того чтобы загрузить</p>
                </label>
                <input
                    id='file-input'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={(e) => r?.addFiles(e.target.files)}
                    multiple={true}
                />
                {dragActive
                    && 
                    <div
                        className={`${s['uploader__drag-file']} ${dragActive && s.active}`}
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    />}
            </form>
            {/* <UploaderModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} callback={modalCallback} resumable={r} fileList={r.files} setFileList={setFileList}/> */}
        </>
    )
}