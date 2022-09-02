import { PhoneIcon } from '@heroicons/react/solid';
import React from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import './Client.scss'

export default React.memo(function Client() {
    const arr = [
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
        { label: 'Лицевой счет', value: '5462798543' },
    ]
    return (
        <>
            <CardLayout title={'Client'}>
                <p className='client__phone'><PhoneIcon width={20}/>+7(999)199-3829</p>
                <div className="client__wrapper">
                    <CardGridLayout array={arr} />
                </div>
            </CardLayout>
        </>
    )
})