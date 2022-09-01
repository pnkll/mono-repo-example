import React from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';

export default React.memo(function Client() {
    const arr=[
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
        {label: 'Лицевой счет',value: '5462798543'},
    ]
    return (
        <>
            <CardLayout title={'Client'}>
                <div className="client__wrapper">
                    <CardGridLayout array={arr}/>
                </div>
            </CardLayout>
        </>
    )
})