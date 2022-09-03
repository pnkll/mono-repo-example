import { useFormik } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { rolesApi } from '../../services/RolesService';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import { useParams } from 'react-router-dom'
import Button from '../Button/Button.jsx'

export default React.memo(function Role() {
    const params = useParams()
    const [editMode, setEditMode] = useState(params.id === 'new' ? true : false)
    const [postRole, { isFetching, isLoading }] = rolesApi.usePostRoleMutation()
    const { getPermissions } = rolesApi.useGetRolesQuery()
    const [updatePermissions] = rolesApi.useGrantPermissionsMutation()
    const handleClick = () => {
        if (editMode === true) {
            updatePermissions()
        } else {

        }
    }
    const formik = useFormik({
        initialValues: {
            title: '',//req
            permissions: ''//arr permissions: Joi.array(), # Список пермишенов (коды прав, например "assignRole" или "viewTasks")
        },
        onSubmit: async values => {
            if (editMode) {
                if (params.id === 'new') {
                    const data = { title: values.title, permissions: [values.permissions] }
                    postRole(data)
                } else {
                    const data = { role: params.id }
                    updatePermissions(data)
                }
                setEditMode(false)
            } else {
                setEditMode(true)
            }
        }
    })

    const options = [
        {value: 'assignRole',label: 'Выдавать роль'},
        {value: 'grantPermissions',label: 'Редактировать права'},
    ]
    return (
        <>
            <div className="">
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                    <Input formik={formik} id='title' name='title' label='Название' />
                    <Select formik={formik} options={options} id='permissions' name='permissions' label='Права' isMulti={true}/>
                    <Button type='submit' text={editMode ? params.id === 'new' ? 'Создать роль' : 'Сохранить' : 'Редактировать'} />
                </form>
            </div>
        </>
    )
})