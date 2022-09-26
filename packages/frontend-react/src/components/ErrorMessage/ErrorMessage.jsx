import React, { useEffect,useState } from 'react';
import './ErrorMessage.scss'
import { useSpring, animated } from 'react-spring';

export default function ErrorMessage({ message }) {
    const styles=useSpring({
        from: {
            opacity:0,
            width:'0px',
            height:'0px',
            fontSize: '0px',
        },
        to: {
            opacity: 1,
            width: '200px',
            height: '54px',
            fontSize: '12px'
        },
        delay: 500,
    })
    //const styles=useSpring({opacity:transition?1:0,width:transition?'200':'0px',height:transition?'54px':'0px',fontSize:transition?'12px':'0px'})
    return (
        <>
            <animated.div style={styles} className="error-message__container">
                {message}
            </animated.div>
        </>
    )
}