import s from './ResumableProgress.module.scss'
import classNames from 'classnames/bind'
import { removeResumableNotify, useTrackedResumable, useUpdateResumable } from '@src/Providers/Resumable/ResumableContext'
import { tableApi } from '@services/TableService'
import Button from '@components/Button/Button'
import { BanIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import PulseLoader from 'react-spinners/PulseLoader';
import React from 'react'

const cx = classNames.bind(s)

export default function ResumableProgress({ id, notify, from='right' }) {
    const [{resumables},dispatch] = useTrackedResumable()
    const [updateTable] = tableApi.useUploadFileMutation()
    const [complete,setComplete] = React.useState(false)
    function hanldeSubmit() {
        updateTable({ id: notify.targetId, file: notify.response, withDeletion: true })
        setComplete(true)
        resumables.find(el=>el.r.opts.id===id)?.r?.cancel()
        setTimeout(()=>{
            dispatch(removeResumableNotify(id))
        },1000)        
    }
    function renderTitle() {
        switch (notify.status) {
            case 'error':
                return <><BanIcon width={20} style={{ color: 'red' }} />Ошибка</>
            case 'success':
                return <><CheckIcon width={20} style={{ color: 'green' }} />Успешно</>
            case 'progress':
                return <><PulseLoader size={6} color={'rgb(14 126 179)'} />Загрузка..</>
        }
    }
    function renderButtons() {
        if (notify.status === 'success') {
            return <>
                {notify.type === 'table' && <p className={s.message}>Вы действительно хотите загрузить данные в таблицу?</p>}
                <Button text='Отправить' handleClick={hanldeSubmit} />
            </>
        } else if (notify.status === 'error') {
            <>
                <p className={s.message}>Произошла ошибка при загрузку файлов</p>
                <Button text='Повторить' />
            </>
        }
        return null
    }
    const progressBarStyle = { width: `${notify.progress}%`, background: `${notify.status==='error'?'#e35757':notify.status==='success'?'rgb(14 179 14)':'blue'}` }
    return (
        <>
            <div className={cx({ container: true, [from]: true, complete: complete, error: notify.status === 'error', success: notify.status === 'success', progress: notify.status === 'progress' })}>
                <span className={s.title}>
                    {renderTitle()}
                </span>
                <div className={s['file-list']}>
                    {notify.files.map(el => <div key={el.fileName}>{el.fileName}</div>)}
                </div>
                {renderButtons()}
                <div className={s['progress-bar']} style={progressBarStyle} />
            </div>
        </>
    )
}