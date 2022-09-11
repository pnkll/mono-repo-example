import React from "react";
import './SidebarHeaderLayout.scss'
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CallWrapper from "../../components/CallWrapper/CallWrapper.jsx";
import { useSelector } from "react-redux";
import { selectSidebarCollapsed, selectSidebarVisible } from "../../store/slices/sidebarSlice";
import { Outlet } from "react-router-dom";
import TransitionLayout from "../TransitionLayout/TransitionLayout.jsx";

export default React.memo(function SidebarHeaderLayout({ children }) {
    const collapsed = useSelector(selectSidebarCollapsed)
    const isSomeQueryPending = useSelector(state => Object.values(state.api.queries).some(query => query.status === 'pending'))
    const visible = useSelector(selectSidebarVisible)
    return (
        <>
            <div className="sidebar-header-layout__container">
                {visible&&<TransitionLayout from='left' overflowX='visible' h='auto' w='auto'>
                    <Sidebar collapsed={collapsed} />
                </TransitionLayout>}
                <div className='sidebar-header-layout__wrapper'>
                    <TransitionLayout from='top' overflowX={'auto'} h='auto' w='auto'>
                        <Header collapsed={collapsed} />
                    </TransitionLayout>
                    <div className="sidebar-header-layout__content">
                        <Outlet />
                        <CallWrapper />
                    </div>
                </div>
            </div>
        </>
    )
})