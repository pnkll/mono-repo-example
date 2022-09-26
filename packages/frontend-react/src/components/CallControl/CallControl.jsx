import { LinkIcon, MenuIcon, MicrophoneIcon, MinusIcon, PauseIcon, PhoneOutgoingIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVolume, setExpanded, setVolume } from '../../store/slices/callContollSlice.js';
import Button from '../Button/Button.jsx';
import { PhoneDownButton, PhoneButton } from '../CallButtons/CallButtons.jsx';
import Select from '../Select/Select.jsx';
import './CallControl.scss'

import { Session } from 'sipml'
import useSound from 'use-sound';
import bell from '../../assets/sound/piano-notif.wav'
import { isNil } from 'lodash';

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
        } else {
            switch (props.current?.state.callDirection) {
                case 'callDirection/INCOMING': return 'Входящий вызов'
                case 'callDirection/OUTGOING': return 'Исходящий вызов'
            }
        }
    }
    function getPositionStatus() {
        switch (props.current?.state.sipStatus) {
            case 'sipStatus/CONNECTED': return 'Неактивен'
            case 'sipStatus/REGISTERED': return 'На линии'
        }
    }
    const volume = useSelector(state => state.callControlSlice.volume)
    //const [play, { stop }] = useSound(bell, { volume: volume ? 1 : 0 })
    function renderVolumeButton() {
        const style = { cursor: 'pointer' }
        if (volume) {
            return <VolumeUpIcon style={style} width={20} onClick={() => dispatch(setVolume())} />
        } else {
            return <VolumeOffIcon style={style} width={20} onClick={() => dispatch(setVolume())} />
        }
    }
    useEffect(() => {
        //props.current.state.callDirection === 'callDirection/OUTGOING' ? play() : stop()
    }, [props.current?.state.callDirection])
    const [move, setMove] = useState(false)
    const [position, setPosition] = useState(20)
    function handleMove(e) {
        move && (e?.screenX > 300) && setPosition(e?.view.innerWidth - e?.screenX - 218)
    }
    useEffect(() => {
        window.addEventListener('mousemove', handleMove, true)
        return () => window.removeEventListener('mousemove', handleMove, true)
    }, [move])
    function getButton() {
        //props.current?.state.callStatus ===
        switch (getCallStatus()) {
            case 'Звонок':
                return <PhoneDownButton onClick={() => props.current?.stopCall()} />
            case 'Исходящий вызов':
                return <PhoneDownButton onClick={() => props.current?.stopCall()} />
            case 'Входящий вызов':
                return <PhoneButton onClick={() => props.current?.answerCall()} />
            case 'Ожидание':
                return <PhoneButton onClick={() => props.current?.startCall('1019')} />
        }
    }
    return (
        <>
            <div className="call-control__container" style={{
                width: 'fit-content', position: 'absolute', bottom: expanded ? '3px' : '-159px', background: expanded ? 'rgb(128 128 128 / 63%)' : '', transition: 'all 0.5s ease',
                right: position > 20 ? `${position}px` : '20px'
            }}>
                <LinkIcon width={15} className='call-control__move'
                    style={{ cursor: move ? 'grabbing' : 'grab', transform: move ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    onClick={() => { setMove(!move) }}
                />
                <div className="call-control__header">
                    <div className="" style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 10 }}>
                        <i className='call-control__header__indicator' style={{ backgroundColor: getPositionStatus() === 'На линии' ? 'green' : 'red' }} />
                        <p className='call-control__header__status'>{getPositionStatus()}</p>
                    </div>
                    <div className="" style={{ gap: 10, display: 'flex' }}>
                        {renderVolumeButton()}
                        {expanded ? <MinusIcon width={20} onClick={() => dispatch(setExpanded())} style={{ cursor: 'pointer' }} /> : <MenuIcon style={{ cursor: 'pointer' }} width={20} onClick={() => dispatch(setExpanded(!expanded))} />}
                    </div>
                </div>

                <div className="" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button text={`${getPositionStatus() === 'На линии' ? 'Отошел' : 'На линию'}`} handleClick={() => getPositionStatus() === 'На линии' ? props.current.unregisterSip() : props.current.registerSip()} color={getPositionStatus() !== 'На линии' ? 'green' : 'blue'} />
                    <Button text='Закончить смену' color='red' handleClick={() => props.current.unregisterSip()} disabled={true} />
                </div>
                <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                    <MicrophoneIcon width={15} />
                    <PhoneOutgoingIcon width={15} className='phone' />
                    <PauseIcon width={15} className='phone' />
                    {getButton()}
                </div>
                {props.current?.state.callCounterpart}<br />
                {getCallStatus()}
            </div>
        </>
    )
}