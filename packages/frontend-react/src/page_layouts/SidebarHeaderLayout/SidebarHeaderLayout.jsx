import React, { useRef, useState } from "react";
import './SidebarHeaderLayout.scss'
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CallWrapper from "../../components/CallWrapper/CallWrapper.jsx";
import { useSelector } from "react-redux";
import { selectCollapsed } from "../../store/slices/sidebarSlice";

import { callContollSlice } from "../../store/slices/sidebarSlice";
export default React.memo(function SidebarHeaderLayout({ children }) {
    const collapsed = useSelector(selectCollapsed)
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <div className="sidebar-header-layout__container">
                <Sidebar collapsed={collapsed} />
                <div className='sidebar-header-layout__wrapper'>
                    <Header collapsed={collapsed}/>
                    <div className="sidebar-header-layout__content">
                        {/* <div className="sidebar-header-layout__scroll-container"> */}
                            { children }
                        {/* </div> */}
                        <CallWrapper/>
                    </div>
                </div>
            </div>
        </>
    )
})