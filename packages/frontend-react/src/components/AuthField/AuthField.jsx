import { ChatIcon } from '@heroicons/react/outline';
import { Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import Input from '../Input/Input.jsx';
import InputDadata from '../InputDadata/InputDadata.jsx';
import './AuthField.scss'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default React.memo(function AuthField({ id, name, type = 'text', messages, setMessages, sendMessages, currentForm, setData, data, formiks, setCurrentForm,nextField }) {
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        sendMessages(name, nextField(id), values, messages, setMessages)
        if(id!=='signin'){setData([...data, values])
        setCurrentForm(formiks.find(formik => formik.id === nextField(id)))}
        else{
            console.log(data)
            navigate('../')
        }
    }
    const validationSchema = id === 'password_repeat' ? Yup.object().shape({
        password_repeat: Yup.string().required().test('repeat-password', 'Пароли не совпадают', (value => value === data.find(el => Object.keys(el)[0] === 'password').password))
    }) : currentForm?.validationSchema
    return (
        <>
            <Formik initialValues={currentForm.initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {formik => (
                    <>
                        <form className='auth-field' onSubmit={(e) => { e.preventDefault(); formik.submitForm(); }}>
                            {id === 'organization' ? <InputDadata formik={formik} id={id} name={name} classNamePrefix='auth-field' />
                                : <Input type={type} placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-field-input' />}
                            <button type='submit' className='auth-field__button'><ChatIcon width={30} /></button>
                        </form>

                        {id === 'type' ? <div className="auth-field__buttons">
                            <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Присоединиться') }}>Присоединиться</div>
                            <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Добавить') }}>Добавить</div>
                        </div> : id === 'signin' &&
                        <div className='auth-field__buttons'>
                            <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Войти');formik.submitForm() }}>Войти</div>
                        </div>}
                    </>)}
            </Formik>
        </>
    )
})