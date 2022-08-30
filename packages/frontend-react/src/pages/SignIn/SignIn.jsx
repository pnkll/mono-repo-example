import { isNil } from 'lodash';
import React, { useState } from 'react';
import AuthField from '../../components/AuthField/AuthField.jsx';
import AuthMessages from '../../components/AuthMessages/AuthMessages.jsx';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import * as Yup from 'yup'
import { authApi } from '../../services/AuthService.js';

export default React.memo(function SignIn() {
    const getTime = () => {
        const date = new Date()
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    const [messages, setMessages] = useState([
        { id: 'email', question: 'Рады приветствовать вас снова, пожалуйста введите ваш e-mail', answer: null, visible: true, time: getTime() },
        { id: 'user_password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
        { id: 'signin', question: 'Успешная авторизация', answer: null, visible: false, time: '' },
    ])
    const sendMessage = (currentField, nextField, values, messages, setMessages) => {
        setMessages(messages.map((el, index) => el.id === currentField ?
            {
                ...el, answer: values[currentField].label ? values[currentField].label : currentField === 'user_password' ?
                    values[currentField].replace(/[\s\S]/g, "*") : currentField === 'passwordRepeat' ? values[currentField].replace(/[\s\S]/g, "*") : values[currentField]
            }
            : el.id === nextField ? { ...el, visible: true, time: getTime() } : el))
    }
    const [data, setData] = useState([])
    const [formiks, setFormiks] = useState([
        {
            id: 'email',
            initialValues: {
                email: ''
            },
            validationSchema: Yup.object({
                email: Yup.string().required('Пожалуйста введите ваш e-mail').email('Некорректный email')
            })
        },
        {
            id: 'user_password',
            initialValues: {
                user_password: ''
            },
            validationSchema: Yup.object({
                user_password: Yup.string().required('Пожалуйста введите пароль').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Неправильный пароль")
            })
        },
        {
            id: 'signin',
            initialValues: {
                signin: ''
            },
            validationSchema: Yup.object({

            })
        },
    ])
    const [currentForm, setCurrentForm] = useState(formiks.find(formik => formik.id === 'email'))
    const nextField = (id) => {
        switch (id) {
            case 'email': return 'user_password'
            case 'user_password': return 'signin'
        }
    }
    return (
        <>
            {!isNil(messages) && <AuthLayout>
                <AuthMessages messages={messages} />
                {
                    !isNil(currentForm) && <AuthField key={currentForm.id} id={currentForm.id} name={currentForm.id} messages={messages} setMessages={setMessages}
                        rtkHook={authApi.useLoginMutation}
                        nextField={nextField}
                        sendMessages={sendMessage} setData={setData} data={data}
                        currentForm={currentForm} setCurrentForm={setCurrentForm} formiks={formiks}
                        type={currentForm.id === 'user_password' ? 'password' : currentForm.id === 'passwordRepeat' ? 'password' : 'text'} />
                }
            </AuthLayout>}
        </>
    )
})