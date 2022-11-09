import { withStyles } from '../../hocs/withStyles/withStyles'
import React from 'react';
import s from './TextArea.module.scss'
import { withCounter } from '../../hocs/withCounter/withCounter';
import { compose } from '@reduxjs/toolkit';

function TextArea({ defaultHeight=100, onChange, value, children, ...other }) {
    function setTextAreaHeight(element) {
        const target = element.target ? element.target : element
        target.style.height = defaultHeight + 'px'
        target.style.height = target.scrollHeight + 'px'
    }
    function handleChange(e){
        onChange(e)
        setTextAreaHeight(e)
    }
    return (
        <>
            <textarea
                className={s.input}
                style={{height:defaultHeight}}
                value={value}
                onChange={handleChange}
                {...other}
            />
            {children}
        </>
    )
}

export default compose(withStyles,withCounter)(TextArea)
