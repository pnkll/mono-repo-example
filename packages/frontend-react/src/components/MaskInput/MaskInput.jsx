import React from "react";
import ReactInputMask from "react-input-mask";

export default React.memo(function MaskInput({handleChange, value, mask,id,name,styles,maskPlaceholder,className}){
    return(
        <>
        <ReactInputMask className={className || 'input-mask'} id={id} name={name} value={value} mask={mask} onChange={(e)=>handleChange(e.target.value)} style={styles} maskPlaceholder={maskPlaceholder}/>
        </>
    )
})