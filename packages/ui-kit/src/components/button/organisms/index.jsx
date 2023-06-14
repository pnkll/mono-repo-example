import React from "react";

import s from './styles.module.scss'
import classnames from 'classnames/bind'

const cx=classnames.bind(s)

export function Button({text='text prop', cn}){
    return(<>
    <button className={cx(s.button,{[cn]:cn})}>{text}</button>
    </>)
}