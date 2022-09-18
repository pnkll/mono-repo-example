import { isNil } from 'lodash';
import React from 'react';

export default function SettingLayout({ children, label }) {
    return (
        <>
            <div className="setting-layout__container" style={{width: 'fit-content'}}>
                {!isNil(label) && <h1>{label}</h1>}
                <div className="setting-layout__content" style={{background: '#ffffff',borderRadius: '5px',padding: '20px'}}>
                    {children}
                </div>
            </div>
        </>
    )
}