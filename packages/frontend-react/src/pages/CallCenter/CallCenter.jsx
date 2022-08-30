import React, { useState } from 'react';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import './CallCenter.scss'
import { MicButton, PhoneButton, PhoneDownButton, PhoneOutgoingButton } from '../../components/CallButtons/CallButtons.jsx';
import { MicrophoneIcon, PauseIcon, PhoneOutgoingIcon, XIcon } from '@heroicons/react/outline';
import Button from '../../components/Button/Button.jsx';
import Table from '../../components/Table/Table.jsx';
import Select from '../../components/Select/Select.jsx'
import TaskFromCall from '../../components/TaskFromCall/TaskFromCall.jsx'

export default React.memo(function CallCenter() {
    const columns = [
        { Header: 'Дата', accessor: 'date' },
        { Header: 'Статус', accessor: 'status' },
        { Header: 'Тип', accessor: 'type' },
        { Header: 'Детали', accessor: 'details' }
    ]
    const options = [
        {
            value: 'numbers', label: 'numbers', options: [
                {
                    value: 1, label: 1, options: [
                        { value: 2, label: 2 },
                        { value: 3, label: 3 }
                    ]
                }
            ]
        }, {
            value: 'fd', label: 'mnubers', options: [
                { value: 1, label: 1 }
            ]
        }
    ]
    const [visible, setVisible] = useState(false)
    console.log(visible)
    const [editMode, setEditMode] = useState(false)
    console.log(editMode)
    return (
        <>
            <SidebarHeaderLayout>
                {/* <div className="" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div className="">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <p className='status'>На линии</p>
                            <div className="" style={{ display: 'flex', gap: '10px' }}>
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
                        <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="" style={{ display: 'flex', alignItems: 'flex-start', gap: 34 }}>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <p className="call__number" style={{ margin: 0 }}>+7 (966) 205-95-64</p>
                                    <p style={{ margin: 0, fontSize: '14px' }}>Лицевой счет: 002348248973</p>
                                </div>

                            </div>
                            <div className="">Информация об абоненте:</div>
                        </div>
                    </div>
                    <div className="">
                        <Table columns={columns} data={[]} />
                    </div>
                </div> */}

                <div className="call-center__container">
                    <div className="call-center__control">
                        <p className='status'>На линии</p>
                        <div className="" style={{ display: 'flex', gap: '10px' }}>
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
                    <div className="call-center__task">
                        <TaskFromCall />
                    </div>
                    <div className="call-center__info">
                        <div className="call-center__info__main">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <p className="call-center__info__main__number" style={{ margin: 0 }}>+7 (966) 205-95-64</p>
                                <p style={{ margin: 0 }}>Причина вызова: <b>прорвало трубу.</b></p>
                                <div className="call-center__info__main__details">
                                    <p style={{ margin: 0 }}>Информация об абоненте:</p>
                                    <ul style={{ listStyle: 'none',padding: 0, marginTop: '10px' }}>
                                        <li style={{ margin: 0, fontSize: '14px', padding: 0 }}>Лицевой счет: 002348248973</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="call-center__info__last">
                            <Table columns={columns} data={[]} />
                        </div>
                    </div>
                </div>
            </SidebarHeaderLayout>
        </>
    )
})