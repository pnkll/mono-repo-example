import { BeakerIcon } from "@heroicons/react/solid"
import { isNil } from "lodash"
import React from "react"
import './Input.scss'

export default React.memo(function Input({formik,label,placeholder,id,name,type,autoComplete,className,required}){
    const classNamePreffix = className || 'input-field'
    return(
        <>
        <div className={`${classNamePreffix}__container`}>
            {!isNil(label)&&<label className={`${classNamePreffix}__label`}>{label} {required && '*'}</label>}
            <input
                required={required}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                type={type}
                onClick={()=>formik.setFieldError(id,'')}
                autoComplete={autoComplete || 'off'}
                className={`${classNamePreffix}__input ${formik.touched[name]&&formik.errors[name]?'error':''}`}
            />
            {formik.touched[name]&&formik.errors[name]&&<div className={`${classNamePreffix}__error`}>{formik.errors[name]}</div>}
        </div>
        </>
    )
})