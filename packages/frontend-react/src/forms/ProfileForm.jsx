import {useFormik} from 'formik';
import React, {useState} from 'react';
import Input from "../components/Input/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser,setUser} from "../store/slices/userSlice";
import moment from "moment";
import Button from "../components/Button/Button.jsx";
import {usersApi} from "../services/UsersService";
import { useParams } from 'react-router-dom';
import { isNil } from 'lodash';

export default function ProfileForm() {
    const params = useParams()
    const formatDate = (date) =>{
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const [thunk,{isFetching, isLoading}]=usersApi.useUpdateProfileMutation()
    const dispatch=useDispatch()
    const [editMode,setEditMode]=useState(false)
    const user=useSelector(selectCurrentUser)
    const handlePost = async(data)=>{
        const response = await thunk(data)
        response.data.status===200&&setEditMode(!editMode)
    }
    const formik = useFormik({
        initialValues: {
            username: user?.username,
            firstname: user?.firstname,
            lastname: user?.lastname,
            organization: user?.organization,
            phone: user?.phone,
            verify: user?.verify,
            email: user?.email,
            createdAt: formatDate(user?.createdAt),
            updatedAt: formatDate(user?.updatedAt),
        },
        onSubmit: values=>{
            if(editMode){
                delete values['createdAt']
                delete values['updatedAt']
                delete values['verify']
                handlePost(values)
            }else{
                setEditMode(!editMode)
            }
        }
    })
    return (
        <>
            {!isNil(user)&&<form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit()
            }}>
                <Input formik={formik} label={'Логин'} id={'username'} name={'username'} readonly={editMode?false:true}/>
                <Input formik={formik} label={'Имя'} id={'firstname'} name={'firstname'}  readonly={editMode?false:true}/>
                <Input formik={formik} label={'Фамилия'} id={'lastname'} name={'lastname'}  readonly={editMode?false:true}/>
                <Input formik={formik} label={'Организация'} id={'organization'} name={'organization'} readonly={editMode?false:true}/>
                <Input formik={formik} label={'Телефон'} id={'phone'} name={'phone'} readonly={editMode?false:true}/>
                <Input formik={formik} label={'Дата создания'} id={'createdAt'} name={'createdAt'} readonly={editMode?false:true}/>
                <Input formik={formik} label={'Последнее обновление'} id={'updatedAt'} name={'updatedAt'} readonly={true}/>
                <Input formik={formik} label={'Электронный адрес'} id={'email'} name={'email'} readonly={true}/>
                <Button type={'submit'} text={editMode?'Сохранить':'Редактировать'} color={editMode?'green':'blue'}/>
            </form>}
        </>
    )
}