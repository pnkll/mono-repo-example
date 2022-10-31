import OverlayPopup from '@components/Popup/OverlayPopup/OverlayPopup';
import React from 'react';

export default function ResumablePopup({ isOpen, onRequestClose, r }) {
    const withDeletion = true
    function handleSend() {
        r.upload()
        onRequestClose()
    }
    async function handleClose() {
        r.cancel()
        onRequestClose()
    }
    function handleRemove(file) {
        if (r.files.length !== 1) {
            r.removeFile(file)
        } else {
            handleClose()
        }
    }
    const [focus, setFocus] = React.useState(null)
    return (
        <>
            <OverlayPopup
                isOpen={isOpen}
                onRequestClose={onRequestClose}
            >
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
            </OverlayPopup>
        </>
    )
}