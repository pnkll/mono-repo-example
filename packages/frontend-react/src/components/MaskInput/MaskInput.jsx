import React from "react";
import ReactInputMask from "react-input-mask";
import './MaskInput.scss'

export default React.memo(function MaskInput({formik,handleChange, value, mask,id,name,styles,maskPlaceholder,className,required,label}){
    return(
        <>
        <div className="mask-input__container"></div>
        {label&&<label>{label} {required && '*'}</label>}
        <ReactInputMask className={`${className || 'mask-input__input'} ${formik.touched[name]&&formik.errors[name]?'error':''}`} id={id} name={name} value={value} mask={mask} onChange={(e)=>handleChange(e.target.value)} style={styles} maskPlaceholder={maskPlaceholder} required={required}/>
        {formik.touched[name]&&formik.errors[name]&&<p className="mask-input__error"></p>}
        </>
    )
})