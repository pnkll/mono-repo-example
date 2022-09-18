import React, { useEffect,useState } from 'react';
import './ErrorMessage.scss'
import { useSpring, animated } from 'react-spring';

export default function ErrorMessage({ message }) {
    const [transition,setTransition]=useState(false)
    useEffect(()=>{
        setTransition(true)
        setTimeout(()=>{
            setTransition(false)
        },4000)
    },[])
    const styles=useSpring({opacity:transition?1:0,width:transition?'200':'0px',height:transition?'54px':'0px',fontSize:transition?'12px':'0px'})
    return (
        <>
            <animated.div style={styles} className="error-message__container">
                {message}
            </animated.div>
        </>
    )
}