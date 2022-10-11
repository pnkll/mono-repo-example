import React from 'react';
import ReactModal from 'react-modal';

export default function CalendarModal({ isOpen }) {
    ReactModal.setAppElement('#root')
    const customStyles = {
        overlay: { zIndex: 100 },
        content: {
            inset: '50% auto auto 50%',
            transform: 'translate(-50%,-50%)'
        }
    }
    return (
        <>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}>
                    <span>Hello</span>
            </ReactModal>
        </>
    )
}