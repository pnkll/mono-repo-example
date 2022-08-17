import React from "react";
import './Header.scss'

export default React.memo(function Header({collapsed}){
    return(
        <>
            <div className={`pro-sidebar-header__wrapper ${collapsed?'collapsed':''}`}>
                <img src='https://html5css.ru/howto/img_avatar.png' alt="" className={`pro-sidebar-header__image ${collapsed?'collapsed':''}`}/>
                <div className={`pro-sidebar-header__title ${collapsed?'collapsed':''}`}>Jonh dow</div>
            </div>
        </>
    )
})