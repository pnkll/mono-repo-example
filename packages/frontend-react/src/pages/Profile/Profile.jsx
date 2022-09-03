import React, { useState } from 'react';
import CardGridLayout from '../../page_layouts/CardLayout/CardGridLayout/CardGridLayout.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import moment from 'moment'
import Button from '../../components/Button/Button.jsx';
import ProfileForm from "../../forms/ProfileForm.jsx";

export default React.memo(function Profile(){
   return(
       <>
       <SidebarHeaderLayout>
        <CardLayout title={'Сотрудник'}>
            <ProfileForm/>
        </CardLayout>
       </SidebarHeaderLayout>
       </>
   )
})