import React from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import HistoryItem from './HistoryItem/HistoryItem.jsx';
import './History.scss'

export default React.memo(function History() {
    return (
        <>
            <CardLayout title={'History'} styleWrapper={{background: 'none', paddingRight: 0}}>
                <div className="history__container" style={{display: 'flex',flexDirection: 'column', gap: '20px'}}>
                    <HistoryItem />
                    <HistoryItem />
                    <HistoryItem />
                    <HistoryItem />
                </div>
            </CardLayout>
        </>
    )
})