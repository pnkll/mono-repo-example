import React from 'react';
import s from './CardLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function CardLayout({children,title,style,styleWrapper}) {
    return (
        <>
            <div className={cx({"card-layout__container":true})} style={style}>
                <span className={cx({'card-layout__title':true})}>{title}</span>
                <div className={cx({"card-layout__wrapper":true})} style={styleWrapper}>
                    {children}
                </div>
            </div>
        </>
    )
}