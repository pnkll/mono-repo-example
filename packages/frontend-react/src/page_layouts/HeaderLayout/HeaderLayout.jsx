import React from "react";
import Header from "../../components/Header/Header.jsx";
import s from './HeaderLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function HeaderLayout({ children }) {
    return (
        <>
            <div className={cx({ "header-layout__container": true })}>
                <Header />
                <div className={cx({ "header-layout__content": true })}>
                    {children}
                </div>
            </div>
        </>
    )
}