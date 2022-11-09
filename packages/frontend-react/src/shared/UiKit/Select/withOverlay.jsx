import React from "react"

export function withOverlay(Component,displayName){
    const Overlay=React.forwardRef(({label, ...other},ref)=>{
        return (
            <div className="" style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{ padding: '5px' }}>{label}</label>
                <Component {...other} ref={ref}/>
            </div>
        )
    })
    Overlay.displayName=displayName
    return Overlay
}