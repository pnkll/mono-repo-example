import React from "react"

export default React.memo(function Input({formik,label,placeholder,id,name,type}){
    return(
        <>
        <div className="flex flex-col" style={{display: "flex", flexDirection: "column"}}>
            <label>{label}</label>
            <input
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                type={type}
            />
            {formik.touched[name]&&formik.errors[name]&&<div className="text-red" style={{color: "red"}}>{formik.errors[name]}</div>}
        </div>
        </>
    )
})