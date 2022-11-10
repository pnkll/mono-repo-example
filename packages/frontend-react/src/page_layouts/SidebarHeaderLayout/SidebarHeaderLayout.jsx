import React from "react";
import Header from "@components/Header/Header.jsx";
import _ from "lodash";
import ContentSection from "@components/ContentSection/ContentSection";
import s from './SidebarHeaderLayout.module.scss'
import Sidebar from "@components/Sidebar/Sidebar";
import { useSocket } from "@src/providers/Socket/SocketContext";
import { useSelector } from "react-redux";
import { selectToken } from "@store/slices/appSlice";

export default React.memo(function SidebarHeaderLayout() {


    return (
        <>
            <div className={s['sidebar-header-layout__container']}>
                {/* <Sidebar /> */}
                <div className={s['sidebar-header-layout__wrapper']}>
                    <Header />
                    <ContentSection />
                </div>
            </div>
        </>
    )
})