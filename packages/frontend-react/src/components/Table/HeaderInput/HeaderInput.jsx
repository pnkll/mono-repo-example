import { SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import './HeaderInput.scss'

export default React.memo(function HeaderInput({ header, handleFilter }) {
    const [focused,setFocused]=useState(false)
    return (
        <>
            <div className="header-input">
                {!focused&&<SearchIcon width={15} />}<input onFocus={()=>setFocused(true)} className="header-input__input" type='text' onBlur={(e) => {handleFilter(e.target.value, header);setFocused(false)}} placeholder={header.Header} />
            </div>
        </>
    )
})