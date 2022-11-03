import { isNil } from "lodash"
import React from "react"
import s from './Input.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

const Input = React.forwardRef(({ formik, label, placeholder, id, name, type, autoComplete, className, required, handleChange:onChange, value, readonly = false, defaultStyles = true, setFocus = null, ...other },ref) =>{
    const cls = className || 'input-field'
    // const changeHandler = (e) => {
    //     !isNil(formik) ? formik.handleChange(e) : handleChange(e)
    // }

    

    const [focused, setFocused] = React.useState(false)

    const valid = !isNil(formik) && formik.touched[id] && !formik.errors[id]
    const error = !isNil(formik) && formik.touched[id] && formik.errors[id]

    function handleChange(e){
        !isNil(formik)
            ?formik.handleChange(e)
            :onChange(e)
    }
    function handleBlur(e){
        !isNil(formik)&&formik.handleBlur(e)
        setFocused(false)
    }


    return (
        <>
            <div className={s[`${cls}__container`]}>
                {!isNil(label) && <label className={s[`${cls}__label`]}>
                    {label} {required && '*'}
                </label>}
                <input
                    required={required}
                    id={id}
                    name={name}
                    value={!isNil(formik) ? formik.values[id] : value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    type={type}
                    autoComplete={autoComplete || 'off'}
                    className={cx({ [`${cls}__input`]: true, error, readonly, valid, focused })}
                    readOnly={readonly}
                    onFocus={() => setFocused(true)}
                    onBlur={handleBlur}
                    ref={ref}
                    {...other}
                />
                {!isNil(formik) && formik.touched[id] && formik.errors[id]
                    && <p className={s[`${cls}__error`]}>
                        {formik.errors[id]}
                    </p>}
            </div>
        </>
    )
})

export default Input