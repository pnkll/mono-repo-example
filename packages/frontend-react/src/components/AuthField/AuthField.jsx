import { ChatIcon } from '@heroicons/react/outline';
import React from 'react';
import Input from '../Input/Input.jsx';
import InputDadata from '../InputDadata/InputDadata.jsx';
import './AuthField.scss'

export default React.memo(function AuthField({ formik, id, name, type='text' }) {
    return (
        <>
            <form className='auth-field' onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                {id === 'org' ? <InputDadata formik={formik} id={id} name={name} classNamePrefix='auth-field' />
                    : <Input type={type} placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-field-input' />}
                <button type='submit' className='auth-field__button'><ChatIcon width={30} /></button>
            </form>
            {id === 'type' ? <div className="auth-field__buttons">
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(name, 'Присоединиться'); formik.handleSubmit() }}>Присоединиться</div>
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(name, 'Добавить'); formik.handleSubmit() }}>Добавить</div>
            </div> : id === 'signin' &&
            <div className='auth-field__buttons'>
                <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(name, 'Войти');formik.handleSubmit() }}>Войти</div>
            </div>}
        </>
    )
})