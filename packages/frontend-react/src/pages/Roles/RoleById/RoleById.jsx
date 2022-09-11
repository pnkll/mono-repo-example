import React from 'react';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import Role from '../../../components/Role/Role.jsx';
import { useDispatch } from 'react-redux';

export default React.memo(function RoleById(){
   return(
       <>
                <SettingLayout label='Role'>
                    <Role/>
                </SettingLayout>
       </>
   )
})