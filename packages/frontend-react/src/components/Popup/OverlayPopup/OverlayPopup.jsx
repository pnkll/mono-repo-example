import React from 'react';
import Modal from 'react-modal'

export default function OverlayPopup({ children, isOpen, onRequestClose }) {
    Modal.setAppElement('#root');
    const customStyles = {
        overlay: {
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.50)',
            cursor: 'pointer'
        },
        content: {
            inset: '50% auto auto 50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '321px',
            fontFamily: 'Roboto'
        }
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
            >
                {children}
            </Modal>
        </>
    )
}