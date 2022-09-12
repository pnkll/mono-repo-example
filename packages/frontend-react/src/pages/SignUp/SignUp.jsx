import React, { useEffect, useState } from 'react';
import './SignUp.scss'
import { isNil } from 'lodash';
import AuthField from '../../components/AuthField/AuthField.jsx';
import * as Yup from 'yup'
import AuthMessages from '../../components/AuthMessages/AuthMessages.jsx';
import { authApi } from '../../services/AuthService.js';
import { getTime } from '../../helpers/forAuth';

export default React.memo(function SignUp() {
    const [data, setData] = useState({})
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
    const [order, setOrder] = useState([
        { id: 'type', next: 'key' },
        { id: 'key', next: 'organization' },
        { id: 'organization', next: 'email' },
        { id: 'email', next: 'username' },
        { id: 'username', next: 'firstname' },
        { id: 'firstname', next: 'lastname' },
        { id: 'lastname', next: 'phone' },
        { id: 'phone', next: 'password' },
        { id: 'password', next: 'password_repeat' },
        { id: 'password_repeat', next: 'signin' }
    ])
    useEffect(() => {
        data.type === 'Добавить' && setOrder([
            { id: 'key', next: 'organization' },
            { id: 'organization', next: 'email_org' },
            { id: 'email_org', next: 'username' },
            { id: 'username', next: 'firstname' },
            { id: 'firstname', next: 'lastname' },
            { id: 'lastname', next: 'phone' },
            { id: 'phone', next: 'email' },
            { id: 'email', next: 'password' },
            { id: 'password', next: 'password_repeat' },
            { id: 'password_repeat', next: 'signin' },
        ])
    }, [data.type])
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
                        rtkHook={authApi.useRegisterMutation}
                        setData={setData}
                        data={data}
                        currentForm={currentForm}
                        setCurrentForm={setCurrentForm}
                        formiks={formiks}
                        setOrder={setOrder}
                        order={order}
                        type={currentForm.id === 'password' ? 'password' : currentForm.id === 'password_repeat' ? 'password' : 'text'} />
                }
            </>}
        </>
    )
})
