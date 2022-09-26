import React from "react";
import './SidebarHeaderLayout.scss'
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CallWrapper from "../../components/CallWrapper/CallWrapper.jsx";
import { useSelector } from "react-redux";
import { selectSidebarCollapsed, selectSidebarVisible } from "../../store/slices/sidebarSlice";
import { Outlet } from "react-router-dom";
import TransitionLayout from "../TransitionLayout/TransitionLayout.jsx";
import { selectNotifications } from "../../store/slices/notificationsSlice";
import Notification from "../../components/Notification/Notification.jsx";

export default function SidebarHeaderLayout({ children }) {
    const collapsed = useSelector(selectSidebarCollapsed)
    const isSomeQueryPending = useSelector(state => Object.values(state.api.queries).some(query => query.status === 'pending'))
    const visible = useSelector(selectSidebarVisible)
    const notificationsList = useSelector(selectNotifications)
    return (
        <>
            <div className="sidebar-header-layout__container">
                {visible && <TransitionLayout from='left' overflowX='visible' h='auto' w='auto' custom={{
                    from: { transform: 'translateX(-100vw)' },
                    to: { transform: 'translateX(0)', zIndex: 100 },
                    delay: 100
                }}>
                    <Sidebar collapsed={collapsed} />
                </TransitionLayout>}
                <div className='sidebar-header-layout__wrapper'>
                    <TransitionLayout from='top' overflowX={'auto'} h='auto' w='auto'>
                        <Header collapsed={collapsed} />
                    </TransitionLayout>
                    <div className="sidebar-header-layout__content">
                        {notificationsList.length > 0
                            && <div className="sidebar-header-layout__content__notifications__wrapper">
                                {notificationsList.map(el => <Notification key={el.id} id={el.id} type={el.type} message={el.message} />)}
                            </div>}
                        <Outlet />
                        <CallWrapper />
                    </div>
                </div>
            </div>
        </>
    )
}