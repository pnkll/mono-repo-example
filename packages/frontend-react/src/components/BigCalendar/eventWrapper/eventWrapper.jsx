import React from 'react';

export default function eventWrapper({event,children}){
   switch (event.resourceId) {
    case 'task':
        switch (event.priority) {
            case 0: return {...children, props: {...children.props, style: {...children.props.style, background:'blue'}}}
            case 1: return {...children, props: {...children.props, style: {...children.props.style, background:'green'}}}
            case 2: return {...children, props: {...children.props, style: {...children.props.style, background:'lightgreen'}}}
            case 3: return {...children, props: {...children.props, style: {...children.props.style, background:'orange'}}}
            case 4: return {...children, props: {...children.props, style: {...children.props.style, background:'red'}}}
        }
    default:
        return children
   }
}