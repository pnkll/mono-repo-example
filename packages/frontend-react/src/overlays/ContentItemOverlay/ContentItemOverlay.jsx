import React from 'react';
import s from './ContentItemOverlay.module.scss'

export default function ContentItemOverlay({children, label}){
   return(
       <>
       <div className={s.container}>
        <label className={s.label}>{label}</label>
        <div className={s.content}>
            {children}
        </div>
       </div>
       </>
   )
}