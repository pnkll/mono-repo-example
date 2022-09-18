import { XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React, { useState } from 'react';
import Modal from 'react-modal'
import Button from '../Button/Button.jsx';

export default function ConfirmModal({ isOpen, setIsOpen, callback, label }) {
    Modal.setAppElement('#root');
    const customStyles = {
        overlay: { zIndex: 100 },
        content: {
            inset: '50% auto auto 50%',
            transform: 'translate(-50%,-50%)'
        }
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}>
                <span style={{ fontFamily: 'Roboto' }}>{label}</span>
                <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20}}>
                <Button handleClick={() => {
                    setIsOpen(false)
                    !isNil(callback.current) && callback.current()
                }} color='green' text='Да' />
                <Button handleClick={() => {
                    setIsOpen(false)
                }} color='red' text='Нет' />
            </div>
        </Modal>
        </>
    )
}