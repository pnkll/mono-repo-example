import { isNil } from 'lodash';
import React from 'react';
import s from './SettingLayout.module.scss'

export default function SettingLayout({ children, label }) {
    return (
        <>
            <div className={s["setting-layout__container"]}>
                {!isNil(label) && <h1>{label}</h1>}
                <div className={s["setting-layout__content"]}>
                    {children}
                </div>
            </div>
        </>
    )
}