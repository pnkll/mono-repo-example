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
    const [fetchGetRole,{isLoading,isFetching} ]=rolesApi.useLazyGetRoleByIdQuery()
    const [fetchPostRole]=rolesApi.usePostRoleMutation()
    const [fetchUpdateRole]=rolesApi.useGrantPermissionsMutation()
    const permissionList = useSelector(selectPermissionList)
    const [isLoaded,setIsLoaded]=useState(params.id==='new'?true:false)
    function handleSubmit(values){
        if (editMode) {
            if (params.id === 'new') {
                postRole(values)
            } else {
                const data = { role: params.id, permissions: values.permissions }
                updateRole(data)
                setEditMode(false)
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            permissions: []
        },
        onSubmit: values => {
            handleSubmit(values)
        }
    })
    async function getRole(id){
        const {data} = await fetchGetRole(id)
        if(data.status===200){
            formik.setFieldValue('title',data.message[0].title)
            formik.setFieldValue('permissions',data.message[0].permissions)
        }
        setIsLoaded(true)
    }
    async function postRole(data){
        await fetchPostRole(data)
    }
    async function updateRole(data){
        await fetchUpdateRole(data)
    }
    const options = !isNil(permissionList)?permissionList.map(el => el && { label: el.title, value: el.name }) : []
    useEffect(()=>{
        if(params.id!=='new'){
            getRole(params.id)
        }
    },[params.id])

    if(!isLoaded){
        return <>Preloader</>
    }

    return (
        <>
            {formik?.values!==null&&<div className="">
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                    <Input formik={formik} id='title' name='title' label='Название' />
                    <Select formik={formik} options={options} id='permissions' name='permissions' label='Права' isMulti={true}/>
                    <Button type='submit' text={editMode ? params.id === 'new' ? 'Создать роль' : 'Сохранить' : 'Редактировать'} />
                </form>
            </div>}
        </>
    )
})