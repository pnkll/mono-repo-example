import React from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import HistoryItem from './HistoryItem/HistoryItem.jsx';
import './History.scss'
import Button from '../Button/Button.jsx';
import { ClockIcon } from '@heroicons/react/outline';

export default React.memo(function History() {
    return (
        <>
            <CardLayout title={'History'} styleWrapper={{ background: 'none', paddingRight: 0 }}>
                <ClockIcon width={20} className='history__icon'/>
                <div className="history__container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <HistoryItem />
                    <HistoryItem />
                    <HistoryItem />
                    <HistoryItem />
                    <div className="history__button">
                        <Button text='Все события' color='green' />
                    </div>
                </div>
            </CardLayout>
        </>
    )
})