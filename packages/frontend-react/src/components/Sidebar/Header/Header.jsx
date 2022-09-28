import React from "react";
import './Header.scss'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";

export default function Header({ collapsed }) {
    const user = useSelector(selectCurrentUser)
    return (
        <>
            <div className={`pro-sidebar-header__wrapper ${collapsed ? 'collapsed' : ''}`}>
                <Link to={`../users/${user?._id}`} style={{ cursor: 'pointer', color: '#fff' }}>
                    <img src='https://html5css.ru/howto/img_avatar.png' alt="" className={`pro-sidebar-header__image ${collapsed ? 'collapsed' : ''}`} />
                </Link>
                <div className={`pro-sidebar-header__title ${collapsed ? 'collapsed' : ''}`}>
                    <Link to={`../users/${user?._id}`} style={{ cursor: 'pointer', color: '#fff' }}>{user?.firstname + ' ' + user?.lastname}</Link>
                </div>
            </div>
        </>
    )
}