import { XIcon } from '@heroicons/react/outline';
import _, { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { UploadContext } from '../../Providers/UploadNotify';
import Button from '../Button/Button';
import s from './UploaderModal.module.scss'

export default function UploaderModal({ isOpen, setIsOpen }) {
    ReactModal.setAppElement('#root');
    const [state,dispatch,r]=useContext(UploadContext)
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
    function handleSend() {
        setIsOpen(false)
        //!isNil(callback.current)&&callback.current()
        r.upload()
    }
    async function handleClose() { 
        //console.log(fileList)
        r.files.forEach(file=>r.removeFile(file))
        //setIsOpen(false)
        //!_.isEmpty(fileList) && fileList.forEach(file => r.removeFile(file))
    }
    function handleRemove(file) {
        r.removeFile(file)
        //setFileList(fileList.filter(el => el !== file))
        //fileList.length === 1 && handleClose()
    }

    const [focus, setFocus] = React.useState(null)
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