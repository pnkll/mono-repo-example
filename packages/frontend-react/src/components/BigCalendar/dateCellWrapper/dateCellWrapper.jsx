import React from 'react';

export default function dateCellWrapper({children,range,value}){
    console.log(children)
    if(value-new Date('Wed Oct 12 2022 00:00:00 GMT+0300')===0){
        return {...children, props: {...children.props, style: {...children.props.style, background: 'gray'}}}
    } else{
        return children
    }
}