import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import './SignUp.scss'
import { isNil } from 'lodash';
import AuthField from '../../components/AuthField/AuthField.jsx';
import MessageElem from '../../components/MessageElem/MessageElem.jsx';
import * as Yup from 'yup'

export default React.memo(function SignUp() {
    const getTime = () => {
        const date = new Date()
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    const [messages, setMessages] = useState([
        { id: 'type', question: 'Здравствуйте, вы хотите присоединиться к существующей организации или добавить новую?', answer: null, visible: true, time: getTime() },
        { id: 'org', question: 'Введите ИНН организации и выберите из списка', answer: null, visible: false, time: '' },
        { id: 'email', question: 'Введите e-mail', answer: null, visible: false, time: '' },
        { id: 'password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
        { id: 'passwordRepeat', question: 'Подтвердите пароль', answer: null, visible: false, time: '' },
        { id: 'signin', question: 'Вы успешно зарегистрировались, отправьте "Войти" для того чтобы авторизоваться', answer: null, visible: false, time: '' },
    ])
    const [fields, setFields] = useState([
        { id: 'type', status: 'active', },
        { id: 'org', status: 'hiden', },
        { id: 'email', status: 'hiden', },
        { id: 'password', status: 'hiden', },
        { id: 'passwordRepeat', status: 'hiden', },
        { id: 'signin', status: 'hiden', },
    ])
    const sendMessage = (currentField, nextField, values,messages,setMessages) => {
        setMessages(messages.map((el, index) => el.id === currentField ? { ...el, answer: values[currentField].label ? values[currentField].label : values[currentField] } : el.id === nextField ? { ...el, visible: true, time: getTime() } : el))
    }
    const changeField = (currentField, nextField,fields,setFields) => {
        setFields(fields.map((field, index) => field.id === currentField ? { ...field, status: 'hiden' } : field.id === nextField ? { ...field, status: 'active' } : field))
    }
    const [formiks, setFormiks] = useState([
        {
            id: 'type', initialValues: { type: '' },
            onSubmit: values => {
                //sendMessage('type', 'org', values)
                //changeField('type', 'org')
                console.log('hh')
                setCurrentForm(formiks.find(formik => formik.id === 'org'))
            },
            validationSchema: Yup.object({
                type: Yup.string().min(3, 'Must be 3 characters or less').required('req')
            })
        },
        {
            id: 'org',
            initialValues: {
                org: ''
            },
            onSubmit: values => {
                //sendMessage('org', 'email', values)
                //changeField('org', 'email')
                setCurrentForm(formiks.find(formik => formik.id === 'email'))
            },
            validationSchema: Yup.object({

            })
        },
        {
            id: 'email',
            initialValues: {
                email: ''
            },
            onSubmit: values => {
                //sendMessage('email', 'password', values)
                //changeField('email', 'password')
                setCurrentForm(formiks.find(formik => formik.id === 'password'))
            },
            validationSchema: Yup.object({

            })
        },
        {
            id: 'password',
            initialValues: {
                password: ''
            },
            onSubmit: values => {
                //sendMessage('password', 'passwordRepeat', { ...values, password: values.password.replace(/[\s\S]/g, "*") })
                //changeField('password', 'passwordRepeat')
                setCurrentForm(formiks.find(formik => formik.id === 'passwordRepeat'))
            },
            validationSchema: Yup.object({

            })
        },
        {
            id: 'passwordRepeat',
            initialValues: {
                passwordRepeat: ''
            },
            onSubmit: values => {
                //sendMessage('passwordRepeat', 'signin', { ...values, passwordRepeat: values.passwordRepeat.replace(/[\s\S]/g, "*") })
                //changeField('passwordRepeat', 'signin')
                setCurrentForm(formiks.find(formik => formik.id === 'signin'))
            },
            validationSchema: Yup.object({

            })
        },
        {
            id: 'signin',
            initialValues: {
                signin: ''
            },
            onSubmit: values => {
                console.log(values)
                console.log('Вошел')
            },
            validationSchema: Yup.object({

            })
        },
    ])
    const [currentForm, setCurrentForm] = useState(formiks.find(formik => formik.id === 'type'))
    
    return (
        <>
            {!isNil(messages)&&!isNil(fields)&&<AuthLayout>
                <div className="auth__message__container">
                    {messages.map((message, index) => <div key={index} className='auth__message__wrapper'>
                        {!isNil(message.question) && message.visible && <MessageElem message={message} type='question' />}
                        {!isNil(message.answer) && <MessageElem message={message} type='answer' />}
                    </div>)}
                </div>
                <Formik initialValues={currentForm.initialValues} onSubmit={currentForm.onSubmit} isValidating={true} validationSchema={currentForm.validationSchema}>{formik => (
                    fields.map((field, index) => field.status !== 'hiden' && <AuthField key={index} id={field.id} name={field.id} messages={messages} setMessages={setMessages} 
                    fields={fields} setFields={setFields} changeField={changeField} sendMessages={sendMessage}/>)
                )}
                </Formik>
            </AuthLayout>}
        </>
    )
})
