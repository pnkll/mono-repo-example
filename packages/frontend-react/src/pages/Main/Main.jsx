import React, { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
//import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default React.memo(function Main() {
    const[collapsed,setCollapsed]=useState(false)
    return (
        <>
            <div className="main-page__container" style={{display: 'flex'}}>
                <Sidebar collapsed={collapsed}/>
                <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
            </div>

        </>
    )
})