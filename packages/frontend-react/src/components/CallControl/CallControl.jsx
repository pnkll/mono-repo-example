import { MenuIcon, MicrophoneIcon, MinusIcon, PauseIcon, PhoneOutgoingIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpanded } from '../../store/slices/callContollSlice.js';
import Button from '../Button/Button.jsx';
import { PhoneDownButton, PhoneButton } from '../CallButtons/CallButtons.jsx';
import Select from '../Select/Select.jsx';
import './CallControl.scss'

import { Session } from 'sipml'

export default function CallControl({ props }) {
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

    function getCallStatus() {
        if (props.current?.state.callDirection === null) {
            switch (props.current?.state.callStatus) {
                case 'callStatus/IDLE': return 'Ожидание'
                case 'callStatus/STARTING': return 'Вызов'
                case 'callStatus/ACTIVE': return 'Звонок'
                case 'callStatus/STOPPING': return 'Завершение'
            }
        } else{
            switch (props.current?.state.callDirection){
                case 'callDirection/INCOMING': return 'Входящий вызов'
                case 'callDirection/OUTGOING': return 'Исходящий вызов'
            }
        }
    }
    function getPositionStatus(){
        switch (props.current?.state.sipStatus){
            case 'sipStatus/CONNECTED': return 'Неактивен'
            case 'sipStatus/REGISTERED': return 'На линии'
        }
    }
    function renderButtons(){

    }
    return (
        <>
            <div className="call-control__container" style={{ width: 'fit-content', position: 'absolute', bottom: expanded ? '3px' : '-159px', background: expanded ? 'rgb(128 128 128 / 63%)' : '', transition: 'all 0.5s ease' }}>
                <div className="call-control__header">
                    <p className='call-control__header__status' style={{before: {backgroundColor: 'red'}}}>{getPositionStatus()}</p>
                    {expanded ? <MinusIcon width={20} onClick={() => dispatch(setExpanded(!expanded))} style={{ cursor: 'pointer' }} /> : <MenuIcon style={{ cursor: 'pointer' }} width={20} onClick={() => dispatch(setExpanded(!expanded))} />}
                </div>

                <div className="" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button text={`${getPositionStatus()==='На линии'?'Отошел':'На линию'}`} handleClick={() => getPositionStatus()==='На линии'?props.current.unregisterSip():props.current.registerSip()} color={getPositionStatus()!=='На линии'?'green':'blue'}/>
                    <Button text='Закончить смену' color='red' handleClick={() => props.current.unregisterSip()} disabled={true}/>
                </div>
                <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                    <MicrophoneIcon width={15} />
                    <PhoneOutgoingIcon width={15} className='phone' />
                    <PauseIcon width={15} className='phone' />
                    {props.current?.state.callStatus === "callStatus/ACTIVE" || props.current?.state.callStatus === "callStatus/STARTING" ? <PhoneDownButton onClick={() => props.current?.stopCall()} /> : <PhoneButton onClick={() => props.current?.startCall('1010')} />}
                </div>
                {props.current?.state.callCounterpart}<br />
                {getCallStatus()}
            </div>
        </>
    )
}