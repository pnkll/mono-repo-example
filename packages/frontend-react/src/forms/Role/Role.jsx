import { Formik} from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { rolesApi } from '../../services/RolesService';
import Input from '../../components/Input/Input.jsx';
import Select from '../../components/Select/Select.jsx';
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import { useSelector } from 'react-redux';
import { selectPermissionList } from '../../store/slices/rolesSlice';
import { isNil } from 'lodash';

export default function Role() {
    const params = useParams()
    const isNew = params.id ? false : true
    const [editMode, setEditMode] = useState(isNew ? true : false)
    const [fetchGetRoleById, { data: role, isError, isLoading, isFetching, isSuccess }] = rolesApi.useLazyGetRoleByIdQuery()
    const [fetchPostRole, { isLoading: isLoadingPost }] = rolesApi.usePostRoleMutation()
    const [fetchUpdateRole, { isLoading: isLoadingUpdate }] = rolesApi.useGrantPermissionsMutation()
    const permissionList = useSelector(selectPermissionList)
    function handleSubmit(values) {
        if (editMode) {
            if (isNew) {
                fetchPostRole(values)
            } else {
                const data = { role: params.id, permissions: values.permissions }
                fetchUpdateRole(data)
            }
        } else {
            setEditMode(!editMode)
        }
    }
    const initialValues = React.useMemo(() => isNew
        ? {
            title: '',
            permissions: ''
        }
        : {
            title: role?.title,
            permissions: role?.permissions
        })
    const options = !isNil(permissionList) ? permissionList.map(el => el && { label: el.title, value: el.name }) : []
    useEffect(() => {
        if (!isNil(params.id)) {
            fetchGetRoleById(params.id)
        }
    }, [params])
    if (isError) {
        return <>Error</>
    } else if (isLoading) {
        <>Loading</>
    }
    return (
        (isNew ? true : isSuccess) && initialValues && <Formik initialValues={initialValues} onSubmit={handleSubmit} >
            {formik => (
                <div className="">
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} style={{ position: 'relative' }}>
                        <Input formik={formik} id='title' name='title' label='Название' />
                        <Select formik={formik} options={options} 
                        defaultValue={isNew?false:true} 
                        id='permissions' name='permissions' label='Права' isMulti={true} />
                        <Button type='submit' text={editMode ? isNew ? 'Создать роль' : 'Сохранить' : 'Редактировать'} color={editMode ? isNil(params.id) ? 'green' : 'green' : 'blue'} isLoading={isLoadingUpdate || isLoadingPost} />
                    </form>
                </div>)}
        </Formik>
    )
}