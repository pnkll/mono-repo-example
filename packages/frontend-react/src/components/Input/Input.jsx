import { BeakerIcon } from "@heroicons/react/solid"
import { concat, isNil } from "lodash"
import React from "react"
import './Input.scss'

export default function Input({formik,label,placeholder,id,name,type,autoComplete,className,required,handleChange,value,readonly=false,defaultStyles=true}){
    const classNamePreffix = className || 'input-field'
    const changeHandler = (e) =>{
                !isNil(formik)?formik.setFieldValue(id,e.target.value):handleChange(e)
    }
    const notEditStyles = {
        border: 0,
    fontSize: '13px',
    borderBottom: '1px solid',
    borderRadius: '4px 4px 0 0',
    paddingLeft: 0,
    paddingRight: '12px',
    }
    return(
        <>
        <div className={`${classNamePreffix}__container`}>
            {!isNil(label)&&<label className={`${classNamePreffix}__label`}>{label} {required && '*'}</label>}
            <input
                required={required}
                id={id}
                name={name}
                value={!isNil(formik)?formik.values[id]:value}
                placeholder={placeholder}
                onChange={changeHandler}
                type={type}
                onClick={()=>!isNil(formik)&&formik.setFieldError(id,'')}
                autoComplete={autoComplete || 'off'}
                className={`${classNamePreffix}__input ${!isNil(formik)&&formik.touched[name]&&formik.errors[name]?'error':''}`}
                readOnly={readonly}
                style={readonly?defaultStyles?notEditStyles:{}:{}}
            />
            {!isNil(formik)&&formik.touched[name]&&formik.errors[name]&&<div className={`${classNamePreffix}__error`}>{formik.errors[name]}</div>}
        </div>
        </>
    )
}