import React, { useState } from "react"
import './Button.scss'
import { Link } from "react-router-dom"
import { isNil } from "lodash"

export default React.memo(function Button({ type, btn, size, style, width, text, icon, handleClick, href, disabled, w, h, color, classNamePrefix='button' }) {
    if (href) {
        return (
            <Link to={href}
                className={`${classNamePrefix} ${disabled ? 'disabled' : ''}`}
                disabled={disabled || false}
                style={{ width: w, height: h }}
            >
                {icon}
                {text && <span>{text}</span>}
            </Link>
        )
    }  
    else {
        return (
            <button type={type || 'button'}
                className={`${classNamePrefix}${!isNil(color)?' '+color:''} ${disabled ? 'disabled' : ''}`}
                style={{ width: w, height: h }}
                onClick={handleClick}
                disabled={disabled || false}>
                {icon}
                {text && <span>{text}</span>}
            </button>
        )
    }
})

export const SvgLoading = () => {
    return <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xmlSpace="preserve"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#000000" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1200ms" repeatCount="indefinite"></animateTransform></g></svg>
}