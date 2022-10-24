import React from "react";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import TransitionLayout from "../TransitionLayout/TransitionLayout.jsx";
import _ from "lodash";
import ContentSection from "../../components/ContentSection/ContentSection";
import s from './SidebarHeaderLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s) 

export default React.memo(function SidebarHeaderLayout() {
    const transitionForSidebar = {
        from: { transform: 'translateX(-100vw)' },
        to: { transform: 'translateX(0)', zIndex: 100 },
        delay: 100
    }
    const dark = false
    return (
        <>
            <div className={cx({'sidebar-header-layout__container':true, mode: dark})}>
                {<TransitionLayout from='left' overflowX='visible' h='auto' w='auto' custom={transitionForSidebar}>
                    <Sidebar />
                </TransitionLayout>}
                <div className={cx({'sidebar-header-layout__wrapper':true})}>
                    <TransitionLayout from='top' overflowX='hidden' h='auto' w='auto'>
                        <Header />
                    </TransitionLayout>
                    <ContentSection />
                </div>
            </div>
        </>
    )
})