import React from "react";
import './Footer.scss'
import { Link } from 'react-router-dom'
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Menu, MenuItem } from "react-pro-sidebar";

export default React.memo(function Footer() {
    return (
        <>
            <div className="pro-sidebar-footer__wrapper">
                    <Menu>
                        <MenuItem icon={<QuestionMarkCircleIcon/>}>
                        <Link to='../help'>Help</Link>
                        </MenuItem>
                    </Menu>
            </div>
        </>
    )
})