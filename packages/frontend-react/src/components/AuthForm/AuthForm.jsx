import { ChatIcon } from '@heroicons/react/solid';
import React from 'react';
import Input from '../Input/Input.jsx';
import './AuthForm.scss'

export default React.memo(function AuthForm({ formik, id, name }) {
    return (
        <>
            <form className='auth-form' onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                <Input type='text' placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-form-input'/>
                <button type='submit' className='auth-form__button'><ChatIcon width={30}/></button>
            </form>
        </>
    )
})