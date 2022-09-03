import { MenuIcon, MicrophoneIcon, MinusIcon, PauseIcon, PhoneOutgoingIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpanded } from '../../store/slices/callContollSlice.js';
import Button from '../Button/Button.jsx';
import { PhoneDownButton } from '../CallButtons/CallButtons.jsx';
import Select from '../Select/Select.jsx';
import './CallControl.scss'
import { SipProvider } from 'react-sip'
import {Session} from 'sipml'

export default React.memo(function CallControl() {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const expanded = useSelector(state => state.callControlSlice.expanded)
    const sip = useRef()
    useEffect(()=>{
        console.log({sip:sip})
    },[sip.current?.state])

    console.log({Session: Session})

    return (
        <>
            {/* <SipProvider
                ref={sip}
                host="sip.minta365.ru"
                port={7443}
                pathname="" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
                user="1002"
                password={'2495'} // usually required (e.g. from ENV or props)
                autoRegister={true} // true by default, see jssip.UA option register
                autoAnswer={false} // automatically answer incoming calls; false by default
                iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
                sessionTimersExpires={120} // value for Session-Expires header; 120 by default
                // extraHeaders={{ // optional sip headers to send
                //     register: ['X-Foo: foo', 'X-Bar: bar'],
                //     invite: ['X-Foo: foo2', 'X-Bar: bar2']
                // }}
                iceServers={[]}
                debug={true} // whether to output events to console; false by default
            > */}
            
                <div className="call-control__container" style={{ width: 'fit-content', position: 'absolute', bottom: expanded ? '3px' : '-159px', transition: 'all 0.5s ease' }}>
                    <div className="call-control__header">
                        <p className='call-control__header__status'>На линии</p>
                        {expanded ? <MinusIcon width={20} onClick={() => dispatch(setExpanded(!expanded))} /> : <MenuIcon width={20} onClick={() => dispatch(setExpanded(!expanded))} />}
                    </div>

                    <div className="" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button text='Отошел' color='yellow' handleClick={()=>sip.current.unregisterSip()}/>
                        <Button text='Закончить смену' color='red' handleClick={()=>sip.current.registerSip()}/>
                    </div>
                    <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                        <MicrophoneIcon width={15} />
                        <PhoneOutgoingIcon width={15} className='phone' />
                        <PauseIcon width={15} className='phone' />
                        <PhoneDownButton onClick={()=>sip.current.startCall('1010')}/>
                    </div>
                    <Button text='Создать заявку' w='-webkit-fill-available' color='green' handleClick={() => setEditMode(true)} />
                    <div className={`select ${editMode ? 'visible' : ''}`} >
                        <Select />
                        <XIcon color='red' width={30} onClick={() => setEditMode(false)} />
                    </div>
                    {/* {sip.current?.state.callStatus} */}
                </div>
            {/* </SipProvider> */}
        </>
    )
})