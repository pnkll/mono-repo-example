import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import ReactModal from 'react-modal';
import DragNDropCell from '../DragNDropCell/DragNDropCell.jsx';

export default function DragNDropModal({id,isOpen,setIsOpen}) {
    return (
        <>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(!isOpen)}
                style={{
                    overlay: { zIndex: 100 },
                    content: {
                        width: 'fit-content',
                        height: 'fit-content',
                        inset: '50% auto auto 50%',
                        transform: 'translate(-50%,-50%)'
                    }
                }}>
                    <XIcon width={20} color='red' style={{position: 'absolute', top: '5px', right: '5px', cursor: 'pointer'}} onClick={()=>setIsOpen(!isOpen)}/>
                <DragNDropCell 
                    id={id} 
                    styleContainer={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    textAlign: 'center'
                }} />
            </ReactModal>
        </>
    )
}