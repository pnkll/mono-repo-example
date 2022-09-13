import { isNil } from 'lodash';
import React, { useState } from 'react';
import AuthField from '../../components/AuthField/AuthField.jsx';
import AuthMessages from '../../components/AuthMessages/AuthMessages.jsx';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import * as Yup from 'yup'
import { authApi } from '../../services/AuthService.js';
import { getTime } from '../../helpers/forAuth';
import { useEffect } from 'react';

export default React.memo(function SignIn() {
    const [messages, setMessages] = useState([
        { id: 'username', question: 'Рады приветствовать вас снова, пожалуйста введите ваш login', answer: null, visible: true, time: getTime() },
        { id: 'user_password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
        { id: 'signin', question: 'Успешная авторизация', answer: null, visible: false, time: '' },
    ])
    const [data, setData] = useState([])
    const [formiks, setFormiks] = useState([
        {
            id: 'username',
            initialValues: {
                username: ''
            },
            validationSchema: Yup.object({
                username: Yup.string().required('Пожалуйста введите ваш login').matches(/^[a-zA-Z0-9]+$/, 'Только английские буквы без пробелов')
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
    const [currentForm, setCurrentForm] = useState(formiks.find(formik => formik.id === 'username'))
    const [order, setOrder] = useState([
        { id: 'username', next: 'user_password' },
        { id: 'user_password', next: 'signin' }
    ])
    return (
        <>
            {!isNil(messages) && <>
                <AuthMessages messages={messages} />
                {
                    !isNil(currentForm) && <AuthField
                        key={currentForm.id}
                        id={currentForm.id}
                        name={currentForm.id}
                        messages={messages}
                        setMessages={setMessages}
                        rtkHook={authApi.useLoginMutation}
                        setData={setData}
                        data={data}
                        currentForm={currentForm}
                        setCurrentForm={setCurrentForm}
                        formiks={formiks}
                        order={order}
                        setOrder={setOrder}
                        type={currentForm.id === 'user_password' ? 'password' : currentForm.id === 'passwordRepeat' ? 'password' : 'text'}
                        formType={'signin'} />
                }
            </>}
        </>
    )
})