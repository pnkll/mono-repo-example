import React from 'react';
import './CardLayout.scss'

export default React.memo(function CardLayout({children,title,style,styleWrapper}) {
    return (
        <>
            <div className="card-layout__container" style={style}>
                <p className='card-layout__title'>{title}</p>
                <div className="card-layout__wrapper" style={styleWrapper}>
                    {children}
                </div>
            </div>
        </>
    )
})