import React from "react"
import s from './Input.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

const Input = React.forwardRef((props, ref) => {
    const { onChange, touched, errors, autoComplete = 'off', className, value, readonly, ...other } = props

    const cls = className || 'input-field'

    const valid = touched && !errors
    const error = touched && errors


    return (
        <>
            <div className={cx(s.container,{error,readonly,valid,[className]:className})}>
                <input
                    value={value}
                    autoComplete={autoComplete}
                    //className={cx(s.input, { error, readonly, valid, [className]: className })}
                    className={s.input}
                    ref={ref}
                    onChange={(e) => onChange(e)}
                    {...other}
                />
            </div>
        </>
    )
})

export default Input