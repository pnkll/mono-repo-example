import { BellIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, HomeIcon, MailIcon } from "@heroicons/react/solid";
import React from "react";
import './Header.scss'
import Button from '../Button/Button.jsx'
import {Link} from 'react-router-dom'

export default React.memo(function Header({collapsed,setCollapsed}){
    return(
        <>
        <div className="header__container">
            <div className="header__left">
                {collapsed?<ChevronDoubleRightIcon onClick={()=>setCollapsed(!collapsed)} width={30}/>:collapsed!==undefined?<ChevronDoubleLeftIcon onClick={()=>setCollapsed(!collapsed)} width={30}/>:<Link to={'../main'}><HomeIcon width={30}/></Link>}
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