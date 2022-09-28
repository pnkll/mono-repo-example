import { isNil } from 'lodash';
import React, { useMemo, useState } from 'react';
import AuthField from '../../components/AuthField/AuthField.jsx';
import AuthMessages from '../../components/AuthMessages/AuthMessages.jsx';
import * as Yup from 'yup'
import { authApi } from '../../services/AuthService.js';
import { getTime } from '../../helpers/forAuth';

export default function SignIn() {
    const [messages, setMessages] = useState([
        { id: 'username', question: 'Рады приветствовать вас снова, пожалуйста введите ваш login', answer: null, visible: true, time: getTime() },
        { id: 'user_password', question: 'Введите ваш пароль', answer: null, visible: false, time: '' },
    ])
    const [data, setData] = useState([])
    const formiks = useMemo(() => [
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
    ])
    const [currentForm, setCurrentForm] = useState(formiks.find(formik => formik.id === 'username'))
    const [order, setOrder] = useState([
        { id: 'username', next: 'user_password' },
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
                        type={currentForm.id === 'user_password' 
                            ? 'password' 
                            : currentForm.id === 'passwordRepeat' 
                                ? 'password' 
                                : 'text'}
                        formType={'signin'} />
                }
            </>}
        </>
    )
}