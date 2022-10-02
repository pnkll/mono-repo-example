import React from 'react';
import Role from '../../../forms/Role/Role.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';

export default function RoleById() {

    return (
        <>
            <SettingLayout label='Role'>
                <Role />
            </SettingLayout>
        </>
    )
}