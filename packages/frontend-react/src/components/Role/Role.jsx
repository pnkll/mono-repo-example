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
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

export default function Role() {
    const [fetchError,setFetchError]=useState(null)
    function showError(error){
        setFetchError(error)
        setTimeout(()=>{
            setFetchError(null)
        },5000)
    }
    const params = useParams()
    const [editMode, setEditMode] = useState(isNil(params.id)? true : false)
    const [fetchGetRoleById,{isError, isLoading,isFetching, isSuccess} ]=rolesApi.useLazyGetRoleByIdQuery()
    const [fetchPostRole,{isLoading: isLoadingPost}]=rolesApi.usePostRoleMutation()
    const [fetchUpdateRole,{isLoading: isLoadingUpdate}]=rolesApi.useGrantPermissionsMutation()
    const permissionList = useSelector(selectPermissionList)
    function handleSubmit(values){
        if (editMode) {
            if (isNil(params.id)) {
                postRole(values)
            } else {
                const data = { role: params.id, permissions: values.permissions }
                updateRole(data)
            }
        } else{
            setEditMode(true)
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
    async function getRoleById(id){
        const {data} = await fetchGetRoleById(id)
        if(data?.status===200){
            formik.setFieldValue('title',data.message[0].title)
            formik.setFieldValue('permissions',data.message[0].permissions)
        }
    }
    async function postRole(values){
        try {
            const {data,error} = await fetchPostRole(values)
            error?showError(error.data.errors):setEditMode(false)
        } catch (error) {
            
        }
    }
    async function updateRole(values){
        try {
            const {data, error} = await fetchUpdateRole(values)
            error?showError(error.data.errors):setEditMode(false)
        } catch (error) {
            
        }
        
    }
    const options = !isNil(permissionList)?permissionList.map(el => el && { label: el.title, value: el.name }) : []
    useEffect(()=>{
        if(!isNil(params.id)){
            getRoleById(params.id)
        }
    },[params])

    if(isError){
        return <>Error</>
    } else if(isLoading){
        <>Loading</>
    }
    return (
        <>
            {(!isNil(params.id)?isSuccess:true)&&<div className="">
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} style={{position: 'relative'}}>
                    <Input formik={formik} id='title' name='title' label='Название' />
                    <Select formik={formik} options={options} id='permissions' name='permissions' label='Права' isMulti={true} hasDefaultValue={true}/>
                    <Button type='submit' text={editMode ? isNil(params.id) ? 'Создать роль' : 'Сохранить' : 'Редактировать'} color={editMode ? isNil(params.id)? 'green' : 'green' : 'blue'} isLoading={isLoadingUpdate||isLoadingPost}/>
                    {!isNil(fetchError)&&<ErrorMessage message={fetchError}/>}
                </form>
            </div>}
        </>
    )
}