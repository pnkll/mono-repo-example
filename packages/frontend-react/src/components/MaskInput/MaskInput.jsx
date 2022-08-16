import React from "react";
import ReactInputMask from "react-input-mask";

export default React.memo(function MaskInput({handleChange, value, mask,id,name}){
    return(
        <>
        <ReactInputMask id={id} name={name} value={value} mask={mask} onChange={(e)=>handleChange(e.target.value)}></ReactInputMask>
        </>
    )
})