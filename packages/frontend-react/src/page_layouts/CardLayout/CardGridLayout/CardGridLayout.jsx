import React from 'react';
import s from './CardGridLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function CardGridLayout({array}) {
    return (
        <>
            <div className={cx({"card-grid__container":true})}>
                {array.map((el,index)=><div key={index} className={cx({'card-grid__elem':true})}>
                    <p className={cx({'card-grid__label':true})}>{el.label}</p>
                    <p className={cx({'card-grid__value':true})}>{el.value}</p>
                </div>)}
            </div>
        </>
    )
}