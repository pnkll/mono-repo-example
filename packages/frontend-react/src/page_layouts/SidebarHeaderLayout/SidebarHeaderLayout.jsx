import React from "react";
import './SidebarHeaderLayout.scss'
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import TransitionLayout from "../TransitionLayout/TransitionLayout.jsx";
import _ from "lodash";
import ContentSection from "../../components/ContentSection/ContentSection";

export default React.memo(function SidebarHeaderLayout() {
    const transitionForSidebar = {
        from: { transform: 'translateX(-100vw)' },
        to: { transform: 'translateX(0)', zIndex: 100 },
        delay: 100
    }
    return (
        <>
            <div className="sidebar-header-layout__container">
                {<TransitionLayout from='left' overflowX='visible' h='auto' w='auto' custom={transitionForSidebar}>
                    <Sidebar />
                </TransitionLayout>}
                <div className='sidebar-header-layout__wrapper'>
                    <TransitionLayout from='top' overflowX='hidden' h='auto' w='auto'>
                        <Header />
                    </TransitionLayout>
                    <ContentSection />
                </div>
            </div>
        </>
    )
})