import React from 'react';
import './CardLayout.scss'

export default React.memo(function CardLayout({children,title,style,styleWrapper}) {
    return (
        <>
            <div className="card-layout__container" style={style}>
                <span className='card-layout__title'>{title}</span>
                <div className="card-layout__wrapper" style={styleWrapper}>
                    {children}
                </div>
            </div>
        </>
    )
})