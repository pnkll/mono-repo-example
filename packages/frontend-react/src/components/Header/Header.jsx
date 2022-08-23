import { BellIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, HomeIcon, MailIcon } from "@heroicons/react/outline";
import React from "react";
import './Header.scss'
import Button from '../Button/Button.jsx'
import {Link} from 'react-router-dom'
import { MenuAlt1Icon, MenuIcon } from "@heroicons/react/outline";

export default React.memo(function Header({collapsed,setCollapsed}){
    return(
        <>
        <div className="header__container">
            <div className="header__left">
                {collapsed?<MenuIcon style={{cursor: 'pointer'}} onClick={()=>setCollapsed(!collapsed)} width={30}/>:collapsed!==undefined?<MenuAlt1Icon style={{cursor: 'pointer'}} onClick={()=>setCollapsed(!collapsed)} width={30}/>:<Link to={'../main'}><HomeIcon width={30}/></Link>}
            </div>
            <div className="header__middle">Search</div>
            <div className="header__right">
                <Link to='inbox'><MailIcon width={20}/></Link>
                <Link to=''><BellIcon width={20}/></Link>
                <Button text='Logout' color='white'/>
            </div>
        </div>
        </>
    )
})