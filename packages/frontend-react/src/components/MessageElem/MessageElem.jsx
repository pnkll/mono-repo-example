import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';


export default React.memo(function MessageElem({ message, type }) {
    const [transition,setTransition]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setTransition(true)
        },1000)
    },[])

    const styles = useSpring({display:transition?'grid':'none',opacity:transition?1:0})
    const lastMessage = useRef()
    useEffect(()=>{
        type==='answer'?lastMessage?.current?.scrollIntoView():transition&&lastMessage?.current?.scrollIntoView()
    },[transition,message])    

    switch (type) {
        case 'question':
            return <>
                <animated.div style={styles} className='auth__message__elem' ref={message.last?lastMessage:null}>
                    <p className='auth__message__elem__text'>{message.question}</p>
                    <p className='auth__message__elem__name'>Minta CRM</p>
                    <p className='auth__message__elem__time'>{message.time}</p>
                </animated.div>
            </>;
        case 'answer':
            return <>
                <div className='auth__message__elem me' ref={message.last?lastMessage:null}>
                    <p className='auth__message__elem__text'>{message.answer}</p>
                    <p className='auth__message__elem__name'>Вы</p>
                    <p className='auth__message__elem__time'>{message.time}</p>
                </div>
            </>
    }
})