import { Formik } from 'formik';
import React, { useState } from 'react';
import Input from "../../components/Input/Input.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/userSlice";
import moment from "moment";
import Button from "../../components/Button/Button.jsx";
import { usersApi } from "../../services/UsersService";
import { useNavigate, useParams } from 'react-router-dom';
import { isNil } from 'lodash';
import ToggleInput from '../../components/ToggleInput/ToggleInput.jsx';

export default function ProfileForm() {
    const params = useParams()
    const navigate = useNavigate()
    const formatDate = (date) => {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const { data: user } = usersApi.useGetUserByIdQuery(params.id)
    const [updateProfile, { isFetching, isLoading }] = usersApi.useUpdateProfileMutation()
    const [editMode, setEditMode] = useState(false)
    const isMe = useSelector(selectCurrentUser)?._id === params.id ? true : false
    const initialValues = React.useMemo(() => !isNil(user)
        ? {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            org_id: user.org_id,
            phone: user.phone,
            email: user.email,
            createdAt: formatDate(user.createdAt),
            updatedAt: formatDate(user.updatedAt),
        }
        : null)
    async function handleSubmit(values) {
        if (editMode) {
            const tmp = {...values}
            delete tmp['username']
            delete tmp['createdAt']
            delete tmp['updatedAt']
            delete tmp['org_id']
            const {data} = await updateProfile({ ...tmp, phone: String(tmp.phone) })
            data?.status===200&&setEditMode(!editMode)
        } else {
            setEditMode(!editMode)
        }
    }
    return (
        !isNil(initialValues)
        && <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {formik => (<>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                    <Input formik={formik} label={'Логин'} id={'username'} name={'username'} readonly={editMode ? false : true} />
                    <Input formik={formik} label={'Имя'} id={'firstname'} name={'firstname'} readonly={editMode ? false : true} />
                    <Input formik={formik} label={'Фамилия'} id={'lastname'} name={'lastname'} readonly={editMode ? false : true} />
                    <Input formik={formik} label={'Организация'} id={'org_id'} name={'org_id'} readonly={true} onClick={()=>navigate(`../organization/${user.org_id}`)} style={{cursor:'pointer'}}/>
                    <Input formik={formik} label={'Телефон'} id={'phone'} name={'phone'} readonly={editMode ? false : true}/>
                    <Input formik={formik} label={'Дата создания'} id={'createdAt'} name={'createdAt'} readonly={true} />
                    <Input formik={formik} label={'Последнее обновление'} id={'updatedAt'} name={'updatedAt'} readonly={true} />
                    <Input formik={formik} label={'Электронный адрес'} id={'email'} name={'email'} readonly={true} />
                    <ToggleInput checked={user?.verified} label='Верифицирован' readOnly={true} />
                    {isMe && <Button type={'submit'} text={editMode ? 'Сохранить' : 'Редактировать'} color={editMode ? 'green' : 'blue'} />}
                </form>
            </>)
            }
        </Formik>
    )
}