import React from 'react';
import s from './UploadNotification.module.scss'
import PulseLoader from 'react-spinners/PulseLoader';
import { BanIcon, PauseIcon, PlayIcon, RefreshIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import Button from '../Button/Button';
import { useContext } from 'react';
import { UploadContext } from '../../Providers/UploadNotify';

export default function UploadNotification({ type = 'success', files, progress, message,callback,getResumable }) {
    const [state,providerDispatch,r]=useContext(UploadContext)
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
    function renderButtons(){
        switch (type) {
            case 'success':
                return r.isUploading()
                    ?<PauseIcon width={30} onClick={()=>r?.pause()}/>
                    :<PlayIcon width={30} onClick={()=>r?.upload()}/>
            case 'error':
                return <RefreshIcon width={20} onClick={()=>r.retry()}/>        
        }
    }
    return (
        <>
            <div className={`${s['upload-notify__container']}`}
                style={{ background: `${type === 'error' ? 'rgb(243 139 139 / 93%)' : 'rgb(175 195 233 / 89%)'}` }}>
                <span className={s['upload-notify__title']}>
                    {getTitle()}
                </span>
                {files.map(file => <p key={file.uniqueIdentifier} className={s['upload-notify__filename']}>{file.fileName} {Math.floor(file.progress()*100)}%</p>)}
                {!isNil(message) && <p className={s['upload-notify__message']}>{message}</p>}
                {/* <PauseIcon width={30} onClick={()=>r?.pause()}/>
                <PlayIcon width={30} onClick={()=>r?.upload()}/> */}
                {renderButtons()}
                <i className={s['upload-notify__progress-bar']} style={{ width: `${progress}%`, background: `${type === 'error' ? '#e35757' : 'rgb(14 126 179)'}` }} />
            </div>
        </>
    )
}