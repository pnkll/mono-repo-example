import { XIcon } from '@heroicons/react/outline';
import _, { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import { setBody, UploadContext } from '../../Providers/UploadNotify';
import Button from '../Button/Button';
import s from './ResumableModal.module.scss'
import ToggleInput from '../ToggleInput/ToggleInput'

export default function UploaderModal({ isOpen, setIsOpen, r}) {
    ReactModal.setAppElement('#root');
    const customStyles = {
        overlay: {
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.50)'
        },
        content: {
            inset: '50% auto auto 50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '321px'
        }
    }
    const [withDeletion, setWithDeletion] = React.useState(false)
    function handleSend() {
        setIsOpen(null)
        r.upload()
        //dispatch(setBody({ id: 'tables', body: { id: location.pathname.split('/')[2], withDeletion } }))

    }
    async function handleClose() {
        r.cancel()
        setIsOpen(null)
    }
    function handleRemove(file) {
        if (r.files.length !== 1) {
            r.removeFile(file)
        } else {
            handleClose()
        }
    }
    const [focus, setFocus] = React.useState(null)
    console.log(r.files)
    return (
        <>
            <ReactModal
                style={customStyles}
                isOpen={isOpen}
                onRequestClose={handleClose}>
                <div className={s['modal__header']}>
                    <XIcon color={'red'} width={20} onClick={handleClose} className={s['modal__x-icon']} />
                    <Button handleClick={handleSend} text='Отправить' color='blue' />
                </div>
                <ToggleInput checked={withDeletion} handleChange={(e) => setWithDeletion(e.target.checked)} label='Перезаписать' />
                <div className={s['modal__file-list']}>
                    {!_.isEmpty(r.files)
                        && r.files.map(el =>
                            <div
                                className={`${s['modal__file-list__elem']} ${focus === el.uniqueIdentifier && s.focused}`}
                                key={el.uniqueIdentifier}
                                onMouseEnter={() => setFocus(el.uniqueIdentifier)}
                                onMouseLeave={() => setFocus(null)}>
                                {focus === el.uniqueIdentifier && <XIcon
                                    className={s['modal__file-list__elem__x-icon']}
                                    onClick={() => handleRemove(el)}
                                    color='red' />
                                }
                                <i className={s['modal__file-list__elem__icon']}>{el.file.type}</i>
                                <span className={s['modal__file-list__elem__info']}>
                                    <p className={s['modal__file-list__elem__name']}>{el.fileName}</p>
                                    <p className={s['modal__file-list__elem__size']}>{el.file?.size}</p>
                                </span>
                            </div>)}
                </div>
            </ReactModal>
        </>
    )
}