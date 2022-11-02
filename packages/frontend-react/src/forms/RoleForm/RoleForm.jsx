import { Formik, yupToFormErrors } from 'formik';
import React from 'react';
import { useState } from 'react';
import { rolesApi } from '../../services/RolesService';
import Input from '../../components/Input/Input.jsx';
import Select from '../../components/Select/Select.jsx';
import Button from '../../components/Button/Button.jsx'
import { useSelector } from 'react-redux';
import { selectPermissionList } from '../../store/slices/rolesSlice';
import { isNil } from 'lodash';
import * as Yup from 'yup';

export default function RoleForm({ data: role, isNew }) {
    const [editMode, setEditMode] = useState(isNew ? true : false)
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
        }, [role])
    const validationSchema = Yup.object({
        title: Yup.string().min(5,'fdhsa')
    })
    const options = !isNil(permissionList) ? permissionList.map(el => el && { label: el.title, value: el.name }) : []
    return (initialValues && <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {formik => (
            <div className="">
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} style={{ position: 'relative' }}>
                    <Input formik={formik} id='title' name='title' label='Название'/>
                    <Select formik={formik} options={options}
                        defaultValue={isNew ? false : true}
                        id='permissions' name='permissions' label='Права' isMulti={true} />
                    <Button type='submit' text={editMode ? isNew ? 'Создать роль' : 'Сохранить' : 'Редактировать'} color={editMode ? isNew ? 'green' : 'green' : 'blue'} isLoading={isLoadingUpdate || isLoadingPost} />
                </form>
            </div>)}
    </Formik>
    )
}