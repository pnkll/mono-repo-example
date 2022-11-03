export default function dateCellWrapper({children,range,value}){
    if(value-new Date('Wed Oct 12 2022 00:00:00 GMT+0300')===0){
        return {...children, props: {...children.props, style: {...children.props.style, background: 'gray'}}}
    }
    else if(value-new Date('Wed Oct 16 2022 00:00:00 GMT+0300')===0){
        return {...children, props: {...children.props, style: {...children.props.style, background: 'yellow'}}}
    }
    else if(value-new Date('Wed Oct 17 2022 00:00:00 GMT+0300')===0){
        return {...children, props: {...children.props, style: {...children.props.style, background: 'green'}}}
    }
    else{
        return children
    }
}