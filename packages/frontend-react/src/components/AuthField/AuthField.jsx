import { ChatIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Formik, useFormikContext } from 'formik';
import React, { useState } from 'react';
import Input from '../Input/Input.jsx';
import InputDadata from '../InputDadata/InputDadata.jsx';
import './AuthField.scss'
import * as Yup from 'yup'
import { isNil } from "lodash";
import { authApi } from '../../services/AuthService.js';
import { updateMessages, getNextField } from '../../helpers/forAuth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default React.memo(function AuthField({ id, name, type = 'text', messages, setMessages, currentForm, setData, data, formiks, setCurrentForm, rtkHook, setOrder, order, formType }) {
    const [postData, { isLoading, isFetching }] = rtkHook()
    const [postError, setPostError] = useState(null)
    const [fetchPostOrganization, { error }] = authApi.useRegisterOrganizationMutation()
    const handlePost = async (user) => {
        const { data, error } = await postData(user)
        if (!isNil(error)) {
            setPostError(error.data.errors)
        }
    }
    async function handleSubmit(values) {
        if (id === 'email_org') {
            if (data?.type === 'Добавить') {
                const { data: responseData, error } = await fetchPostOrganization({
                    inn: !isNil(data?.organization?.value)
                        ? data?.organization?.value
                        : data?.organization, email: values.email_org
                })
                if (!isNil(error)) {
                    updateMessages(name, getNextField(id, order), values, messages, setMessages)
                    setPostError(error.data.errors)
                    return
                } else if (!isNil(responseData)) {
                    data.organization.value = responseData.message.token;
                    setData({ ...data })
                }
            }
        }
        if (id !== 'signin') {
            id !== 'password_repeat'
                && setData({ ...data, [Object.keys(values)[0]]: Object.values(values)[0] })
            if (id === 'password_repeat' || id === 'user_password') {
                const originalObject = { ...data, [Object.keys(values)[0]]: Object.values(values)[0] }
                const user = id === 'password_repeat' ? {
                    username: originalObject.username,
                    password: originalObject.password,
                    firstname: originalObject.firstname,
                    lastname: originalObject.lastname,
                    organization: !isNil(originalObject.organization.value) ? originalObject.organization.value : originalObject.organization,
                    phone: originalObject.phone,
                    email: originalObject.email,
                    repeat_password: originalObject.password_repeat
                } : {
                    username: originalObject.username,
                    password: originalObject.user_password
                }
                handlePost(user)
            } else {
                updateMessages(name, getNextField(id, order), values, messages, setMessages)
                setCurrentForm(formiks.find(formik => formik.id === getNextField(id, order)))
            }
        }
    }
    function getValidationSchema() {
        switch (id) {
            case 'password_repeat':
                return Yup.object().shape({ password_repeat: Yup.string().required().test('repeat-password', 'Пароли не совпадают', (value => value === data.password)) })
            case 'organization':
                if (data.key === 'Ключ') {
                    return Yup.object().shape({ organization: Yup.string().required('Пожалуйста вставьте ключ') })
                }
            default: return currentForm?.validationSchema
        }
    }
    const goBackToInput = (message,fieldId, replace = true,) => {
        replace && setOrder(order.map(el => el.id === fieldId ? { ...el, next: id } : el))//переопределяем порядок чтобы вернуться к текущему полю после ввода
        const tmp = { ...data }
        delete tmp[fieldId]
        setData(tmp)
        setCurrentForm(formiks.find(formik => formik.id === fieldId))
        updateMessages(name, fieldId, message, messages, setMessages)
    }
    function renderInput(formik) {
        switch (id) {
            case 'organization':
                return data.key === 'ИНН'
                    ? <InputDadata formik={formik} id={id} name={name} classNamePrefix='auth-field' />
                    : <Input type={type} placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-field-input' />
            default: return <Input type={type} placeholder={`${(id === 'type' || id === 'key')
                ? 'Выберите команду из списка'
                : 'Введите сообщение'}`} formik={formik} id={id} name={name} className='auth-field-input' readonly={(id === 'type' || id === 'key')
                    ? true
                    : false} defaultStyles={false} />
        }
    }
    function renderButtons(formik) {
        switch (id) {
            case 'type':
                return (<>
                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Присоединиться') }}>Присоединиться</div>
                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Добавить') }}>Добавить</div>
                </>)
            case 'firstname':
                return <div className="auth-field__buttons__elem" onClick={() => goBackToInput('Ввести логин заново','username')}>Ввести логин заново</div>
            case 'email_org':
                return <div className="auth-field__buttons__elem" onClick={() => goBackToInput('Заново указать организацию','organization')}>Заново указать организацию</div>
            case 'password_repeat':
                return <div className="auth-field__buttons__elem" onClick={() => goBackToInput('Ввести пароль заново','password')}>Ввести пароль заново</div>
            case 'key':
                return (<>
                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Ключ') }}>Ключ</div>
                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'ИНН') }}>ИНН</div>
                </>)
            case 'user_password':
                return <div className="auth-field__buttons__elem" onClick={() => {
                    setMessages(messages.map(el => el.id === 'username'
                        ? { ...el, question: 'Введите логин' }
                        : el)); goBackToInput('Ввести логин заново','username')
                }}>Ввести логин заново</div>
            default: return null
        }
    }
    const [menuVisible, setMenuVisible] = useState(true)
    const navigate = useNavigate()
    console.log(messages)
    return (
        <>
            <Formik initialValues={currentForm.initialValues} validationSchema={getValidationSchema()} onSubmit={handleSubmit}>
                {formik => (
                    <>
                        {menuVisible && <div className="auth-field__buttons">
                            <div className="auth-field__buttons__elem" onClick={() => {
                                navigate(formType === 'signin'
                                    ? '../signup'
                                    : '../signin')
                            }}>{formType === 'signin'
                                ? 'Зарегистрироваться'
                                : 'Уже зарегистрирован'}</div>
                            {!isNil(postError)
                                && formType === 'signup'
                                && <div className="auth-field__buttons__elem" onClick={() => goBackToInput('Попробовать снова',data.type === 'Добавить' ? 'username' : 'email', false)}>Попробовать снова</div>}
                            {renderButtons(formik)}
                        </div>}
                        <form className='auth-field' onSubmit={(e) => { e.preventDefault(); formik.submitForm(); }}>
                            <div className="auth-field__hamburger" onClick={() => setMenuVisible(!menuVisible)}>
                                {!menuVisible
                                    ? <MenuIcon width={14} />
                                    : <XIcon width={14} />}
                                Меню
                            </div>
                            {renderInput(formik)}
                            <button type='submit' className='auth-field__button' disabled={isLoading}><ChatIcon width={30} /></button>
                            <AutoSubmitToken id={id} />
                        </form>
                    </>)}
            </Formik>
        </>
    )
})

function AutoSubmitToken({ id }) {
    const { values, submitForm } = useFormikContext()
    useEffect(() => {
        if (id === 'type') {
            values.type !== '' && submitForm()
        } else if (id === 'key') {
            values.key !== '' && submitForm()
        }
    }, [values, submitForm])
    return null
}