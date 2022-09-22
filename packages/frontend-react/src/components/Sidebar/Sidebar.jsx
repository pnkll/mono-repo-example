import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import './Sidebar.scss';
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import {TableIcon, CollectionIcon, CubeIcon } from "@heroicons/react/outline";

export default function Sidebar({collapsed}) {
    
    return (
        <>
            <ProSidebar style={{ height: 'calc(100vh - 20px)', margin: '10px 0 0 10px',position: 'sticky', top: 0, zIndex:100}} collapsed={collapsed}>
                <SidebarHeader>
                    <Header collapsed={collapsed}/>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<CubeIcon/>}><Link to='../'>Главная</Link></MenuItem>
                        <SubMenu  title="Pages" icon={<CollectionIcon/>}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to='../tasks'>Tasks</Link></MenuItem>
                            <MenuItem><Link to='../call-center'>Control</Link></MenuItem>
                            <MenuItem><Link to='../operator'>Operator</Link></MenuItem>
                            <MenuItem><Link to='../users'>Пользователи</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Таблицы" icon={<TableIcon/>}>
                            <MenuItem><Link to='../tables'>Список таблиц</Link></MenuItem>
                            <MenuItem><Link to='../tables/create'>Создать</Link></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Footer/>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}