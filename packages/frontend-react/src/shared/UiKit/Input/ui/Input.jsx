import { isNil } from "lodash"
import React from "react"
import s from './Input.module.scss'
import classNames from 'classnames/bind'
import { withOverlay } from "@src/shared/UiKit/Select/withOverlay"

const cx = classNames.bind(s)

const Input = React.forwardRef((props, ref) => {
    const {onChange, touched, errors, autoComplete = 'off', className, value, readonly, ...other } = props

    const cls = className || 'input-field'

    const valid = touched && !errors
    const error = touched && errors


    return (
        <>
            <input
                value={value}
                autoComplete={autoComplete}
                className={cx({ input: true, error, readonly, valid, [className]:className })}
                ref={ref}
                onChange={(e)=>onChange(e.target.value)}
                {...other}
            />
        </>
    )
})

export default Input