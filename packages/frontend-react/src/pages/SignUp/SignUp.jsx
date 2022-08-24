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
    const sendMessage = (currentField, nextField, values, messages, setMessages) => {
        setMessages(messages.map((el, index) => el.id === currentField ?
            {
                ...el, answer: values[currentField].label ? values[currentField].label : currentField === 'password' ?
                    values[currentField].replace(/[\s\S]/g, "*") : currentField === 'passwordRepeat' ? values[currentField].replace(/[\s\S]/g, "*") : values[currentField]
            }
            : el.id === nextField ? { ...el, visible: true, time: getTime() } : el))
    }
    const [data, setData] = useState([])
    const [formiks, setFormiks] = useState([
        {
            id: 'type', initialValues: { type: '' },
            validationSchema: Yup.object({
                type: Yup.string().required('Пожалуйста выберите').test('', 'Некорректное значение', (value) => value === 'Добавить' || value === 'Присоединиться')
            })
        },
        {
            id: 'org',
            initialValues: {
                org: ''
            },
            validationSchema: Yup.object({
                org: Yup.object().test('', 'Проверьте правильный ли ИНН и выберите организацию из списка', val => typeof(val?.value)==='string')
            })
        },
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
            id: 'password',
            initialValues: {
                password: ''
            },
            validationSchema: Yup.object({
                password: Yup.string().required('Пожалуйста введите пароль').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Неправильный пароль")
            })
        },
        {
            id: 'passwordRepeat',
            initialValues: {
                passwordRepeat: ''
            },
            //У этого поля валидация внутри компонента
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
    const [currentForm, setCurrentForm] = useState(formiks.find(formik => formik.id === 'type'))
    return (
        <>
            {!isNil(messages) && <AuthLayout>
                <div className="auth__message__container">
                    {messages.map((message, index) => <div key={index} className='auth__message__wrapper'>
                        {!isNil(message.question) && message.visible && <MessageElem message={message} type='question' />}
                        {!isNil(message.answer) && <MessageElem message={message} type='answer' />}
                    </div>)}
                </div>
                {
                    !isNil(currentForm) && <AuthField key={currentForm.id} id={currentForm.id} name={currentForm.id} messages={messages} setMessages={setMessages}
                        sendMessages={sendMessage} setData={setData} data={data}
                        currentForm={currentForm} setCurrentForm={setCurrentForm} formiks={formiks}
                        type={currentForm.id === 'password' ? 'password' : currentForm.id === 'passwordRepeat' ? 'password' : 'text'} />
                }
            </AuthLayout>}
        </>
    )
})
