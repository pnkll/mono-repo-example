import { useFormik } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { rolesApi } from '../../services/RolesService';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import { useParams } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import { useSelector } from 'react-redux';
import { selectPermissionList } from '../../store/slices/rolesSlice';
import { isNil } from 'lodash';

export default React.memo(function Role() {
    const params = useParams()
    const [editMode, setEditMode] = useState(params.id === 'new' ? true : false)
    const [fetchGetPermissions] = rolesApi.useLazyGetPermissionsQuery()
    const [fetchGetRole ]=rolesApi.useLazyGetRoleByIdQuery()
    const [fetchPostRole]=rolesApi.usePostRoleMutation()
    const permissionList = useSelector(selectPermissionList)
    async function getPermissionList(){
        await fetchGetPermissions()
    }
    async function getRole(id){
        await fetchGetRole(id)
    }
    async function postRole(data){
        await fetchPostRole(data)
    }
    useEffect(()=>{
        isNil(permissionList)&& getPermissionList()
        params.id!=='new'&&getRole(params.id)
    },[])
    const formik = useFormik({
        initialValues: {
            title: '',//req
            permissions: []//arr permissions: Joi.array(), # Список пермишенов (коды прав, например "assignRole" или "viewTasks")
        },
        onSubmit: values => {
            if (editMode) {
                if (params.id === 'new') {
                    const data = { title: values.title, permissions: values.permissions.map(el => el.value) }
                    postRole(data)
                } else {
                    const data = { role: params.id }
                    updatePermissions(data)
                    setEditMode(false)
                }
            } else {
                setEditMode(true)
            }
        }
    })

    const options = !isNil(permissionList)?permissionList.map(el => el && { label: el.title, value: el.name }) : []
    return (
        <>
            <div className="">
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                    <Input formik={formik} id='title' name='title' label='Название' />
                    <Select formik={formik} options={options} id='permissions' name='permissions' label='Права' isMulti={true} />
                    <Button type='submit' text={editMode ? params.id === 'new' ? 'Создать роль' : 'Сохранить' : 'Редактировать'} />
                </form>
            </div>
        </>
    )
})