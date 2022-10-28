import React from 'react';
import { useParams } from 'react-router-dom';
import PreloaderForPage from '../../../components/PreloaderForPage/PreloaderForPage.jsx';
import RoleForm from '../../../forms/RoleForm/RoleForm.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import { rolesApi } from '../../../services/RolesService.js';

export default function RoleById() {
    const params=useParams()
    const isNew = params.id?false:true
    const [getRoleById,{ data: role, isFetching, isSuccess }] = rolesApi.useLazyGetRoleByIdQuery()
    React.useLayoutEffect(()=>{
        !isNew&&getRoleById(params.id)
    },[])
    if (isFetching) {
        return <PreloaderForPage />
    }
    return (
        <>
            {(isNew?true:isSuccess) &&
                <SettingLayout label='Role'>
                    <RoleForm data={role} isNew={isNew}/>
                </SettingLayout>
            }
        </>
    )
}