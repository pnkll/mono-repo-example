import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import './Sidebar.scss';
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import { TableIcon, CollectionIcon, CubeIcon, TemplateIcon, ClipboardListIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Sidebar({ collapsed }) {
    const [subMenu, setSubMenu] = useState([
        { open: false },
        { open: false },
        { open: false },
    ])
    return (
        <>
            <ProSidebar style={{ height: 'calc(100vh - 20px)', margin: '10px 0 0 10px', position: 'sticky', top: 0, zIndex: 100 }} collapsed={collapsed}>
                <SidebarHeader>
                    <Header collapsed={collapsed} />
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<TemplateIcon />}><Link to='../'>Главная</Link></MenuItem>
                        <SubMenu
                            open={subMenu[0].open}
                            onOpenChange={() => setSubMenu(subMenu.map((el, index) => index === 0 ? { ...el, open: !el.open } : { ...el, open: false }))}
                            title="Pages" icon={<CollectionIcon />}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to='../tasks'>Tasks</Link></MenuItem>
                            <MenuItem><Link to='../call-center'>Control</Link></MenuItem>
                            <MenuItem><Link to='../operator'>Operator</Link></MenuItem>
                            <MenuItem><Link to='../users'>Пользователи</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Таблицы" icon={<TableIcon />}
                            open={subMenu[1].open}
                            onOpenChange={() => setSubMenu(subMenu.map((el, index) => index === 1 ? { ...el, open: !el.open } : { ...el, open: false }))}>
                            <MenuItem><Link to='../tables'>Список таблиц</Link></MenuItem>
                            <MenuItem><Link to='../tables/create'>Создать</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Задачи" icon={<ClipboardListIcon />}
                            open={subMenu[2].open}
                            onOpenChange={() => setSubMenu(subMenu.map((el, index) => index === 2 ? { ...el, open: !el.open } : { ...el, open: false }))}>
                            <MenuItem><Link to='../tasks'>Все</Link></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Footer />
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}