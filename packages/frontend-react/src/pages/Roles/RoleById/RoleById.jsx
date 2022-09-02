import React from 'react';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import SidebarHeaderLayout from '../../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import {useParams} from 'react-router-dom'
import Role from '../../../components/Role/Role.jsx';

export default React.memo(function RoleById(){
    const location = useParams()
    console.log(location)
   return(
       <>
            <SidebarHeaderLayout>
                <SettingLayout label='Role'>
                    <Role/>
                </SettingLayout>
            </SidebarHeaderLayout>
       </>
   )
})