import React, { useEffect, useState, useRef } from 'react';
import s from './MessageElem.module.scss'


export default function MessageElem({ message, type }) {
    const [visible,setVisible]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setVisible(true)
        },1000)
    },[])

    const lastMessage = useRef()
    useEffect(()=>{
        type==='answer'?visible&&lastMessage?.current?.scrollIntoView():visible&&lastMessage?.current?.scrollIntoView()
    },[visible,message])    
    switch (type) {
        case 'question':
            return <>
                {visible&&<div className={`${s['message__elem']}`} ref={message.last?lastMessage:null}>
                    <p className={s['message__elem__text']}>{message.question}</p>
                    <p className={s['message__elem__name']}>Minta CRM</p>
                    <p className={s['message__elem__time']}>{message.time}</p>
                </div>}
            </>;
        case 'answer':
            return <>
                <div className={`${s['message__elem']} ${s.me}`} ref={message.last?lastMessage:null}>
                    <p className={s['message__elem__text']}>{message.answer}</p>
                    <p className={s['message__elem__name']}>Вы</p>
                    <p className={s['message__elem__time']}>{message.time}</p>
                </div>
            </>
    }
}