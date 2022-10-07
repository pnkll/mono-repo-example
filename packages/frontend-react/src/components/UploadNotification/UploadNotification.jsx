import React from 'react';
import s from './UploadNotification.module.scss'
import PulseLoader from 'react-spinners/PulseLoader';
import { BanIcon, PauseIcon, PlayIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import Button from '../Button/Button';

export default function UploadNotification({ type = 'success', files, progress, message,callback,getResumable }) {
    function getTitle() {
        if (type === 'success') {
            return <>
                <PulseLoader size={6} color={'rgb(14 126 179)'} />
                Загрузка файлов
            </>
        } else {
            return <>
                <BanIcon width={20} color='red'/>
                Произошла ошибка при загрузке файлов
            </>
        }
    }
    // function getButton(){
    //     if (stateOfUpload==='')
    // }
    return (
        <>
            <div className={`${s['upload-notify__container']}`}
                style={{ background: `${type === 'error' ? 'rgb(243 139 139 / 93%)' : 'rgb(175 195 233 / 89%)'}` }}>
                <span className={s['upload-notify__title']}>
                    {getTitle()}
                </span>
                {files.map(file => <p key={file.uniqueIdentifier} className={s['upload-notify__filename']}>{file.fileName}</p>)}
                {!isNil(message) && <p className={s['upload-notify__message']}>{message}</p>}
                <PauseIcon width={30} onClick={()=>getResumable()?.pause()}/>
                <PlayIcon width={30} onClick={()=>getResumable()?.upload()}/>
                <i className={s['upload-notify__progress-bar']} style={{ width: `${progress}%`, background: `${type === 'error' ? '#e35757' : 'rgb(14 126 179)'}` }} />
            </div>
        </>
    )
}