import { MenuIcon, MicrophoneIcon, MinusIcon, PauseIcon, PhoneOutgoingIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpanded } from '../../store/slices/callContollSlice.js';
import Button from '../Button/Button.jsx';
import { PhoneDownButton,PhoneButton } from '../CallButtons/CallButtons.jsx';
import Select from '../Select/Select.jsx';
import './CallControl.scss'

import {Session} from 'sipml'

export default function CallControl({props}) {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const expanded = useSelector(state => state.callControlSlice.expanded)

    const remoteAudioElement = () => {
        var id = 'sip-provider-audio';
        var el = window.document.getElementById(id);
            if (el) {
                return true;
            }
            el = window.document.createElement('audio');
            el.id = id;
            el.autoplay = true;
            window.document.body.appendChild(el);
            props.current.remoteAudioElement = el;
            return false;
    }
    
    useEffect(() => {
        remoteAudioElement()
    })
    
    return (
        <>
                <div className="call-control__container" style={{ width: 'fit-content', position: 'absolute', bottom: expanded ? '3px' : '-159px', background: expanded?'rgb(128 128 128 / 63%)':'', transition: 'all 0.5s ease' }}>
                    <div className="call-control__header">
                        <p className='call-control__header__status'>На линии</p>
                        {expanded ? <MinusIcon width={20} onClick={() => dispatch(setExpanded(!expanded))} style={{cursor: 'pointer'}}/> : <MenuIcon style={{cursor: 'pointer'}} width={20} onClick={() => dispatch(setExpanded(!expanded))} />}
                    </div>

                    <div className="" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button text='Отошел' handleClick={()=>props.current.unregisterSip()}/>
                        <Button text='Закончить смену' color='red' handleClick={()=>props.current.registerSip()}/>
                    </div>
                    <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                        <MicrophoneIcon width={15} />
                        <PhoneOutgoingIcon width={15} className='phone' />
                        <PauseIcon width={15} className='phone' />
                    { props.current?.state.callStatus === "callStatus/ACTIVE" || props.current?.state.callStatus ===  "callStatus/STARTING" ?<PhoneDownButton onClick={()=>props.current.stopCall()}/>:<PhoneButton onClick={() => props.current.startCall('1013')} />}
                    </div>
                    <Button text='Создать заявку' w='-webkit-fill-available' color='green' handleClick={() => setEditMode(true)} />
                    <div className={`select ${editMode ? 'visible' : ''}`} >
                        <Select />
                        <XIcon color='red' width={30} onClick={() => setEditMode(false)} />
                    </div>
                    {props.current?.state.callStatus}
                </div>
        </>
    )
}