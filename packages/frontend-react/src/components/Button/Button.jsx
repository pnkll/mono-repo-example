import React, { useState } from "react"
import './Button.scss'
import { Link } from "react-router-dom"
import { isNil } from "lodash"

export default function Button({ type, btn, size, style, text, icon, handleClick, href, disabled, w = 97, h = 32, color = 'blue', classNamePrefix = 'button', customColor, isLoading = false }) {
    if (href) {
        return (
            <Link to={href}
                className={`${classNamePrefix}${isNil(customColor) ? ' ' + color : ''} ${disabled ? 'disabled' : ''}`}
                disabled={disabled || false}
                style={{
                    width: w, height: h, outline: isLoading ? 'none' : '', backgroundColor: isLoading ? 'white' : customColor ? customColor : '', '&:hover': {
                        backgroundColor: 'red'
                    }
                }}
            >
                {icon}
                {text && <span>{text}</span>}
            </Link>
        )
    }
    else {
        return (
            <button type={type || 'button'}
                className={`${classNamePrefix}${isNil(customColor) ? ' ' + color : ''} ${disabled ? 'disabled' : ''}`}
                style={{
                    width: w, height: h, outline: isLoading ? 'none' : '', backgroundColor: isLoading ? 'white' : customColor ? customColor : '', '&:hover': {
                        backgroundColor: 'red'
                    }
                }}
                onClick={handleClick}
                disabled={disabled || isLoading ? true : false}>
                {icon}
                {text && <span>{isLoading ? <SvgLoading fill={customColor ? customColor : null} /> : text}</span>}
            </button>
        )
    }
}

export const SvgLoading = ({ fill = '' }) => {
    return <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xmlSpace="preserve"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill={fill} /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="500ms" repeatCount="indefinite"></animateTransform></g></svg>
}