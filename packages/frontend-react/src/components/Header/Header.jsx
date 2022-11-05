import { BellIcon, HomeIcon, MailIcon } from "@heroicons/react/outline";
import React from "react";
import './Header.scss'
import Button from '../Button/Button.jsx'
import { MenuAlt1Icon, MenuIcon } from "@heroicons/react/outline";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs.jsx";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarCollapsed, setSidebarCollapsed } from "../../store/slices/sidebarSlice";
import { logout, selectDarkMode, setDarkMode } from "../../store/slices/appSlice";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import ConfirmPopup from "@components/Popup/ConfirmPopup/ConfirmPopup";
import { withTransition } from "@src/hocs/withTransition/withTransition";

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    function onAccessLogoutPopup() {
        dispatch(logout())
        navigate('../')
        setShowModal(false)
    }
    function handleLogout() {
        setShowModal(true)
    }
    const collapsed = useSelector(selectSidebarCollapsed)
    const darkMode = useSelector(selectDarkMode)
    function renderToggleMode(w) {
        if (darkMode) { return <MoonIcon style={{ cursor: "pointer" }} width={w} onClick={() => dispatch(setDarkMode())} /> }
        else { return <SunIcon style={{ cursor: "pointer" }} width={w} onClick={() => dispatch(setDarkMode())} /> }
    }
    return (
        <>
            <div className="header__container">
                <div className="header__left">
                    {collapsed ? <MenuIcon style={{ cursor: 'pointer' }} onClick={() => dispatch(setSidebarCollapsed())} width={30} /> : collapsed !== undefined ? <MenuAlt1Icon style={{ cursor: 'pointer' }} onClick={() => dispatch(setSidebarCollapsed())} width={30} /> : ''}
                </div>
                <div className="header__middle">
                    <BreadCrumbs />
                </div>
                <div className="header__toggle-mode">
                    {renderToggleMode()}
                </div>
                <div className="header__right">
                    {renderToggleMode(20)}
                    <Link to='inbox' style={{ display: 'flex' }}><MailIcon width={20} /></Link>
                    <Link to='' style={{ display: 'flex' }}><BellIcon width={20} /></Link>
                    <Button text='Выйти' color='white' handleClick={handleLogout} />
                </div>
            </div>
            {showModal && <ConfirmPopup isOpen={showModal} onRequestClose={() => setShowModal(false)} onAccess={onAccessLogoutPopup} question='Вы действительно хотите выйти?'/>}
        </>
    )
}

export default Header = withTransition(Header,'Header','top',{width: 'auto', height: 'auto'})