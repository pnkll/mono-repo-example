import { useFormik } from 'formik';
import React, { useState } from 'react';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import './SignUp.scss'
import * as Yup from 'yup'
import { isNil } from 'lodash';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import MessageElem from '../../components/MessageElem/MessageElem.jsx';

export default React.memo(function SignUp() {
    const getTime = () => {
        const date = new Date()
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    const [messages, setMessages] = useState([
        { id: 'org', question: 'Пожалуйста выберите организацию', answer: null, visible: true, time: getTime() },
        { id: 'email', question: 'Введите e-mail', answer: null, visible: false, time: '' },
        { id: 'password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
        { id: 'passwordRepeat', question: 'Подтвердите пароль', answer: null, visible: false, time: '' },
    ])
    const formik = useFormik({
        initialValues: {
            org: ''
        },
        onSubmit: values => {
            sendMessage('org', 'email', values)
            changeForm('org', 'email')
        }
    })
    const formik1 = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            sendMessage('email', 'password', values)
            changeForm('email', 'password')
        }
    })
    const formik2 = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: values => {
            sendMessage('password', 'passwordRepeat', values)
            changeForm('password', 'passwordRepeat')
        }
    })
    const formik3 = useFormik({
        initialValues: {
            passwordRepeat: ''
        },
        onSubmit: values => {
            sendMessage('passwordRepeat', '', values)
        }
    })
    const [forms, setForm] = useState([
        { id: 'org', status: 'active', component: <AuthForm key={0} formik={formik} id='org' name='org' /> },
        { id: 'email', status: 'hiden', component: <AuthForm key={1} formik={formik1} id='email' name='email' /> },
        { id: 'password', status: 'hiden', component: <AuthForm key={2} formik={formik2} id='password' name='password' /> },
        { id: 'passwordRepeat', status: 'hiden', component: <AuthForm key={3} formik={formik3} id='passworRepeat' name='passwordRepeat' /> },
    ])
    const sendMessage = (currentField, nextField, values) => {
        setMessages(messages.map((el, index) => el.id === currentField ? { ...el, answer: values[currentField] } : el.id === nextField ? { ...el, visible: true, time: getTime() } : el))
    }
    const changeForm = (currentForm, nextForm) => {
        setForm(forms.map((form, index) => form.id === currentForm ? { ...form, status: 'hiden' } : form.id === nextForm ? { ...form, status: 'active' } : form))
    }
    return (
        <>
            <AuthLayout>
                <div className="auth__message__container">
                    {messages.map((message, index) => <div key={index} className='auth__message__wrapper'>
                        {!isNil(message.question) && message.visible && <MessageElem message={message} type='question'/>}
                        {!isNil(message.answer) && <MessageElem message={message} type='answer'/>}
                    </div>)}
                </div>
                {forms.map((form, index) => form.status === 'active' && form.component)}
            </AuthLayout>
        </>
    )
})
