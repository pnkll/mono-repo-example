import { ChatIcon } from '@heroicons/react/outline';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import Input from '../Input/Input.jsx';
import InputDadata from '../InputDadata/InputDadata.jsx';
import './AuthField.scss'

export default React.memo(function AuthField({ id, name, type = 'text', messages, setMessages, fields, setFields, changeField, sendMessages }) {
    const formik = useFormikContext()
    console.log(formik)
    const nextField = () => {
        switch (id) {
            case 'type': return 'org'
            case 'org': return 'email'
            case 'email': return 'password'
            case 'password': return 'passwordRepeat'
            case 'passwordRepeat': return 'signin'

        }
    }
    // useEffect(()=>{
    //     if(formik.submitCount>0&&formik.isValid){
    //         console.log(formik)
    //         // sendMessages(name, nextField(), formik.values, messages, setMessages)
    //         // changeField(name, nextField(), fields, setFields)
    //     }
    // },[formik.submitCount,formik.errors])
    const handleSubmit = () =>{
            formik.submitForm()
            sendMessages(name, nextField(), formik.values, messages, setMessages)
            changeField(name, nextField(), fields, setFields)
    }
    return (
        <>
            <form className='auth-field' onSubmit={(e) => { e.preventDefault(); handleSubmit()}}>
                {id === 'org' ? <InputDadata formik={formik} id={id} name={name} classNamePrefix='auth-field' />
                    : <Input type={type} placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-field-input' />}
                <button type='submit' className='auth-field__button'><ChatIcon width={30} /></button>
            </form>
            {id === 'type' ? <div className="auth-field__buttons">
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Присоединиться'); formik.submitForm(); sendMessages(name, nextField(), { [id]: 'Присоединиться' }, messages, setMessages); changeField(name, nextField(), fields, setFields) }}>Присоединиться</div>
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Добавить'); formik.submitForm(); sendMessages(name, nextField(), { [id]: 'Добавить' }, messages, setMessages); changeField(name, nextField(), fields, setFields) }}>Добавить</div>
            </div> : id === 'signin' &&
            <div className='auth-field__buttons'>
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Войти'); }}>Войти</div>
            </div>}
        </>
    )
})