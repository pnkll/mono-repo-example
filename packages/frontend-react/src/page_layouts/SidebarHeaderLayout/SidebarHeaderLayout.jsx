import React,{useState} from "react";
import './SidebarHeaderLayout.scss'
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CallControl from "../../components/CallControl/CallControl.jsx";

export default React.memo(function SidebarHeaderLayout({ children }) {
    const[collapsed,setCollapsed]=useState(false)
    const[expanded,setExpanded]=useState(false)
    return (
        <>
            <div className="sidebar-header-layout__container">
                <Sidebar collapsed={collapsed}/>
                <div className='sidebar-header-layout__wrapper'>
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                    <div className="sidebar-header-layout__content">
                        {children}
                        <CallControl expanded={expanded} setExpanded={setExpanded}/>
                    </div>
                </div>
            </div>
        </>
    )
})