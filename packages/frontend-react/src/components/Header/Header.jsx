import { BellIcon, HomeIcon, MailIcon } from "@heroicons/react/outline";
import React from "react";
import './Header.scss'
import Button from '../Button/Button.jsx'
import { MenuAlt1Icon, MenuIcon } from "@heroicons/react/outline";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs.jsx";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setSidebarCollapsed } from "../../store/slices/sidebarSlice";
import { logout } from "../../store/slices/appSlice";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import { useRef } from "react";

export default function Header({ collapsed }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const modalCallback = useRef()
    function handleLogout() {
        modalCallback.current = () => {
            dispatch(logout())
            navigate('../')
        }
        setShowModal(true)
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
                <div className="header__right">
                    <Link to='inbox'><MailIcon width={20} /></Link>
                    <Link to=''><BellIcon width={20} /></Link>
                    <Button text='Выйти' color='white' handleClick={handleLogout} />
                </div>
            </div>
            <ConfirmModal isOpen={showModal} setIsOpen={setShowModal} callback={modalCallback} label={'Вы действительно хотите выйти?'} />
        </>
    )
}