import React from "react"

export function withLabel(Component,displayName){
    const Label=React.forwardRef(({label, ...other},ref)=>{
        return (
            <div className="" style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{ padding: '5px' }}>{label}</label>
                <Component {...other} ref={ref}/>
            </div>
        )
    })
    Label.displayName=displayName
    return Label
}