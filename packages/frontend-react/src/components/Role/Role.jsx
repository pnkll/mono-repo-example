import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { rolesApi } from '../../services/RolesService';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';

export default React.memo(function Role(){
    const [postRole,{isFetching, isLoading}]=rolesApi.usePostRoleMutation()
    const {getPermissions,isF,isL}=rolesApi.useGetPermissionsQuery()
    useEffect(()=>{
        console.log(getPermissions)
    },[])
    const formik = useFormik({
        initialValues:{
            title: '',//req
            permissions: ''//arr permissions: Joi.array(), # Список пермишенов (коды прав, например "assignRole" или "viewTasks")
        },
        onSubmit: values=>{
            postRole(values)
        }
    })
   return(
       <>
       <div className="">
        Создание роли
        <form>
            <Input formik={formik} id='title' name='title' label='Название'/>
            <Select formik={formik} id='permissions' name='permissions' label='Права'/>
        </form>
       </div>
       </>
   )
})