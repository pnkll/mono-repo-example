import React from "react";
import Header from "../../components/Header/Header.jsx";
import './HeaderLayout.scss'

export default React.memo(function HeaderLayout({children}){
    return(
        <>
            <div className="header-layout__container">
                <Header/>
                <div className="header-layout__content">{children}</div>
            </div>
        </>
    )
})