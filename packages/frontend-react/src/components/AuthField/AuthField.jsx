import { ChatIcon } from '@heroicons/react/outline';
import { Formik, useFormikContext } from 'formik';
import React, { useEffect,useState } from 'react';
import Input from '../Input/Input.jsx';
import InputDadata from '../InputDadata/InputDadata.jsx';
import './AuthField.scss'
import * as Yup from 'yup'
import {setUser} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {isNil} from "lodash";

export default React.memo(function AuthField({ id, name, type = 'text', messages, setMessages, sendMessages, currentForm, setData, data, formiks, setCurrentForm, nextField, rtkHook }) {
    const [postData, { isLoading, isFetching }] = rtkHook()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postError,setPostError]=useState(null)
    const handlePost = async (user) => {
        const response = (await postData(user))
            if (response.data?.status === 200){
                dispatch(setUser(response.data.message))
                navigate('../main')
            }
            else if(response.error?.status===422){
                setPostError(response.error.data.errors)
            }
    }
    const handleSubmit = (values) => {

        if (id !== 'signin') {
            id !== 'password_repeat' && setData({ ...data, [Object.keys(values)[0]]: Object.values(values)[0] })

            if (id === 'password_repeat' || id === 'user_password') {
                const originalObject = { ...data, [Object.keys(values)[0]]: Object.values(values)[0] }
                const user = id === 'password_repeat' ? {
                    username: originalObject.username,
                    password: originalObject.password,
                    firstname: originalObject.firstname,
                    lastname: originalObject.lastname,
                    organization: originalObject.organization.value,
                    phone: originalObject.phone,
                    email: originalObject.email,
                    repeat_password: originalObject.password_repeat
                } : {
                    username: originalObject.username,
                    password: originalObject.user_password
                }
                handlePost(user)
            } else {
                sendMessages(name, nextField(id), values, messages, setMessages)
                setCurrentForm(formiks.find(formik => formik.id === nextField(id)))
            }
        }
    }
    const validationSchema = id === 'password_repeat' ? Yup.object().shape({
        password_repeat: Yup.string().required().test('repeat-password', 'Пароли не совпадают', (value => value === data.password))
    }) : currentForm?.validationSchema
    const goToInputPassword = () =>{
        const cloneData = {...data}
        delete cloneData.password
        setData(cloneData)
        setCurrentForm(formiks.find(formik => formik.id === 'password'))
        sendMessages(name, 'password', null, messages, setMessages)
    }
    return (
        <>
            <Formik initialValues={currentForm.initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {formik => (
                    <>
                        <form className='auth-field' onSubmit={(e) => { e.preventDefault(); formik.submitForm(); }}>
                            {id === 'organization' ? <InputDadata formik={formik} id={id} name={name} classNamePrefix='auth-field' />
                                : <Input type={type} placeholder='Введите сообщение' formik={formik} id={id} name={name} className='auth-field-input' />}
                            <button type='submit' className='auth-field__button' disabled={isLoading}><ChatIcon width={30} /></button>
                        </form>

                        <div className="auth-field__buttons">
                            {id === 'type' ?
                                <>
                                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Присоединиться') }}>Присоединиться</div>
                                    <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Добавить') }}>Добавить</div>
                                </>
                                : id === 'signin' ? <div className="auth-field__buttons__elem" onClick={() => { formik.setFieldValue(id, 'Войти'); formik.submitForm() }}>Войти</div>
                                : id === 'password_repeat' && <div className="auth-field__buttons__elem" onClick={goToInputPassword}>Ввести пароль заного</div>
                            }</div>

                        {!isNil(postError)&&<p>{postError}</p>}
                    </>)}
            </Formik>
        </>
    )
})