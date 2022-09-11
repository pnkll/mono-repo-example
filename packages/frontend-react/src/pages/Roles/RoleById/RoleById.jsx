import React from 'react';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import SidebarHeaderLayout from '../../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import Role from '../../../components/Role/Role.jsx';

export default React.memo(function RoleById(){
   return(
       <>
                <SettingLayout label='Role'>
                    <Role/>
                </SettingLayout>
       </>
   )
})