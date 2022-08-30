import { isNil } from 'lodash';
import React from 'react';
import MessageElem from '../MessageElem/MessageElem.jsx';


export default React.memo(function AuthMessages({messages}){
   return(
       <>
       <div className="auth__message__container">
                    {messages.map((message, index) => <div key={index} className='auth__message__wrapper'>
                        {!isNil(message.question) && message.visible && <MessageElem  message={message} type='question' />}
                        {!isNil(message.answer) && <MessageElem message={message} type='answer' />}
                    </div>)}
                </div>
       </>
   )
})