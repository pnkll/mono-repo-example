import { MenuIcon, MicrophoneIcon, MinusIcon, PauseIcon, PhoneOutgoingIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpanded } from '../../store/slices/callContollSlice.js';
import Button from '../Button/Button.jsx';
import { PhoneDownButton } from '../CallButtons/CallButtons.jsx';
import Select from '../Select/Select.jsx';
import './CallControl.scss'

export default React.memo(function CallControl() {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const expanded = useSelector(state => state.callControlSlice.expanded)
    return (
        <>
            <div className="call-control__container" style={{ width: 'fit-content', position: 'absolute', bottom: expanded ? '3px' : '-159px', transition: 'all 0.5s ease' }}>
                <div className="call-control__header">
                    <p className='call-control__header__status'>На линии</p>
                    {expanded?<MinusIcon width={20} onClick={() => dispatch(setExpanded(!expanded))}/>:<MenuIcon width={20} onClick={() => dispatch(setExpanded(!expanded))} />}
                </div>

                <div className="" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button text='Отошел' color='yellow' />
                    <Button text='Закончить смену' color='red' />
                </div>
                <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15, justifyContent: 'center' }}>
                    <MicrophoneIcon width={15} />
                    <PhoneOutgoingIcon width={15} className='phone' />
                    <PauseIcon width={15} className='phone' />
                    <PhoneDownButton />
                </div>
                <Button text='Создать заявку' w='-webkit-fill-available' color='green' handleClick={() => setEditMode(true)} />
                <div className={`select ${editMode ? 'visible' : ''}`} >
                    <Select />
                    <XIcon color='red' width={30} onClick={() => setEditMode(false)} />
                </div>
            </div>
        </>
    )
})