import React from 'react';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import './OperatorPanel.scss'
import { MicButton, PhoneButton, PhoneDownButton, PhoneOutgoingButton } from '../../components/CallButtons/CallButtons.jsx';
import { MicrophoneIcon, PhoneOutgoingIcon } from '@heroicons/react/outline';
import Button from '../../components/Button/Button.jsx';
import Table from '../../components/Table/Table.jsx';
import ReactSelect from 'react-select'

export default React.memo(function OperatorPanel() {
    const columns = [
        { Header: 'Дата', accessor: 'date' },
        { Header: 'Статус', accessor: 'status' },
        { Header: 'Тип', accessor: 'type' },
        { Header: 'Детали', accessor: 'details' }
    ]
    return (
        <>
            <SidebarHeaderLayout>
                <div className="" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div className="display: 'flex', flexDirection: 'column'">
                        <p className='status'>На линии</p>
                        <div className="" style={{ display: 'flex', gap: '10px' }}>
                            <Button text='Отошел' color='yellow' />
                            <Button text='Закончить смену' color='red' />
                        </div>
                    <div className="">
                        <ReactSelect/>
                    </div>
                    </div>
                    <div className="" style={{ display: 'flex', alignItems: 'flex-start', gap: 34 }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <p className="call__number" style={{ margin: 0 }}>+7 (966) 205-95-64</p>
                            <p style={{ margin: 0, fontSize: '14px' }}>Лицевой счет: 002348248973</p>
                        </div>
                        <div className="" style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <MicrophoneIcon width={15} />
                            <PhoneOutgoingIcon width={15} className='phone' />
                            <PhoneDownButton />
                        </div>
                    </div>
                    <div className="">
                        <Table columns={columns} data={[]} />
                    </div>
                </div>
            </SidebarHeaderLayout>
        </>
    )
})