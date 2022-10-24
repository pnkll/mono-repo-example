import React from 'react';
import s from './TwoColumnLayout.module.scss'

export default function TwoColumnLayout({ children }) {
    return (
        <>
            <div className={s["two-column-layout"]}>
                {children}
            </div>
        </>
    )
}