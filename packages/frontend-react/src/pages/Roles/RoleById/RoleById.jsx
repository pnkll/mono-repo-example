import React from 'react';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import Role from '../../../components/Role/Role.jsx';

export default function RoleById(){
   return(
       <>
                <SettingLayout label='Role'>
                    <Role/>
                </SettingLayout>
       </>
   )
}