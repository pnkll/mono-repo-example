import React, { useEffect, useState } from 'react';
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
    const [data, setData] = useState({})
    function getHiderValue(value){
        return value.replace(/[\s\S]/g, "*")
    }
    const [messages, setMessages] = useState([
        { id: 'type', question: 'Здравствуйте, вы хотите присоединиться к существующей организации или добавить новую?', answer: null, visible: true, time: getTime(), last: true },
        { id: 'key', question: 'Хотите зарегистрироваться по ИНН или ключу', answer: null, visible: false, time: '', last: false },
        { id: 'organization', question: 'Введите ИНН организации и выберите из списка', answer: null, visible: false, time: '', last: false },
        { id: 'email', question: 'Введите e-mail', answer: null, visible: false, time: '', last: false },
        { id: 'email_org', question: 'Введите e-mail организации', answer: null, visible: false, time: '', last: false },
        { id: 'username', question: 'Введите логин', answer: null, visible: false, time: '', last: false },
        { id: 'firstname', question: 'Введите имя', answer: null, visible: false, time: '', last: false },
        { id: 'lastname', question: 'Введите фамилию', answer: null, visible: false, time: '', last: false },
        { id: 'phone', question: 'Введите ваш номер телефона', answer: null, visible: false, time: '', last: false },
        { id: 'password', question: 'Введите ваш пароль', answer: null, visible: false, time: '', last: false },
        { id: 'password_repeat', question: 'Подтвердите пароль', answer: null, visible: false, time: '', last: false },
        { id: 'signin', question: 'Вы успешно зарегистрировались, отправьте "Войти" для того чтобы авторизоваться', answer: null, visible: false, time: '', last: false },
    ])
    const sendMessage = (currentField, nextField, values, messages, setMessages) => {
        currentField === 'password_repeat' ? isNil(values) && nextField === 'password' && setMessages([...messages, { id: 'password', question: 'Введите ваш пароль', answer: null, visible: true, time: '', last: true }]) :
            currentField === 'password' && messages.filter(el => el.id === 'password').length > 1 ? setMessages([...messages.map(el => el.id === 'password' && isNil(el.answer) ? { ...el, answer: getHiderValue(values.password), last: true } : { ...el, last: false }), { id: 'password_repeat', question: 'Подтвердите пароль', answer: null, visible: true, time: '', last: true },])
                : setMessages(messages.map(el => el.id === currentField ?
                    {
                        ...el, answer: isNil(values) ? null : values[currentField].label ? values[currentField].label : currentField === 'password' ?
                            getHiderValue(values[currentField]): currentField === 'passwordRepeat' ? getHiderValue(values[currentField]) : values[currentField], last: true
                    }
                    : el.id === nextField ? { ...el, question: (currentField==='key'&&values.key==='Ключ')?'Введите ключ':el.question, visible: true, time: getTime(), last: true } : { ...el, last: false }))
    }
    const [formiks, setFormiks] = useState([
        {
            id: 'type', initialValues: { type: '' },
            validationSchema: Yup.object({
                type: Yup.string().required('Пожалуйста выберите').test('', 'Некорректное значение', (value) => value === 'Добавить' || value === 'Присоединиться')
            })
        },
        {
            id: 'key',
            initialValues: { key: '' },
            validationSchema: Yup.object({
                key: Yup.string().required('Пожалуйста выберите').test('', 'Некорректное значение', (value) => value === 'ИНН' || value === 'Ключ')
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
            id: 'email_org',
            initialValues: {
                email_org: ''
            },
            validationSchema: Yup.object({
                email_org: Yup.string().required('Пожалуйста введите ваш e-mail').email('Некорректный email')
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
                username: Yup.string().required('Пожалуйста введите ваш login').matches(/^[a-zA-Z]+$/, 'Только английские буквы без пробелов')
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
        if (data.type === 'Добавить') {
            switch (id) {
                case 'key': return 'organization'
                case 'organization': return 'email_org'
                case 'email_org': return 'username'
                case 'username': return 'firstname'
                case 'firstname': return 'lastname'
                case 'lastname': return 'phone'
                case 'phone': return 'email'
                case 'email': return 'password'
                case 'password': return 'password_repeat'
                case 'password_repeat': return 'signin'
            }
        } else {
            switch (id) {
                case 'type': return 'key'
                case 'key': return 'organization'
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
    }
    return (
        <>
            {!isNil(messages) && <>
                <AuthMessages messages={messages} />
                {
                    !isNil(currentForm) && <AuthField key={currentForm.id} id={currentForm.id} name={currentForm.id} messages={messages} setMessages={setMessages}
                        rtkHook={authApi.useRegisterMutation}
                        nextField={nextField}
                        sendMessages={sendMessage} setData={setData} data={data}
                        currentForm={currentForm} setCurrentForm={setCurrentForm} formiks={formiks}
                        type={currentForm.id === 'password' ? 'password' : currentForm.id === 'password_repeat' ? 'password' : 'text'} />
                }
            </>}
        </>
    )
})
