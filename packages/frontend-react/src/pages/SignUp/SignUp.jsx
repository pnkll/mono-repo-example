import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import './SignUp.scss'
import { isNil } from 'lodash';
import AuthField from '../../components/AuthField/AuthField.jsx';
import MessageElem from '../../components/MessageElem/MessageElem.jsx';
import { useNavigate } from 'react-router-dom';

export default React.memo(function SignUp() {
    const getTime = () => {
        const date = new Date()
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    const [messages, setMessages] = useState([
        { id: 'type', question: 'Здравствуйте, вы хотите присоединиться к существующей организации или добавить новую?', answer: null, visible: true, time: getTime()},
        { id: 'org', question: 'Введите ИНН организации и выберите из списка', answer: null, visible: false, time: '' },
        { id: 'email', question: 'Введите e-mail', answer: null, visible: false, time: '' },
        { id: 'password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
        { id: 'passwordRepeat', question: 'Подтвердите пароль', answer: null, visible: false, time: '' },
        { id: 'signin', question: 'Вы успешно зарегистрировались, отправьте "Войти" для того чтобы авторизоваться', answer: null, visible: false, time: '' },
    ])
    const [formiks,setFormiks]=useState([
        { id: 'type', option: useFormik({
            initialValues: {
                type: ''
            },
            onSubmit: values=>{
                sendMessage('type', 'org', values)
                changeField('type', 'org')
            }
        })},
        { id: 'org', option: useFormik({
            initialValues: {
                org: ''
            },
            onSubmit: values => {
                sendMessage('org', 'email', values)
                changeField('org', 'email')
            }
        })},
        { id: 'email', option: useFormik({
            initialValues: {
                email: ''
            },
            onSubmit: values => {
                sendMessage('email', 'password', values)
                changeField('email', 'password')
            }
        })},
        { id: 'password', option: useFormik({
            initialValues: {
                password: ''
            },
            onSubmit: values => {
                sendMessage('password', 'passwordRepeat', {...values, password: values.password.replace(/[\s\S]/g, "*")})
                changeField('password', 'passwordRepeat')
            }
        })},
        {id: 'passwordRepeat', option: useFormik({
            initialValues: {
                passwordRepeat: ''
            },
            onSubmit: values => {
                sendMessage('passwordRepeat', 'signin', {...values, passwordRepeat: values.passwordRepeat.replace(/[\s\S]/g, "*")})
                changeField('passwordRepeat', 'signin')
            }
        })},
        { id: 'signin', option: useFormik({
            initialValues: {
                signin: ''
            },
            onSubmit: values => {
                console.log('Вошел')
            }
        })},
    ])
    const [fields, setFields] = useState([
        { id: 'type', status: 'active', component: <AuthField key={0} formik={formiks.find(formik=>formik.id==='type').option} id='type' name='type' /> },
        { id: 'org', status: 'hiden', component: <AuthField key={1} formik={formiks.find(formik=>formik.id==='org').option} id='org' name='org' /> },
        { id: 'email', status: 'hiden', component: <AuthField key={2} formik={formiks.find(formik=>formik.id==='email').option} id='email' name='email' /> },
        { id: 'password', status: 'hiden', component: <AuthField key={3} formik={formiks.find(formik=>formik.id==='password').option} id='password' name='password' /> },
        { id: 'passwordRepeat', status: 'hiden', component: <AuthField key={4} formik={formiks.find(formik=>formik.id==='passwordRepeat').option} id='passworRepeat' name='passwordRepeat' /> },
        { id: 'signin', status: 'hiden', component: <AuthField key={5} formik={formiks.find(formik=>formik.id==='signin').option} id='signin' name='signin' /> },
    ])
    const sendMessage = (currentField, nextField, values) => {
        setMessages(messages.map((el, index) => el.id === currentField ? { ...el, answer: values[currentField].label?values[currentField].label:values[currentField] } : el.id === nextField ? { ...el, visible: true, time: getTime() } : el))
    }
    const changeField = (currentField, nextField) => {
        setFields(fields.map((field, index) => field.id === currentField ? { ...field, status: 'hiden' } : field.id === nextField ? { ...field, status: 'active' } : field))
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
                {fields.map((field, index) => field.status === 'active' && field.component)}
            </AuthLayout>
        </>
    )
})
