import Button from '@components/Button/Button';
import OverlayPopup from '@components/Popup/OverlayPopup/OverlayPopup';
import { isNil } from 'lodash';
import React from 'react';

export default function ConfirmPopup({ isOpen, onRequestClose, question, onAccess }) {
    function handleAccess() {
        !isNil(onAccess.current)
            ?onAccess.current()
            :onAccess()
        onRequestClose()
    }
    return (
        <>
            <OverlayPopup
                isOpen={isOpen}
                onRequestClose={onRequestClose}
            >
                <span>{question}</span>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
                    <Button handleClick={handleAccess} color='green' text='Да' />
                    <Button handleClick={onRequestClose} color='red' text='Нет' />
                </div>
            </OverlayPopup>
        </>
    )
}