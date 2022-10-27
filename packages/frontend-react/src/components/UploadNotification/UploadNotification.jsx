import React from 'react';
import s from './UploadNotification.module.scss'
import PulseLoader from 'react-spinners/PulseLoader';
import { BanIcon, CheckIcon, PauseIcon, PlayIcon, RefreshIcon, XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import Button from '../Button/Button';
import { useContext } from 'react';
import { setStatus, UploadContext } from '../../Providers/UploadNotify';
import { useEffect } from 'react';

export default function UploadNotification({ id, resumable: r, status = 'success', message = null, dispatch, progress }) {
    function getTitle() {
        switch (status) {
            case 'progress':
                return <>
                <PulseLoader size={6} color={'rgb(14 126 179)'} />
                Загрузка файлов
            </>
            case 'pause':
                return <>Пауза</>
            case 'success':
                return <><CheckIcon width={20}/>Успешная загрузка файлов</>
            case 'error':
                return <>
                <BanIcon width={20} color='red' />
                Произошла ошибка при загрузке файлов
            </>        
        }
    }
    function renderButtons() {
        switch (status) {
            case 'progress':
                return <PauseIcon width={30} onClick={() => r?.pause()} />
            case 'pause':
                return <PlayIcon width={30} onClick={() => r?.upload()} />
            case 'success':
                return null
            case 'error':
                return <>
                    <RefreshIcon width={20} onClick={() => r.files.forEach(file => file.retry())} />
                    <XIcon color='red' width={20} onClick={() => { r.cancel()}} />
                </>
        }
    }
    return (
        <>
            <div className={`${s['upload-notify__container']}`}
                style={{ background: `${status === 'error' ? 'rgb(243 139 139 / 93%)' : 'rgb(175 195 233 / 89%)'}` }}>
                <span className={s['upload-notify__title']}>
                    {getTitle()}
                </span>
                {r.files.map(file => <p key={file.uniqueIdentifier} className={s['upload-notify__filename']}>{file.fileName} {Math.floor(file.progress() * 100)}%</p>)}
                {!isNil(message) && <p className={s['upload-notify__message']}>{message}</p>}
                {renderButtons()}
                <i className={s['upload-notify__progress-bar']} style={{ width: `${progress}%`, background: `${status === 'error' ? '#e35757' : 'rgb(14 126 179)'}` }} />
            </div>
        </>
    )
}