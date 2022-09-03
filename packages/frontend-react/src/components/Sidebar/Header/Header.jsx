import React from "react";
import './Header.scss'
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../store/slices/userSlice";
import {Link} from "react-router-dom";

export default React.memo(function Header({collapsed}) {
    const user = useSelector(selectCurrentUser)
    return (
        <>
            <div className={`pro-sidebar-header__wrapper ${collapsed ? 'collapsed' : ''}`}>
                <img src='https://html5css.ru/howto/img_avatar.png' alt="" className={`pro-sidebar-header__image ${collapsed ? 'collapsed' : ''}`}/>
                <div className={`pro-sidebar-header__title ${collapsed ? 'collapsed' : ''}`}>
                    <Link to={'../profile'} style={{cursor: 'pointer',color: '#fff'}}>{user.firstname + ' ' + user.lastname}</Link>
                </div>
            </div>
        </>
    )
})