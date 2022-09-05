import React from "react";
import './Header.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setUser} from "../../../store/slices/userSlice";
import {Link} from "react-router-dom";
import { usersApi } from "../../../services/UsersService";
import { rolesApi } from "../../../services/RolesService";

export default React.memo(function Header({collapsed}) {
    const dispatch = useDispatch()
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