import React from 'react';
import './TwoColumnItemLayout.scss'

export default function TwoColumnItemLayout({children, label}){
   return(
       <>
        <div className="item-layout__container" style={{    minWidth: '48%', maxWidth: '48%', flex: '0 1 50%'}}>
            <h1>{label}</h1>
            <div className="item-layout__content">
                {children}
            </div>
        </div>
       </>
   )
}