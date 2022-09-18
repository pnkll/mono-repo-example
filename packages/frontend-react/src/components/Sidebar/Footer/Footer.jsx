import React from "react";
import './Footer.scss'
import { Link } from 'react-router-dom'
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Menu, MenuItem } from "react-pro-sidebar";
import { CogIcon } from "@heroicons/react/outline";

export default function Footer() {
    return (
        <>
            <div className="pro-sidebar-footer__wrapper">
                <Menu>
                    <MenuItem icon={<CogIcon />}>
                        <Link to='../settings'>Settings</Link>
                    </MenuItem>
                    <MenuItem icon={<QuestionMarkCircleIcon />}>
                        <Link to='../help'>Help</Link>
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}