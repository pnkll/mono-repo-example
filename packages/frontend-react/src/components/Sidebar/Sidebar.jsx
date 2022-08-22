import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import './Sidebar.scss';
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import { BriefcaseIcon, ClipboardCheckIcon, CollectionIcon, CubeIcon } from "@heroicons/react/solid";

export default React.memo(function Sidebar({collapsed}) {
    
    return (
        <>
            <ProSidebar style={{height: '100vh',position: 'sticky', top: 0, zIndex:100}} collapsed={collapsed}>
                <SidebarHeader>
                    <Header collapsed={collapsed}/>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<CubeIcon/>}>Dashboard</MenuItem>
                        <SubMenu title="Pages" icon={<CollectionIcon/>}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to='../main'>Main</Link></MenuItem>
                            <MenuItem><Link to='../constructor'>Constructor</Link></MenuItem>
                            <MenuItem><Link to='../tasks'>Tasks</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Contracts" icon={<BriefcaseIcon/>}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to=''>Main</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Tasks" icon={<ClipboardCheckIcon/>}>
                            <MenuItem><Link to='../demo'>Demo</Link></MenuItem>
                            <MenuItem><Link to=''>Main</Link></MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Footer/>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
})