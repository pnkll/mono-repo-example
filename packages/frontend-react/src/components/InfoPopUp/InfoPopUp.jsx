import { InformationCircleIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import './InfoPopUp.scss'

export default React.memo(function InfoPopUp({ children, color = '#197DD2', width = 20,style,popupStyle }) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div style={style}>
                <div className="info-popup__container">
                    <InformationCircleIcon width={width} color={color} style={{ cursor: 'help' }} onMouseOver={() => !visible && setVisible(true)} onMouseOut={() => visible && setVisible(false)} />
                    <div className={`info-popup__text ${visible ? '' : 'hide'}`} style={popupStyle}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
})