import { isNil } from 'lodash';
import React from 'react';
import MessageElem from './MessageElem/MessageElem.jsx';
import s from './AuthMessages.module.scss'

export default React.memo(function AuthMessages({messages}){
   return(
       <>
       <div className={s["message__container"]}>
                    {messages.map((message, index) => <div key={index} className={s['message__wrapper']}>
                        {!isNil(message.question) && message.visible && <MessageElem  message={message} type='question' />}
                        {!isNil(message.answer) && <MessageElem message={message} type='answer' />}
                    </div>)}
                </div>
       </>
   )
})