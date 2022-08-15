import React from "react"

export default React.memo(function Main(){
    return(
        <>
        <div onClick={()=>console.log('hello')}>root</div>
        </>
    )
})