import { InformationCircleIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import './InfoPopUp.scss'

export default React.memo(function InfoPopUp({children}) {
    const [visible,setVisible]=useState(false)
    return (
        <>
            <div className="info-popup__container">
                <InformationCircleIcon width={20} color='#197DD2' style={{ cursor: 'help' }} onMouseOver={() => !visible && setVisible(true)} onMouseOut={() => visible && setVisible(false)} />
                <div className={`info-popup__text ${visible ? '' : 'hide'}`}>
                    {children}
                </div>
            </div>
        </>
    )
})