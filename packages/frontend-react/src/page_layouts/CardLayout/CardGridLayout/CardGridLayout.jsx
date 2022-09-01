import React from 'react';
import './CardGridLayout.scss'

export default React.memo(function CardGridLayout({array}) {
    return (
        <>
            <div className="card-grid__container">
                {array.map((el,index)=><div className='card-grid__elem'>
                    <p className='card-grid__label'>{el.label}</p>
                    <p className='card-grid__value'>{el.value}</p>
                </div>)}
            </div>
        </>
    )
})