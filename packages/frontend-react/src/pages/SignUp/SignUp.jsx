import React, { useEffect, useState } from 'react';
import AuthLayout from '../../page_layouts/AuthLayout/AuthLayout.jsx';
import './SignUp.scss'
import { isNil } from 'lodash';
import AuthField from '../../components/AuthField/AuthField.jsx';
import * as Yup from 'yup'
import AuthMessages from '../../components/AuthMessages/AuthMessages.jsx';
import { authApi } from '../../services/AuthService.js';

export default React.memo(function SignUp() {
    const getTime = () => {
        const date = new Date()
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    const [messages, setMessages] = useState([
        { id: 'type', question: 'Здравствуйте, вы хотите присоединиться к существующей организации или добавить новую?', answer: null, visible: true, time: getTime(), last:true },
        { id: 'organization', question: 'Введите ИНН организации и выберите из списка', answer: null, visible: false, time: '', last: false },
        { id: 'email', question: 'Введите e-mail', answer: null, visible: false, time: '', last: false },
        { id: 'username', question: 'Введите логин', answer: null, visible: false, time: '', last: false },
        { id: 'firstname', question: 'Введите имя', answer: null, visible: false, time: '', last: false },
        { id: 'lastname', question: 'Введите фамилию', answer: null, visible: false, time: '', last: false },
        { id: 'phone', question: 'Введите ваш номер телефона', answer: null, visible: false, time: '', last: false },
        { id: 'password', question: 'Введите ваш пароль', answer: null, visible: false, time: '', last: false },
        { id: 'password_repeat', question: 'Подтвердите пароль', answer: null, visible: false, time: '', last: false },
        { id: 'signin', question: 'Вы успешно зарегистрировались, отправьте "Войти" для того чтобы авторизоваться', answer: null, visible: false, time: '', last: false },
    ])
    const sendMessage = (currentField, nextField, values, messages, setMessages) => {
        currentField==='password_repeat'?isNil(values)&&nextField==='password'&&setMessages([...messages,{ id: 'password', question: 'Введите ваш пароль', answer: null, visible: true, time: '', last: true }]):
        currentField==='password'&&messages.filter(el=>el.id==='password').length>1?setMessages([...messages.map(el=>el.id==='password'&&isNil(el.answer)?{...el,answer: values.password.replace(/[\s\S]/g, "*"),last:true}:{...el,last:false}),{ id: 'password_repeat', question: 'Подтвердите пароль', answer: null, visible: true, time: '', last: true },])
        :setMessages(messages.map(el => el.id === currentField ?
            {
                ...el, answer: isNil(values)?null:values[currentField].label ? values[currentField].label : currentField === 'password' ?
                    values[currentField].replace(/[\s\S]/g, "*") : currentField === 'passwordRepeat' ? values[currentField].replace(/[\s\S]/g, "*") : values[currentField],last:true
            }
            : el.id === nextField ? { ...el, visible: true, time: getTime(), last: true } : {...el,last: false}))
    }
    const [data, setData] = useState({})
    const [formiks, setFormiks] = useState([
        {
            id: 'type', initialValues: { type: '' },
            validationSchema: Yup.object({
                type: Yup.string().required('Пожалуйста выберите').test('', 'Некорректное значение', (value) => value === 'Добавить' || value === 'Присоединиться')
            })
        },
        {
            id: 'organization',
            initialValues: {
                organization: ''
            },
            validationSchema: Yup.object({
                organization: Yup.object().test('', 'Проверьте правильный ли ИНН и выберите организацию из списка', val => typeof (val?.value) === 'string')
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
            id: 'username',
            initialValues: {
                username: ''
            },
            validationSchema: Yup.object({
                username: Yup.string().required('Пожалуйста введите ваш e-mail').matches(/^[a-zA-Z]+$/, 'Только английские буквы без пробелов')
            })
        },
        {
            id: 'firstname',
            initialValues: {
                firstname: ''
            },
            validationSchema: Yup.object({
                firstname: Yup.string().required('Пожалуйста введите ваше имя').matches(/^[а-яА-Я]+$/, 'Только русские буквы без пробелов')
            })
        },
        {
            id: 'lastname',
            initialValues: {
                lastname: ''
            },
            validationSchema: Yup.object({
                lastname: Yup.string().required('Пожалуйста введите вашу фамилию').matches(/^[а-яА-Я]+$/, 'Только русские буквы без пробелов')
            })
        },
        {
            id: 'phone',
            initialValues: {
                phone: ''
            },
            validationSchema: Yup.object({
                phone: Yup.string().required('Пожалуйста введите ваш номер телефона').matches(/^\d+$/, 'Только цифры')
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
            id: 'password_repeat',
            initialValues: {
                password_repeat: ''
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
    const nextField = (id) => {
        switch (id) {
            case 'type': return 'organization'
            case 'organization': return 'email'
            case 'email': return 'username'
            case 'username': return 'firstname'
            case 'firstname': return 'lastname'
            case 'lastname': return 'phone'
            case 'phone': return 'password'
            case 'password': return 'password_repeat'
            case 'password_repeat': return 'signin'
        }
    }
    return (
        <>
            {!isNil(messages) && <AuthLayout>
                <AuthMessages messages={messages} />
                {
                    !isNil(currentForm) && <AuthField key={currentForm.id} id={currentForm.id} name={currentForm.id} messages={messages} setMessages={setMessages}
                        rtkHook={authApi.useRegisterMutation} 
                        nextField={nextField}
                        sendMessages={sendMessage} setData={setData} data={data}
                        currentForm={currentForm} setCurrentForm={setCurrentForm} formiks={formiks}
                        type={currentForm.id === 'password' ? 'password' : currentForm.id === 'password_repeat' ? 'password' : 'text'} />
                }
            </AuthLayout>}
        </>
    )
})
