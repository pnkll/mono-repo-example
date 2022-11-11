import React from "react"
import s from './Input.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

const Input = React.forwardRef((props, ref) => {
    const { name,onBlur, onChange, touched, errors, autoComplete = 'off', className, value, readonly, ...other } = props

    const valid = touched[name] && !errors[name]
    const error = touched[name] && errors[name]

    const [focus,setFocus]=React.useState(false)

    return (
        <>
            <div className={cx(s.container,{error,readonly,valid,focus,[className]:className})}>
                <input
                    name={name}
                    value={value}
                    autoComplete={autoComplete}
                    className={s.input}
                    ref={ref}
                    onChange={onChange}
                    onBlur={(e)=>{setFocus(false);onBlur(e)}}
                    onFocus={(e)=>{setFocus(true)}}
                    {...other}
                />
            </div>
        </>
    )
})

export default Input