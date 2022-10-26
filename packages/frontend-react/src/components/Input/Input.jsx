import { isNil } from "lodash"
import React from "react"
import s from './Input.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function Input({ formik, label, placeholder, id, name, type, autoComplete, className, required, handleChange, value, readonly = false, defaultStyles = true, setFocus = null, ...other }) {
    const cls = className || 'input-field'
    const changeHandler = (e) => {
        !isNil(formik) ? formik.handleChange(e) : handleChange(e)
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
                    onChange={changeHandler}
                    type={type}
                    onClick={() => !isNil(formik) && formik.setFieldError(id, '')}
                    autoComplete={autoComplete || 'off'}
                    className={cx({ [`${cls}__input`]: true, error: !isNil(formik) && formik.touched[name] && formik.errors[name], readonly: readonly })}
                    readOnly={readonly}
                    onFocus={setFocus ? () => setFocus(id) : null}
                    onBlur={setFocus ? () => setFocus(null) : null}
                    {...other}
                />

                {!isNil(formik) && formik.touched[name] && formik.errors[name]
                    && <div className={s[`${cls}__error`]}>
                        {formik.errors[name]}
                    </div>}
            </div>
        </>
    )
}