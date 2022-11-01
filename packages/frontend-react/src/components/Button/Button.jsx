import { Link } from "react-router-dom"
import s from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function Button({ style = null, type, text, icon, handleClick, href, disabled = false, color = 'blue', cls = 'button', customColor = null, isLoading = false }) {

    function getColor(){
        switch (color) {
            case 'blue':
                return 'primary'
            case 'red':
                return 'danger'
            case 'green':
                return 'access'
            case 'white':
                return 'default'        
        }
    }


    if (href) {
        return (
            <Link to={href}
                className={cx({ [cls]: true, disabled: disabled, [getColor()]: true, loading: isLoading })}
                disabled={disabled}
                style={style}
            >
                {icon}
                {text && <span>{text}</span>}
            </Link>
        )
    }
    else {
        return (
            <button type={type || 'button'}
                className={cx({ [cls]: true, disabled: disabled, [getColor()]: true, loading: isLoading })}
                style={style}
                onClick={handleClick}
                disabled={disabled || isLoading}>
                {icon}
                {text
                    && <span>{isLoading
                        ? <SvgLoading fill={customColor} />
                        : text}</span>}
            </button>
        )
    }
}

export const SvgLoading = ({ fill = '' }) => {
    return <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xmlSpace="preserve"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill={fill} /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="500ms" repeatCount="indefinite"></animateTransform></g></svg>
}