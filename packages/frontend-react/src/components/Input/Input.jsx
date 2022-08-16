import React from "react"

export default React.memo(function Input({formik,label,placeholder,id,name,type}){
    return(
        <>
        <div className="flex flex-col">
            <label>{label}</label>
            <input
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                type={type}
            />
            {formik.touched[name]&&formik.errors[name]&&<div className="text-red">{formik.errors[name]}</div>}
        </div>
        </>
    )
})